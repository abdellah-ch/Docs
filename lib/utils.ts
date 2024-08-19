import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseStringify = (value : any ) => JSON.parse(JSON.stringify(value))

export const dateConverter = (timestamp: string): string => {
  const timestampNum = Math.round(new Date(timestamp).getTime());
  const date: Date = new Date(timestampNum);
  const now: Date = new Date();

  const diff: number = now.getTime() - date.getTime();
  // Convert the difference from milliseconds to seconds
  const diffInSeconds: number = diff / 1000;
  // Convert the difference from seconds to minutes
  const diffInMinutes: number = diffInSeconds / 60;
  // Convert the difference from minutes to hours
  const diffInHours: number = diffInMinutes / 60;
  // Convert the difference from hours to days
  const diffInDays: number = diffInHours / 24;

  switch (true) {
    case diffInDays > 7:
      return `${Math.floor(diffInDays / 7)} weeks ago`;
    case diffInDays >= 1 && diffInDays <= 7:
      return `${Math.floor(diffInDays)} days ago`;
    case diffInHours >= 1:
      return `${Math.floor(diffInHours)} hours ago`;
    case diffInMinutes >= 1:
      return `${Math.floor(diffInMinutes)} minutes ago`;
    default:
      return 'Just now';
  }
};

export const getAccessType = (userType: UserType) =>{
  switch(userType){
    case 'creator':
      return ['room:write'];
    case 'editor':
      return ['room:write'];
    case 'viewer':
      return ['room:read', 'room:presence:write'];
    default:
      return ['room:read', 'room:presence:write'];
  }
} 

export const brightColors = [
  '#2E8B57', // Darker Neon Green
  '#FF6EB4', // Darker Neon Pink
  '#00CDCD', // Darker Cyan
  '#FF00FF', // Darker Neon Magenta
  '#FF007F', // Darker Bright Pink
  '#FFD700', // Darker Neon Yellow
  '#00CED1', // Darker Neon Mint Green
  '#FF1493', // Darker Neon Red
  '#00CED1', // Darker Bright Aqua
  '#FF7F50', // Darker Neon Coral
  '#9ACD32', // Darker Neon Lime
  '#FFA500', // Darker Neon Orange
  '#32CD32', // Darker Neon Chartreuse
  '#ADFF2F', // Darker Neon Yellow Green
  '#DB7093', // Darker Neon Fuchsia
  '#00FF7F', // Darker Spring Green
  '#FFD700', // Darker Electric Lime
  '#FF007F', // Darker Bright Magenta
  '#FF6347', // Darker Neon Vermilion
];

export function getUserColor(userId: string){
  let sum = 0;
  for(let i=0 ; i<brightColors.length; i++){
    sum += userId.charCodeAt(i);
  } 

  const colorIndex = sum % brightColors.length;

  return brightColors[colorIndex];
}