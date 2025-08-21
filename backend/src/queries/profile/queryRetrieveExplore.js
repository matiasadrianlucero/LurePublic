import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function queryRetrieveExplore(lastDate,myId) {
    try {
        const findResults = await prisma.post.findMany({
            where: {
              dateOfCreation: {
                lt: lastDate==0 ? new Date() : new Date(lastDate)
              },
              user:{
                is:{
                  private:false
                }
              }
            },
            orderBy: {
                dateOfCreation: 'desc',
            },
            take: 5,
            include: {
              user: {
                select: {
                  username: true,
                  profilePic: true
                }
              },
              LikesRel: {
                where:{
                  userId: myId
                },
                select: {
                  state: true,
                }
              },
              Favourites: {
                where:{
                  userId: myId
                },
                select: {
                  state: true,
                }
              },
              postedIn:{
                select:{
                  response:true,
                  dateOfCreation:true,
                  commentRelation:{
                    select:{
                      username:true,
                      profilePic:true
                    }
                  }
                },
                take: 3,
              }
            }
        });
        return findResults
        
      } catch (error) {
        console.error('Error finding users:', error);
        throw error;
      }
}
