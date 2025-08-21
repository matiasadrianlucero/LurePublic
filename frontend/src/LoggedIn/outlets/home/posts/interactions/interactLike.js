import axios from "axios"
import getAdress from "../../../../../getAdress";
export  default async function interactLike(postId,animateLike){
  let adress=getAdress()
  console.log(postId)
  try {
    axios.post(adress + '/like/Post', {postId:postId},
      
        {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                          'Authorization':localStorage.getItem("token")

            }
            ,
            // withCredentials: true
        })
        .then(function (response) {
          if(response.data.result==true){
            animateLike()
          }
        })
        .catch(function (error) {
          console.error('Error:', error);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}