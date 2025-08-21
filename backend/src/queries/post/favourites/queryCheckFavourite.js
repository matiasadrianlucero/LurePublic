import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
export async function queryCheckFavourite(postIdCheck,userIdCheck){
    try {
        const checkFavourite = await prisma.favourites.findMany({
            where: {
                postId:postIdCheck,
                userId: userIdCheck,
            },
        });
        if (checkFavourite.length==0) {
            return false
        }
        
        return checkFavourite
    } catch(error){
        console.error('Login error:', error);
        throw error;
    }
}