import axios from "axios";
import getAdress from "../../../getAdress";
export async function retrievePendingRequests(){
    let adress=getAdress()
    try{
        const response= await axios.get(adress + '/retrieve/RequestsNotifications',{
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': localStorage.getItem("token"),
            }
            ,
            // withCredentials: true
        })
        if(response && response.data){
            console.log(response.data)
            return response.data
        }
    } catch(e){
        console.log(e)
        return null
    }
}