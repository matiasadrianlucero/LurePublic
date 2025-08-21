import axios from 'axios'
import getAdress from '../../../getAdress';
export default async function retrieveFollowing(userToSearch) {
    let adress=getAdress()

    let url = adress + '/following/' + userToSearch
    try {
        const response = await axios.get(url, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization':localStorage.getItem("token"),
            }
        ,
        // withCredentials: true
        });
        
        if (response && response.data) {
            
            return response.data
        } else {  
            return 0;
        }
    } catch (error) {
        console.log(error)
        throw error;
    }
}