import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export async function queryLogin(email,password) {
  try {
    const selectedUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
    });
    const passwordCompare=await bcrypt.compare(password, selectedUser.password);
      
    if(passwordCompare){

      let toJWT={
        username:selectedUser.username,
        email:selectedUser.email,
        id:selectedUser.id
      }
      const token = jwt.sign({ toJWT }, '?', { expiresIn: '2d' });

      return {
        username:selectedUser.username,
        img:selectedUser.profilePic,
        token:token
      }
    } else {
      return false
    }
} catch (error) {
    console.error('Error creating user:', error);
    throw error;
}
}