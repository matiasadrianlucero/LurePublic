import {queryRetrieveNotifications} from '../../queries/notification/queryRetrieveNotifications.js';
import { queryRetrievePendingRequests } from '../../queries/followRequest/queryRetrievePendingRequests.js';
export async function getNotificationsPendingRequests(req, res) {
    try {
        let notifications=await queryRetrieveNotifications(res.locals.tojwt.id);
        let pendingRequests=await queryRetrievePendingRequests(res.locals.tojwt.id);
        
        res.status(200).send({notifications: notifications, pendingRequests: pendingRequests});
    } catch (e){
        console.log(e)
        res.send(400)
    }
    


}