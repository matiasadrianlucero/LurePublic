import {  validationResult } from 'express-validator';
import {queryCheckUsernameExists} from '../../../queries/profile/checks/queryCheckUsernameExists.js'
import { queryUpdateUsername } from '../../../queries/profile/update/queryUpdateUsername.js';

export async function updateUsername(req,res){
    try{
        let checkUsername= await queryCheckUsernameExists(req.body.updateUsername)
        if(checkUsername==false){
            await queryUpdateUsername(req.body.updateUsername,res.locals.tojwt.id)
            return res.status(200).send({result:"success",updatedData:req.body.updateUsername,msg:[{msg:"Username Updated!"}]})
        } else {
            return res.status(400).send({validationErrors:[{msg:"Username is occupied"}]})
        }
    } catch($e){
        console.log($e)
    }

}

