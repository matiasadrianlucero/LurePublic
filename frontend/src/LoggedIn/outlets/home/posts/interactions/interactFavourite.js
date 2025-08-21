import axios from "axios"
import getAdress from "../../../../../getAdress";
export  default async function interactFavourite(postId,animateFavourite){

  let adress=getAdress()
  try {
    axios.post(adress + '/favourite/Post', {postId:postId}, 
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
            animateFavourite()
          }
        })
        .catch(function (error) {
          console.error('Error:', error);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}