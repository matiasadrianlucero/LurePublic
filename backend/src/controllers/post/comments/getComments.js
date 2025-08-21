import { queryRetrieveComments } from '../../../queries/post/comments//queryRetrieveComments.js';
export async function getComments(req,res){
    let {id} =req.params
    let int=parseInt(id)
    try{
        let results = await queryRetrieveComments(int)
        res.status(200).json(results);  
    } catch(e){
        console.log(e)
    }

}