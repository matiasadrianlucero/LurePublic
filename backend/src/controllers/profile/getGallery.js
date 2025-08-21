import { queryRetrieveGallery } from '../../queries/profile/profilePosts/queryRetrieveGallery.js';
export async function getGallery(req,res){
    let lastDate=req.headers['lastdate']
    try{
        let postsList = await queryRetrieveGallery(lastDate,req.params.Username,res.locals.tojwt.id,res.locals.tojwt.username);
        console.log(postsList)
        res.status(200).send({postsList:postsList})
    } catch(e){
        console.log(e)
    }

}