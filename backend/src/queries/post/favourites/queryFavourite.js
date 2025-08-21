import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function queryFavourite(postId,userId) {
  try {
    await prisma.favourites.create({
        data: {
            userId: userId,
            postId: postId,

        },
    })
    return
} catch (error) {
    console.error('Error creating user:', error);
    throw error;
}
}