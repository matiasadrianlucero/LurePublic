import axios from 'axios'
import getAdress from '../../../getAdress'
export default async function retrieveProfilePosts(date,username) {
  let lastDate = date
  let adress=getAdress()
  let url = adress + '/retrieve/'+ username +'/Posts' 
  try {
    const response = await axios.get(url, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
                  'Authorization':localStorage.getItem("token"),

        'LastDate': lastDate
      }
      ,
      // withCredentials: true
    });
    if (response && response.data) {
      return response.data
    } else {  console.log('No data found');
      return null;
    }
  } catch (error) {
    console.log(error)
    throw error;
  }
}