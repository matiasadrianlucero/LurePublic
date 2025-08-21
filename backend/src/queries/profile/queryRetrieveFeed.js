import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function queryRetrieveFeed(lastDate,myId) {
  try {
    const myFollowList = await prisma.followRequest.findMany({
      where: {            
        response: 'accepted',
        sentById: myId
      },
      include:{
        recieverRelation:{
          select:{
            id:true
          }
        }
      }
    })
    let listArr=[]
    listArr.push(myId)
    myFollowList.forEach((async (result) => {
        if(result.response=='accepted'){
            listArr.push(result.sentToId)
        }
    }
    ))
    const findResults = await prisma.post.findMany({
      where: {
        createdBy: {
          in: listArr 
        },
        dateOfCreation: {
          lt: lastDate==0 ? new Date() : new Date(lastDate)
        }

      },
      orderBy: {
          dateOfCreation: 'desc',
      },
      take:5,
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
