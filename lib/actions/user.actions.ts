'use server';

import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify} from "../utils"
import { liveblocks } from "../liveblocks";

export const getClerkUsers = async ({userIds} : {userIds : string[]}) =>{
    //userIds array of email Addresses
    try {
        const {data} = await clerkClient.users.getUserList({
            emailAddress : userIds
        }) 

        const users = data.map((user)=>({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.emailAddresses[0].emailAddress,
            avatar: user.imageUrl,
        }))

        //sort the users to the order of the emails provided
    
        const sortedUsers = userIds.map((email) => users.find((user)=> user.email === email));

        return parseStringify(sortedUsers);

    } catch (error) {
        console.log(`Error fetching users : ${error}`);
    }
}


export const getDocumentUsers = async ({roomId , currentUser , text} : {roomId : string , currentUser:string,text:string})=>{
    try {
        const room = await liveblocks.getRoom(roomId);

        const users = Object
    } catch (error) {
        
    }
}