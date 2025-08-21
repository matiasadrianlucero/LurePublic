import { queryProfileData } from '../../queries/profile/queryProfileData.js';
import { queryCheckIfFollowing } from '../../queries/profile/checks/queryCheckIfFollowing.js';

export async function getProfile(req,res){
    try{
        const username = req.params.username;

        let profileResults= await queryProfileData(username)
        let profileId=profileResults.id

        let checkIfFollowing= await queryCheckIfFollowing(res.locals.tojwt.id,profileId)
        res.send({
            profileData:profileResults.userData,
            followersCount:profileResults.followersCount,
            followingCount:profileResults.followingCount,
            postCount:profileResults.postCount,
            checkIfFollowing:checkIfFollowing
        })

    } catch (err){
        console.log(err)
    }      

}