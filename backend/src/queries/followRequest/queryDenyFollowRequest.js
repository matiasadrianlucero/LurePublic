import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function queryDenyFollowRequest(myId,usernameSender) {
    try {
        let getRequestId=await prisma.followRequest.findFirst({
            where: {
                sendingRelation: {
                    is: {
                        username: usernameSender
                    }
                },
                sentToId: myId,
            },
            select:{
                id: true
            }
        });
        await prisma.followRequest.delete({
            where:{
                id: getRequestId.id,
                sentToId: myId,
                sendingRelation: {
                    is:{
                        username: usernameSender
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