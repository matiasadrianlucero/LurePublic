import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function queryCancelRequest(idSender,usernameReciever) {
    try {
        let getRequestId=await prisma.followRequest.findFirst({
            where: {
                recieverRelation: {
                    is: {
                        username: usernameReciever
                    }
                },
                sentById: idSender,
            },
            select:{
                id: true
            }
        });
        await prisma.followRequest.delete({
            where:{
                id: getRequestId.id,
                sentById: idSender,
                recieverRelation: {
                    is:{
                        username: usernameReciever
                    }
                }
            }
        });

        return
    } catch (error) {
        console.error('Error creating user:', error);
        return error
    }
}