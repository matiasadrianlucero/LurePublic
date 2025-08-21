import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function querySearchPostWTag(tags,text,myId,lastDate) {
    try {
        let tempArr=tags.split(" ")
        let tempString=""
        tempArr.map((content,i)=>{
          i==0 ? tempString+=content :  tempString+= " & " + content
        })
        
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
              tags:{
                search:  tempString,
              },
              text:{
                contains: text
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
