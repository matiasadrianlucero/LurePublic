import {  validationResult } from 'express-validator';
import { queryUpdatePassword } from '../../../queries/profile/update/queryUpdatePassword.js';

export async function updatePassword(req,res){

    try{
        let result = await queryUpdatePassword(req.body.updatePasswordUpdate,req.body.updatePasswordCurrent,res.locals.tojwt.id)
        if(result){
            return res.status(200).send({result:"success",msg:[{msg:"Password Updated!. Please loggin again..."}]})
        }
        return res.status(401).send({validationErrors:[{msg:"Incorrect Password."}]})

    } catch($e){
        console.log($e)
    }

}