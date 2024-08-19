'use server'

import {nanoid} from 'nanoid'
import { liveblocks } from '../liveblocks'
import { revalidatePath } from 'next/cache'
import {getAccessType , parseStringify} from '../utils'
import {redirect } from 'next/navigation'

export const createDocument = async ({userId, email}:CreateDocumentParams) =>{
    const roomId = nanoid();

    try {

       const metadata = {
        creatorId: userId,
        email,
        title: 'Untitled'
       }

       const usersAccesses : RoomAccesses = {
        [email]: ['room:write']
       }

       const room = await liveblocks.createRoom(roomId,{
        metadata,
        usersAccesses,
        defaultAccesses:[]
       })

       revalidatePath('/')

       return parseStringify(room)

    } catch (error) {
       console.log(`Error happended while creating a room ${error}`);
    }
}

export const getDocument = async ({roomId, userId}: {roomId:string; userId:string})=>{
   try {
     const room = await liveblocks.getRoom(roomId) 

     const hasAceess = Object.keys(room.usersAccesses).includes(userId)

     if(!hasAceess){
      throw new Error('You do not have access to this document')
     }

     return parseStringify(room)
   } catch (error) {
      console.log(`Error happened while getting a room: ${error}`);
   }
}

export const getDocuments = async (email: string) =>{
   try {
     const rooms = await liveblocks.getRooms({userId: email}) 

     return parseStringify(rooms)
   } catch (error) {
      console.log(`Error happened while updatign a room: ${error}`);
   }
}

export const updateDocumentAccess = async ({roomId, email, userType, updatedBy}: ShareDocumentParams)=>{

}
