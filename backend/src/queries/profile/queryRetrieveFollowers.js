import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function queryRetrieveFollowers(userToQuery) {
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
            sentToId: getUserId.id
          },
        include:{
          sendingRelation: {
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
