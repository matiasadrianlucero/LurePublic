import { PrismaClient } from '@prisma/client';
import { check } from 'express-validator';
const prisma = new PrismaClient()
export async function queryCheckIfFollowing(selfId,idToCheck){
    try {
        let checkLike = await prisma.followRequest.findFirst({
            orderBy:{
                dateOfCreation: 'desc',
            },
            where: {
                sentById:selfId,
                sentToId: idToCheck,
                response:"accepted"
            },
            select:{
                response: true,
            }
        });
        
        if (checkLike==null) return "none"
        
        return checkLike.response

    } catch(error){
        console.error('Login error:', error);
        throw error;
    }
}