import { queryRetrieveProfilePosts } from '../../queries/profile/profilePosts/queryRetrieveProfilePosts.js';
export async function retrieveProfilePosts(req,res){
    
    let lastDate=req.headers['lastdate']
    try{
        let postsList = await queryRetrieveProfilePosts(lastDate,req.params.Username,res.locals.tojwt.id,res.locals.tojwt.username);
        
        res.status(200).send({postsList:postsList})
    } catch(e){
        console.log(e)
    }

}