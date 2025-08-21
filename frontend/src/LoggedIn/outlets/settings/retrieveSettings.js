import axios from 'axios'
import getAdress from '../../../getAdress'
export async function retrieveSettings(){
  let adress=getAdress()
  try {
        let result=await axios.get(adress + '/retrieve/Settings', 
        {
            headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization':localStorage.getItem("token")

            }
            ,
            // withCredentials: true
        })
        if(result && result.data){
            return result.data
        }
  } catch (error) {
        console.log(error)
  }
  
}
