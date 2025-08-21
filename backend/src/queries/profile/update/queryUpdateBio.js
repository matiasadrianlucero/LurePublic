import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()


export async function queryUpdateBio(currentPrivacySetting,myId) {
  try {
    await prisma.user.update({
        where: {
          id: myId,
        },
        data: {
          bio: currentPrivacySetting,
        },
      })
} catch (error) {
    console.error('Error creating user:', error);
    throw error;
}
}