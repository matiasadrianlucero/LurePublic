import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function queryUpdateBackground(pic,myId) {
  try {
    await prisma.user.update({
        where: {
            id: myId,
        },
        data: {
            backgroundPic: pic,
        },
      })
} catch (error) {
    console.error('Error creating user:', error);
    throw error;
}
}