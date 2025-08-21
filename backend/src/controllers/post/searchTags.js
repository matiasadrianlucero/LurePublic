import { querySearchTags } from '../../queries/post/querySearchTags.js';

export async function searchTags(req,res){
    let lastDate=req.headers['lastdate']
    try{        
        const tags=req.params.tags
        const text=req.params.text
        console.log(tags,text)
        let postsList = await querySearchTags(tags,res.locals.tojwt.id,lastDate)
        res.status(200).send({postsList:postsList})
    } catch(e){
        console.log(e)
    }

}