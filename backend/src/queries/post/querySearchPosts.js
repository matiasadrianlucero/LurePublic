import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function querySearchPosts(textToSearch,myId,lastDate) {
    try {        
        const findResults = await prisma.post.findMany({
            where: 
            {
              user:{
                is:{
                  private: false
                }
              },
              dateOfCreation: {
                lt: lastDate==0 ? new Date() : new Date(lastDate)
              },
              text:{
                contains:  textToSearch,
              }
            },
            orderBy: {
                dateOfCreation: 'desc',
            },
            take: 10,
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
