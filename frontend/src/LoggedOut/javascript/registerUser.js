import axios from 'axios'

import getAdress from '../../getAdress';
export default async function registerUser(usernameToRegister,passwordToRegister,emailToRegister,resolveResponse) {
  let adress=getAdress()
  try {
    const response=await axios.post(adress + '/register', {
      headers: {
        headers: {'X-Requested-With': 'XMLHttpRequest'},    
      },
      registerUsername:usernameToRegister,
      registerEmail:emailToRegister,
      registerPassword:passwordToRegister
    })
    if(response && response.data){
      resolveResponse("success")

      return []
    }
  } catch (error) {
    resolveResponse("error")
    return error.response.data.validationErrors
  }

}
