import { useParams } from 'react-router-dom';
import RenderUsers from '../../searchbar/RenderUsers';
import findUser from '../../searchbar/findUser';

import { useState,useEffect } from 'react';

export default function RenderProfileSearch(){
    const { name } = useParams();
    let [findUserResults,setFindUserResults]=useState([])
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const data = await findUser(name);
                console.log(data)
                setFindUserResults(data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        } 
        fetchData()
        
    },[])
    return(
            <RenderUsers data={findUserResults} />
    )
}