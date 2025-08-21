import { queryCreatePost } from '../../queries/post/queryCreatePost.js';

export async function createPost(req,res){
    try{
        console.log(req.filenames)
        if(req.body.text!="" || req.filenames!=[]){
            let postData=await queryCreatePost(req.body.text,
                req.filenames[0] || '',
                req.filenames[1] || '',
                req.filenames[2] || '',
                req.body.tags.trim(),
                res.locals.tojwt.id,
            )
            res.status(200).send({postsList:postData})
    
        } else {
            return res.status(200).send({msg:"Incorrect post formating."})
        }
        
    } catch(e){
        console.log(e)
    }

}