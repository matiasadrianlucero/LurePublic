import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function queryFavouriteDelete(postId,userId,id) {
  try {
    await prisma.favourites.delete({
        where: {
            userId: userId,
            postId: postId,
            id:id
        },
    });
    await prisma.post.updateMany({
      where:{
          id:postId
      },
      data: {
        likes: {
          decrement: 1,
        },
      },
    })
    return
} catch (error) {
    console.error('Error creating user:', error);
    throw error;
}
}