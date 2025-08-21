import {queryCheckEmailExists} from '../../../queries/profile/checks/queryCheckEmailExists.js'
import { queryUpdateEmail } from '../../../queries/profile/update/queryUpdateEmail.js';

export async function updateEmail(req,res){
    try{
        let checkEmail= await queryCheckEmailExists(req.body.updateEmail)

        if(checkEmail==false){
            queryUpdateEmail(req.body.updateEmail,res.locals.tojwt.id)
            return res.status(200).send({result:"success",updatedData:req.body.updateEmail,msg:[{msg:"Email Updated!"}]})
    
        } else {
            return res.status(400).send({validationErrors:[{msg:"Email is occupied"}]})
        }        
    } catch($e){
        console.log($e)
    }

        
}

