import axios from "axios";
import getAdress from "../../../getAdress";

export default async function updateEmail(setAlertFunc,handleEmailChange){
  const updateEmail=document.getElementById("updateEmail").value
  let adress=getAdress()

  axios.put(adress + '/update/Email', {updateEmail:updateEmail}, 
  {
      headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization':localStorage.getItem("token")

      },
      // ,withCredentials: true
  })
  .then(function (response) {  
    setAlertFunc(response.data.msg)
    handleEmailChange(response.data.updatedData)
    return
  })
  .catch(function (error) {
    setAlertFunc(error.response.data.validationErrors)     
  });
}