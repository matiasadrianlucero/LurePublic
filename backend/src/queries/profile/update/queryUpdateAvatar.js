import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()


export async function queryUpdateAvatar(pic,myId) {
  try {
    await prisma.user.update({
        where: {
            id: myId,
        },
        data: {
            profilePic: pic,
        },
      })

} catch (error) {
    console.error('Error creating user:', error);
    throw error;
}
}