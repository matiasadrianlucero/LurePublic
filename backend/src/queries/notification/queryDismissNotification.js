import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function queryDismissNotification(myId,usernameReciever) {

    try {
        let userToDismissId=await prisma.user.findFirst({
            where: {
                username:usernameReciever
            },
            select:{
                id: true
            }
        });
        let notificationId=await prisma.notifications.findFirst({
            where:{
                sentToId: myId,
                sentById:userToDismissId.id
            },
            select:{
                id:true
            }
        });
        
        await prisma.notifications.delete({
            where:{
                id: notificationId.id,
            }
        });

        return
    } catch (error) {
        console.error('Error creating user:', error);
        return error
    }
}