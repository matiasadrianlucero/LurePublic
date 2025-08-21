import {queryCheckEmailExists} from '../../queries/profile/checks/queryCheckEmailExists.js'
import {queryCheckUsernameExists} from '../../queries/profile/checks/queryCheckUsernameExists.js'
import { queryRegister } from '../../queries/landing/queryRegister.js';
export async function registerUser(req,res){
    const username = req.body.registerUsername;
    const password = req.body.registerPassword;
    const email = req.body.registerEmail;
    const validationErrors = []
    let checkEmail=await queryCheckEmailExists(email)
    let checkUsername=await queryCheckUsernameExists(username)

    if (checkUsername==false && checkEmail==false) {
        queryRegister(username,email,password)
        return res.status(200).json("Registration successful.")
    } else {
        if(checkUsername){
            validationErrors.push({ msg: "Username is occupied." });
        }
        if(checkEmail){
            validationErrors.push({ msg: "Email is occupied." });
        }
        return res.status(401).json({validationErrors:validationErrors})
    }
}