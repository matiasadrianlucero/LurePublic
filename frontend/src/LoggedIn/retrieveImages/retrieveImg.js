import axios from 'axios'
import getAdress from '../../getAdress';
export async function retrieveImg(fileName){
    let adress=getAdress()
  
    return new Promise((resolve, reject) => {
      let url = adress + '/img/'+fileName
      axios.get(url, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization':localStorage.getItem("token")

        },
      })
        .then(function (response) {
          if (response.status === 200) {
            const imgUrl = response.data.url
            resolve(imgUrl);
          } else {
            reject(new Error('Failed to fetch image'));
          }
        })
        .catch(error => {
          reject(error);
        });
    }
  )

}