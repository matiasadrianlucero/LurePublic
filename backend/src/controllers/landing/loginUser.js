
import {queryCheckEmailExists} from '../../queries/profile/checks/queryCheckEmailExists.js'

import { queryLogin } from '../../queries/landing/queryLogin.js';
export async function loginUser(req,res){
    const password = req.body.loginPassword;
    const email = req.body.loginEmail;

    let checkEmail=await queryCheckEmailExists(email)
    let loginResult
    if (checkEmail==true) {
        loginResult =await queryLogin(email,password)
        if(loginResult){
            return res.status(200).json(loginResult)
        }
        
        return res.status(401).send({validationErrors:[{msg:"Password doesn't match this account."}]})
    }  else {
        return res.status(401).send({validationErrors:[{msg:"No account found with this email."}]})
    }
}


