import axios from 'axios'
import getAdress from '../../../../../getAdress'
  export async function  submitComment(postId,postText,addComment){
    let comment =postText
    let adress=getAdress()
    let url = adress + '/comment/Post' 
    if(postText==""){
      return 
    }
    try {
      const response = await axios.post(url,{comment:comment,postId:postId}, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization':localStorage.getItem("token")

        }
        ,
        // withCredentials: true
      }
      
      );
      if (response.data.result) {
        if (response.data.result) {
          addComment()
        }

      } else {  console.log('No data found');
        return null;
      }
    } catch (error) {
      console.log(error)
      throw error;
    }
  }