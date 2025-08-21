import { queryCheckFollowRequestsExists } from '../../queries/followRequest/queryCheckFollowRequestsExists.js';
import { queryCreateFollowRequest } from '../../queries/followRequest/queryCreateFollowRequest.js';

export async function sendFollowRequest(req,res,next){
    try{
        let checkRequestExists= await queryCheckFollowRequestsExists(res.locals.tojwt.id,req.body.userToFollow)
        if(checkRequestExists==false){
            let result= await queryCreateFollowRequest(res.locals.tojwt.id,req.body.userToFollow)
            res.status(200).send(result)

        } else {
            res.sendStatus(200)
        }

    } catch (err){
        console.log(err)
    }

}