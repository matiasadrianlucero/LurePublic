import { queryCancelRequest } from '../../queries/followRequest/queryCancelRequest.js';

export async function cancelFollowRequest(req,res,next){
    try{
        await queryCancelRequest(res.locals.tojwt.id,req.body.userToUnfollow)
        res.status(200).send({result:true})
    } catch (err){
        console.log(err)
    }

}