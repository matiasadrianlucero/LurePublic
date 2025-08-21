import { querySearchPosts } from '../../queries/post/querySearchPosts.js';

export async function searchPost(req,res){
    let lastDate=req.headers['lastdate']
    try{        
        const text=req.params.text

        let postsList = await querySearchPosts(text,res.locals.tojwt.id,lastDate)
        res.status(200).send({postsList:postsList})
    } catch(e){
        console.log(e)
    }

}