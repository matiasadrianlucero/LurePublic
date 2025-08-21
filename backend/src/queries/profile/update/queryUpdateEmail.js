import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()


export async function queryUpdateEmail(updateEmail,myId) {
  try {
     await prisma.user.update({
      where: {
        id: myId,
      },
      data: {
        email: updateEmail,
      },
    })
} catch (error) {
    console.error('Error creating user:', error);
    throw error;
}
}