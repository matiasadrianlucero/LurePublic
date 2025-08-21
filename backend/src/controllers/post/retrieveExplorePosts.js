import { queryRetrieveExplore } from '../../queries/profile/queryRetrieveExplore.js';
export async function retrieveExplorePosts(req,res){
    let lastDate=req.headers['lastdate']
    try{        
        let postsList = await queryRetrieveExplore(lastDate,res.locals.tojwt.id);
        res.status(200).send({postsList:postsList})
    } catch(e){
        console.log(e)
    }

}