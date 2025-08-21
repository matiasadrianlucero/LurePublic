import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()


export async function queryUpdateUsername(updateUsername,myId) {
  try {
    await prisma.user.update({
        where: {
          id: myId,
        },
        data: {
          username: updateUsername,
        },
    })
    return
} catch (error) {
    console.error('Error creating user:', error);
    throw error;
}
}