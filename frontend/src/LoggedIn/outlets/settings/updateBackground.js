import axios from "axios";
import getAdress from "../../../getAdress";
export default async function updateBackground(setAlertFunc,handleBackgroundPicChange){
    let adress=getAdress()
    const updateBackgroundFile = document.getElementById("updateBackgroundFile").files[0]
    let formData = new FormData()
    
    formData.append('file', updateBackgroundFile)
    
    axios.put(adress + '/update/Background/', formData, 
    {
        headers: {
            'Content-Type': 'multipart/form-data',
            'folder': 'background/',
            'Authorization':localStorage.getItem("token")
        }
        ,
        // ,withCredentials: true
    },
  )
    .then(function (response) {
        handleBackgroundPicChange(response.data.updatedData)
        setAlertFunc(response.data.msg)
        return
    })
    .catch(function (error) {
      setAlertFunc(error.response.data.validationErrors)     
    });
  }
