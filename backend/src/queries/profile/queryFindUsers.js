import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function queryFindUsers(userToQuery) {
    try {
        const findResults = await prisma.user.findMany({
            where: {
              username: {
                startsWith: userToQuery,
              },
            },
            select: {
              username: true,
              profilePic: true,
              reciever:{
                where:{
                  response:"accepted"
                },
                select:{
                  id:true
                }
              }
            }
        });
        return findResults
        
      } catch (error) {
        console.error('Error finding users:', error);
        throw error;
      }
}
