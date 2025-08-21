import axios from "axios";
import getAdress from "../../getAdress";
export async function checkNotifications(){
    let adress=getAdress()
    try{
        const response= await axios.get(adress + '/check/RequestsNotifications',{
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization':localStorage.getItem("token")

            },
            
            // withCredentials: true
        })
        if(response && response.data){
            return response.data
        }
    } catch(e){
        console.log(e)
        return null
    }
}