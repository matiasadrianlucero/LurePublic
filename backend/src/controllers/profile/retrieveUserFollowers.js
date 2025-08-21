import { queryRetrieveFollowers } from '../../queries/profile/queryRetrieveFollowers.js';
export async function retrieveUserFollowers(req,res){
    let usernameToSearch=req.params.username
    console.log(usernameToSearch)
    try{        
        let results= await queryRetrieveFollowers(usernameToSearch)
        res.status(200).send(results)
    } catch(e){
        console.log(e)
    }

}