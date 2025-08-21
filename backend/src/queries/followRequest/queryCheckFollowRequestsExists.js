import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
export async function queryCheckFollowRequestsExists(idSender,usernameToFollow){
    try {
        const checkRequest = await prisma.followRequest.findMany({
            where: {
                OR:[
                    {
                        sentById: idSender,
                        recieverRelation: {
                            is: {
                                username: usernameToFollow
                            }
                        },
                        response: "accepted"
                     },
                    { 
                        sentById: idSender,
                        recieverRelation: {
                            is: {
                                username: usernameToFollow
                            }
                        },
                        response: "pending"
                    }  
                ]
            },
            select:{
                id: true,
                response: true,
                recieverRelation: {
                    select: {
                        id: true
                    }
                }
            },
        });
        if(checkRequest.length == 0) return false
        return checkRequest
    } catch(error){
        console.error('Login error:', error);
        throw error;
    }
}