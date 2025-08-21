import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function queryCreatePost(postText,file1,file2,file3,tags,myId) {
  try {
    let created=await prisma.post.create({
        data: {
            text: postText,
            img: file1,
            img2: file2,
            img3: file3,
            tags:tags,
            createdBy: myId,
        },
        include:{
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
    return created
} catch (error) {
    console.error('Error creating user:', error);
    throw error;
}
}