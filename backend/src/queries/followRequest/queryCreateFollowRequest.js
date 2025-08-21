import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import { queryCreateNotification } from '../notification/queryCreateNotification.js';
export async function queryCreateFollowRequest(myId,usernameToFollow) {
  try {
    let idToFollow=await prisma.user.findUnique({
        where:{
            username: usernameToFollow
        },
        select:{
            private: true,
            id: true
        }
    });
    if(idToFollow.private==true){
        await prisma.followRequest.create({
            data: {
                sentById: myId,
                sentToId: idToFollow.id,
            },
        });
        return { msg: "Follow request sent." };
    } else {
        await prisma.followRequest.create({
            data: {
                sentById: myId,
                sentToId: idToFollow.id,
                response: "accepted"
            },
        });
        await queryCreateNotification(myId, idToFollow.id,"follows you.");
        return { msg: "Follow request accepted." }
    }

    } catch (error) {
        console.error('Error creating user:', error);
        return error
    }
}