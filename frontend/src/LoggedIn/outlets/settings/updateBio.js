import axios from "axios";
import getAdress from "../../../getAdress";

export default async function updateBio(setAlertFunc,inputBio,handleBioChange){
    let adress=getAdress()

    axios.put(adress + '/update/Bio', {bio:inputBio}, 
    {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization':localStorage.getItem("token")

        },
        // ,withCredentials: true
    })
    .then(function (response) {
      handleBioChange(response.data.updateData)
      setAlertFunc(response.data.msg,response.data.result)
      return
    })
    .catch(function (error) {
      setAlertFunc(error.response.data.validationErrors)     
    });
}