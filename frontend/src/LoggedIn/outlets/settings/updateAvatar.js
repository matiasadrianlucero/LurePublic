import axios from "axios";
import getAdress from "../../../getAdress";
export default async function updateAvatar(setAlertFunc,handleProfilePicChange){
  let adress=getAdress()
    const updateAvatarFile = document.getElementById("updateAvatarFile").files[0]
    let formData = new FormData()
    formData.append('file', updateAvatarFile)
    
    axios.put(adress + '/update/Avatar/', formData, 
    {
        headers: {
            'Content-Type': 'multipart/form-data',
            'folder': 'avatar/',
            'Authorization':localStorage.getItem("token")
        }
        ,
        // ,withCredentials: true
    },
  )
    .then(function (response) {
        localStorage.setItem("avatar",response.data.updatedData)
        handleProfilePicChange(response.data.updatedData)
        setAlertFunc(response.data.msg)
        return
    })
    .catch(function (error) {
      setAlertFunc(error.response.data.validationErrors)     
    });
  }
