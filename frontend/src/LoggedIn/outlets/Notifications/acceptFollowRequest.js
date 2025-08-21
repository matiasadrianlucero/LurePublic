import axios from "axios"
import getAdress from "../../../getAdress"
export async function acceptFollowRequest(username,removeRequest,index) {
    let adress=getAdress()
    try{
        let response = await axios.put(adress + "/accept/FollowRequest",
            {username:username},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                              'Authorization':localStorage.getItem("token")

                }
                ,
                // withCredentials: true
            }
        )
        if(response && response.data){
            removeRequest(index)
            document.getElementById("reduceNotificationAmmount").click()

        }
    } catch(e){
        console.log(e)
    }
}