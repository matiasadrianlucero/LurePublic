import { queryRetrieveFavourites } from '../../../queries/post/favourites/queryRetrieveFavourites.js';
// import { queryRetrievePosts } from '../../queries/retrieve/queryRetrievePosts.js';

export async function retrieveFavourites(req,res){
    let lastDate=req.headers['lastdate']
      console.log(lastDate)
    try{
        
        let resultsFollowList = await queryRetrieveFavourites(lastDate,res.locals.tojwt.id)        
        res.status(200).send({postsList:resultsFollowList})
    } catch(e){
        console.log(e)
    }

}