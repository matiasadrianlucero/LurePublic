import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function queryCheckNotifications(myId) {
  try {
    const checkFollowRequests = await prisma.followRequest.findMany({
        where: {
            sentToId: myId,
            response: 'pending'
        },
        select:{
            id:true
        }
    })
    const checkNotifications = await prisma.notifications.findMany({
        where: {
            sentToId: myId,
        },
        select:{
            id:true
        }
    })
    return checkNotifications.length + checkFollowRequests.length 
    
    } catch (error) {
        console.error('Error creating user:', error);
        return error
    }
}