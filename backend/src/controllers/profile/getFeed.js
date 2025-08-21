import { queryRetrieveFeed } from '../../queries/profile/queryRetrieveFeed.js';

export async function getFeed(req,res){
    let lastDate=req.headers['lastdate']
    try{
        let postsList = await queryRetrieveFeed(lastDate,res.locals.tojwt.id)
        res.status(200).send({postsList:postsList})
    } catch(e){
        console.log(e)
    }

}