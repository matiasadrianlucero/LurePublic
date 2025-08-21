import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function queryCreateNotification(idSender,idReciever,message) {
  try {
    await prisma.notifications.create({
        data: {
            sentById: idSender,
            sentToId: idReciever,
            text:message
        } 
    })
    return { msg: "Follow request accepted." }
    
    } catch (error) {
        console.error('Error creating user:', error);
        return error
    }
}