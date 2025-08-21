import { queryRetrieveFollowing } from '../../queries/profile/queryRetrieveFollowing.js';
export async function retrieveUserFollowing(req,res){
    let usernameToSearch=req.params.username
    console.log(usernameToSearch)

    try{
        let results = await queryRetrieveFollowing(usernameToSearch)
        res.status(200).send(results);  
    } catch(e){
        console.log(e)
    }

}