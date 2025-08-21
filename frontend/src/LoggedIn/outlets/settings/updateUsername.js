import axios from "axios";
import getAdress from "../../../getAdress";
export default async function updateUsername(setAlertFunc,updateUsername,handleUsernameChange){
  let adress=getAdress()

  await axios.put(adress + '/update/Username', {updateUsername:updateUsername}, 
  {
      headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization':localStorage.getItem("token")
      }
      ,
      // ,withCredentials: true

  })
  .then(function (response) {
    localStorage.setItem("username",response.data.updatedData)
    handleUsernameChange(response.data.updatedData)
    setAlertFunc(response.data.msg)
    return    
  })
  .catch(function (error) {
    setAlertFunc(error.response.data.validationErrors)     
  });
}
