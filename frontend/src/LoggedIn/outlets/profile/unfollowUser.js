import axios from 'axios'
import getAdress from '../../../getAdress';
export default async function unfollowUser(userToUnfollow,handleChangeFollowingState){
  let adress=getAdress()
  axios.post(adress + '/cancel/followRequest', {userToUnfollow:userToUnfollow}, 
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
      handleChangeFollowingState("none")
      console.log("Unfollowed")
    }
  })
  .catch(function (error) {
    console.error('Error:', error);
  });
}