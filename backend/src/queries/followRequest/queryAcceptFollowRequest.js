import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import { queryCreateNotification } from '../notification/queryCreateNotification.js';
export async function queryAcceptFollowRequest(usernameToAccept, myId) {
  try {
    let usernameToAcceptId=await prisma.user.findUnique({
        where:{
            username:usernameToAccept
        },
        select:{
            id:true
        }
    })

    let getRequestId=await prisma.followRequest.findFirst({
        where:{
            response:"pending",
            sentById:usernameToAcceptId.id,
            sentToId:myId
        },
        select:{
            id:true
        }
    })
    await prisma.followRequest.update({
        where:{
            id:getRequestId.id
        },
        data:{
            response:"accepted"
        }
    })
    await queryCreateNotification(myId,usernameToAcceptId.id,"Accepted your follow request.")
    return
  } catch (error) {
    throw new Error(error.message);
  }
}