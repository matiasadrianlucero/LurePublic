import axios from "axios"
import getAdress from "../../../getAdress"
export async function dismissNotification(username,removeNotification,index) {
    let adress=getAdress()
    
    try{
        let response = await axios.delete(adress + "/dismiss/Notification",
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                              'Authorization':localStorage.getItem("token")

                }
                ,
                // withCredentials: true,
                data:{
                    username:username
                }
            }
        )
        if(response && response.data){
            removeNotification(index)
            document.getElementById("reduceNotificationAmmount").click()
        }
    } catch(e){
        console.log(e)
    }
}