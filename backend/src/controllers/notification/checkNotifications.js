import { queryCheckNotifications } from "../../queries/notification/queryCheckNotifications.js"
export async function checkNotifications(req,res){
    try {
        let result=await queryCheckNotifications(res.locals.tojwt.id)
        res.status(200).send({notificationsCount:result})
    } catch (error) {
        console.log(error)
    }
}