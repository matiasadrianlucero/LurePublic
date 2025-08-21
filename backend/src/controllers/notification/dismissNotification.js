import { queryDismissNotification } from "../../queries/notification/queryDismissNotification.js"
export async function dismissNotification(req, res) {
    try {
        console.log(req.body.username)
        let result = await queryDismissNotification(res.locals.tojwt.id,req.body.username)
        res.status(200).send({result:true})
    } catch (error) {
        console.log(error)
    }
}