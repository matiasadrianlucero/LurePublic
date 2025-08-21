import axios from "axios";
import logout from "../../logout";
import getAdress from "../../../getAdress";
export default async function updatePassword(setAlertFunc){
  let adress=getAdress()

    const updatePasswordUpdate=document.getElementById("updatePasswordUpdate").value
    const updatePasswordCurrent=document.getElementById("updatePasswordCurrent").value

    axios.put(adress + '/update/Password', {updatePasswordUpdate:updatePasswordUpdate,updatePasswordCurrent:updatePasswordCurrent}, 
    {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization':localStorage.getItem("token")
        },
        // ,withCredentials: true
    })
    .then(function (response) {
      setAlertFunc(response.data.msg)
      setTimeout(() => {
        logout()
        window.location.reload();
      }, 4000);
    })
    .catch(function (error) {
        setAlertFunc(error.response.data.validationErrors)     
    });
}