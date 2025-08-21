import { queryAcceptFollowRequest } from "../../queries/followRequest/queryAcceptFollowRequest.js";
export async function acceptFollowRequest(req, res) {
    try {
        await queryAcceptFollowRequest(req.body.username,res.locals.tojwt.id)
        res.status(200).send({result:true})
    } catch (error) {
        console.log(error)
    }
}