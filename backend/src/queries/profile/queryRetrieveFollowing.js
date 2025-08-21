import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function queryRetrieveFollowing(userToQuery) {
  try {
      const getUserId = await prisma.user.findUnique({
        where: {
          username: userToQuery
        },
        select:{
          id:true
        }
      });
      
      const findResults = await prisma.followRequest.findMany({
        where: {
          response: 'accepted',
          sentById: getUserId.id
        },
        include: {
          recieverRelation: {
            select:{
              username:true,
              profilePic:true,
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
