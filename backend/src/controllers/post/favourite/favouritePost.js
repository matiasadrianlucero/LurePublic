import { queryCheckFavourite } from '../../../queries/post/favourites/queryCheckFavourite.js';
import { queryFavouriteDelete } from '../../../queries/post/favourites/queryFavouriteDelete.js';
import { queryFavourite} from '../../../queries/post/favourites/queryFavourite.js';

export  async function favouritePost(req,res){
    try{
        let checkResult= await queryCheckFavourite(req.body.postId,res.locals.tojwt.id)
        if(checkResult){
            queryFavouriteDelete(req.body.postId,res.locals.tojwt.id,checkResult[0].id)
            res.status(200).send({result:true})
        } else {
            queryFavourite(req.body.postId,res.locals.tojwt.id) 
            res.status(200).send({result:true})
        }
    } catch (err){
        console.log(err)
    }

}