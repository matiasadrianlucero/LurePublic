import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function queryRetrieveNotifications(myId) {
  try {
    const notifications = await prisma.notifications.findMany({
        where: {
            sentToId: myId,
        },
        select:{
            text:true,
            sendingRelation:{
                select:{
                    username:true,
                    profilePic:true
                }
            }
        }
      })

    return notifications
} catch (error) {
    console.error('Error creating user:', error);
    throw error;
}
}