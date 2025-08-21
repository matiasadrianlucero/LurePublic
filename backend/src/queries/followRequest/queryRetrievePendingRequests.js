import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
export async function queryRetrievePendingRequests(myId) {
    const pendingRequests = await prisma.followRequest.findMany({
        where: {
            sentToId: myId,
            response: 'pending'
        },
        select:{
            sendingRelation:{
                select:{
                    username:true,
                    profilePic:true
                }
            }
        }
    })
    return pendingRequests
}