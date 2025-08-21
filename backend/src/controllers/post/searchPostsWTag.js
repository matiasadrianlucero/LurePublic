import { querySearchPostWTag } from '../../queries/post/querySearchPostWTag.js';

export async function searchPostsWTag(req,res){
    let lastDate=req.headers['lastdate']
    try{        
        const tags=req.params.tags
        const text=req.params.text
        console.log(tags,text)
        let postsList = await querySearchPostWTag(tags,text,res.locals.tojwt.id,lastDate)
        res.status(200).send({postsList:postsList})
    } catch(e){
        console.log(e)
    }

}