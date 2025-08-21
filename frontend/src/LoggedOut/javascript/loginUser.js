import storeUserInfo from './storeUserInfo';
import axios from 'axios'

import getAdress from '../../getAdress';
export default async function loginUser(loginEmail,loginPassword,rememberMe,navigate,resolveResponse) {
  let adress=getAdress()
  try{
    let response= await axios.post(adress + '/login', {
      headers: {
        headers: {'X-Requested-With': 'XMLHttpRequest'},
      },
      loginEmail:loginEmail,
      loginPassword:loginPassword,
    })
    if(response && response.data){
      resolveResponse("success")

      await storeUserInfo(
        response.data.username,
        response.data.token,
        response.data.img,
        rememberMe
      )
      navigate("/Home/Feed")
      return []
    }
  } catch (error){
    console.log(error)
    resolveResponse("error")
    return error.response.data.validationErrors
  }
}