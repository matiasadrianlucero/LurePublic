import { queryDenyFollowRequest } from "../../queries/followRequest/queryDenyFollowRequest.js"
export async function denyFollowRequest(req, res) {
    try {
        await queryDenyFollowRequest(res.locals.tojwt.id,req.body.username)
        res.status(200).send({result:true})
    } catch (error) {
        console.log(error)
    }
}