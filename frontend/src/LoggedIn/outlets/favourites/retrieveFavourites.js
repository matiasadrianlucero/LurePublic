import axios from 'axios'
import getAdress from '../../../getAdress'
export default async function retrieveFavourites(date) {
  
  let adress=getAdress()
  let url = adress + '/retrieve/favourites' 
  let lastDate = date

  try {
    const response = await axios.get(url, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'LastDate': lastDate,
        'Authorization':localStorage.getItem("token")

      },
      

      // ,withCredentials: true
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