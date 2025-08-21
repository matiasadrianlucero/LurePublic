import axios from 'axios'
import getAdress from '../../../getAdress';
export default async function retrieveTags(date,text) {
    let adress=getAdress()
    let lastDate = date
    let url = adress + '/tags/' + text
    try {
        const response = await axios.get(url, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization':localStorage.getItem("token"),
                'LastDate': lastDate
            }
            ,Authorization:localStorage.getItem("token")
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