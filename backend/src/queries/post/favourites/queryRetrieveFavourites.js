import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function queryRetrieveFavourites(lastDate,userToQuery) {

    try {
        const findResults = await prisma.post.findMany({
        where: {
          Favourites: {
            some: {
              userId: userToQuery,
            },
          },
          dateOfCreation: {
            lt: lastDate==0 ? new Date() : new Date(lastDate)
          }
        },
        take:5,
        orderBy: {
          dateOfCreation: 'desc',
        },
        include: {
          user: {
            select: {
              username: true,
              profilePic: true
            }
          },            
          LikesRel: {
            where:{
              userId: userToQuery
            },
            select: {
              state: true,
            }
          },
          Favourites: {
            where:{
              userId: userToQuery
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
