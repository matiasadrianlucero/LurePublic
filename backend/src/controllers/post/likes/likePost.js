import {queryLikePost} from '../../../queries/post/likes/queryLikePost.js';
import { queryLikeDelete } from '../../../queries/post/likes/queryLikeDelete.js';
import { queryCheckIfLiked } from '../../../queries/post/likes/queryCheckIfLiked.js';
export  async function likePost(req,res){
    try{
        let checkResult= await queryCheckIfLiked(req.body.postId,res.locals.tojwt.id)
        if(checkResult){
            queryLikeDelete(req.body.postId,res.locals.tojwt.id,checkResult[0].id)
            res.status(200).send({result:true})
        } else {
            queryLikePost(req.body.postId,res.locals.tojwt.id) 
            res.status(200).send({result:true})
        }
    } catch (err){
        console.log(err)
    }

}