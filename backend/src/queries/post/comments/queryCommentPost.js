import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function queryCommentPost(comment,postId, userId) {
  try {

    await prisma.comment.create({
        data: {
            response: comment,
            postId: postId,
            authorId: userId,
            
        },
    });
    await prisma.post.update({
        where:{
            id:postId
        },
        data: {
            commentAmmount:{
                increment:1
            }
            
        },
    });
    return
} catch (error) {
    console.error('Error creating user:', error);
    throw error;
}
}