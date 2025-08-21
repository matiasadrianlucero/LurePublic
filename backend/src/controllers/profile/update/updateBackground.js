import { queryUpdateBackground } from '../../../queries/profile/update/queryUpdateBackground.js';

export async function updateBackground(req,res){
    try{
        await queryUpdateBackground(req.filenames[0],res.locals.tojwt.id)    
        return res.status(200).send({msg:[{msg:"Background Updated! Reloading..."}],result:"success",updatedData:req.filenames[0]})
    } catch (err){
        console.log(err)
    }

}