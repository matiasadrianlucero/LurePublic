import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function queryProfileData(userToQuery) {
    try {
        const checkUser = await prisma.user.findUnique({
            where:{
                username:userToQuery
            },
            select:{
              id:true,
              username:true,
              bio:true,
              backgroundPic:true,
              profilePic:true,
              Post:{
                select:{
                  id:true
                }
              }
            },
            
        });
        const followersResult = await prisma.followRequest.findMany({
            where: {
                response: 'accepted',
                sentToId: checkUser.id
              },
            include:{
              sendingRelation: {
                select:{
                  id:true
                }
              }
            ,}
        });
        const followingResult = await prisma.followRequest.findMany({
          where: {
            response: 'accepted',
            sentById: checkUser.id
          },
          include: {
            recieverRelation: {
              select:{
                id:true
              }
            }
          }
        });
        return {userData:checkUser, followersCount: followersResult.length, followingCount: followingResult.length,postCount: checkUser.Post.length};
        
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
}
