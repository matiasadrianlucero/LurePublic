import axios from 'axios'
import getAdress from '../../getAdress';

export default async function checkLogin(navigate,redirect) {
  let adress=getAdress()
  if(localStorage.getItem("token")){
    try{
      let result=await axios.post(adress + '/check/login', {}, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization':localStorage.getItem("token")

        },
        
        // withCredentials:true
      })
      if(result && result.data){
        return true
      }
    } catch (error){
      return false
    }
  }

}