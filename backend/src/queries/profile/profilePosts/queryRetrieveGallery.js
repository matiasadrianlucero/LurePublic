import { PrismaClient } from '@prisma/client';
import { queryCheckIfFollowing } from '../checks/queryCheckIfFollowing.js';
const prisma = new PrismaClient()

export async function queryRetrieveGallery(lastDate,username, myId) {
  async function queryProfile(){
    const findResults = await prisma.post.findMany({
      where: {
        user:{
          is: {
            username: username
          }
        },
        dateOfCreation: {
          lt: lastDate==0 ? new Date() : new Date(lastDate)
        }
      },
      orderBy: {
          dateOfCreation: 'desc',
      },
      take:5,
      select:{
        img: true,
        img2: true,
        img3: true
      }
    });
    return findResults
  }
  try {
    const userPrivacy = await prisma.user.findUnique({
      where: {
        username: username
      },
      select:{
        private:true,
        id:true
      }
    });
    if(userPrivacy.private){
      if(myId==userPrivacy.id){
        return await queryProfile()
      }
      let followingCheck= await queryCheckIfFollowing(myId,userPrivacy.id)
      if(followingCheck=="accepted") {
        return await queryProfile()
      } 
      return {error: "private profile"}
    } else {
      return await queryProfile()
    }

  } catch (error) {
    console.error('Error finding users:', error);
    throw error;
  }
}
