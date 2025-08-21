import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function queryRetrieveSettings(myId) {
    try {
        const findResults = await prisma.user.findUnique({
            where: {
                id: myId
              },
            select: {
                email:true,
                bio:true,
                profilePic:true,
                backgroundPic:true,
                private:true
                
            }
        });
        return findResults
        
        
      } catch (error) {
        console.error('Error finding users:', error);
        throw error;
      }
}
