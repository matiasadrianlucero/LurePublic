import axios from 'axios'
import getAdress from '../../../getAdress';
export default async function updatePrivacy(privacySetting,handlePrivacySettingChange){
  let adress = getAdress()
  axios.put(adress + '/update/Privacy', {privacySetting:privacySetting},
  {
      headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization':localStorage.getItem("token")
      },
      // ,withCredentials: true
  })
  .then(function (response) {
    if(response.data){
      handlePrivacySettingChange()
    }
  })
  .catch(function (error) {
    console.error('Error:', error);
  });
}