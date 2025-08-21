import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import {queryCheckPassword} from '../checks/queryCheckPassword.js';
import bcrypt from 'bcrypt'

export async function queryUpdatePassword(updatePassword,currentPassword,myId) {
    
  try {
        const compareResult=await queryCheckPassword(myId,currentPassword)
        if(compareResult){
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(updatePassword, saltRounds);

          await prisma.user.update({
              where: {
                  id: myId,
              },
              data: {
                password: hashedPassword,
              },
          })
          return true
        }
        return false
} catch (error) {
    console.error('Error creating user:', error);
    throw error;
}
}