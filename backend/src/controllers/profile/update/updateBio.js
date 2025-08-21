import { queryUpdateBio } from '../../../queries/profile/update/queryUpdateBio.js';

export async function updateBio(req,res){
    try{        
        await queryUpdateBio(req.body.bio,res.locals.tojwt.id);
        return res.status(200).send({result:"success",updatedData:req.body.bio,msg:[{msg:"Bio Updated!"}]})

    }catch(err){
        return res.status(400).send({validationErrors:[{msg:"Error updating bio."}]})
    }
} 