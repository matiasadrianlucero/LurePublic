import axios from 'axios'
import getAdress from '../../../getAdress';
export default async function sendFollowRequest(userToFollow,handleChangeFollowingState){
  let adress = getAdress()
  axios.post(adress + '/send/followRequest', {userToFollow:userToFollow}, 
  {
      headers: {
          'X-Requested-With': 'XMLHttpRequest',
                    'Authorization':localStorage.getItem("token")

      }
      ,
      // withCredentials: true
  })
  .then(function (response) {
    if(response.data){
      response.data.msg=="Follow request accepted." && handleChangeFollowingState("accepted")
      response.data.msg=="Follow request sent." && handleChangeFollowingState("pending")
    }
  })
  .catch(function (error) {
    console.error('Error:', error);
  });
}