import RenderPostAvatar from "../../retrieveImages/RenderPostAvatar"
import { useNavigate,useParams } from "react-router-dom";
import loading from '/loading.svg'
import { useEffect,useState } from "react";
import retrieveFollowing from "./retrieveFollowing";

export default function RenderFollowing(){
    let [fetching,setFetching]=useState(true)
    let [data,setData]=useState([])
    const navigate = useNavigate();
    const {username}=useParams()

    useEffect(()=>{
        const fetchData = async () => {
            try {
                let res= await retrieveFollowing(username)
                setData(res);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setFetching(false)
            }
        }
        fetchData()
    },[])
    return(<>
        {fetching==true && <div style={{width:"100%",justifyContent:"center",display:"flex"}}><img className='loading' src={loading}></img></div>}
        
        {data.length==0  && fetching==false && 
            <p style={{color:"gray",textAlign:"center"}}>Not followed by anyone at the moment.</p>
        }
        {data.length>0 && data.map((follow,index)=>{
            return(
                <div key={index} className="follow" onClick={()=>{navigate(`/Profile/${follow.recieverRelation.username}`)}}>
                    <RenderPostAvatar url={follow.recieverRelation.profilePic}/>
                    <p style={{width:"50%",
                        textOverflow: "ellipsis",textAlign:"start",
                        whiteSpace: "nowrap",
                        overflow: "hidden"}} >{follow.recieverRelation.username}</p>
                    {follow.response=="pending" && <p style={{textAlign:"end",flexGrow:"1",color:"#3170BE",fontWeight:"600"}}>Pending</p>}
                </div>
            )
        })}
    </>)
}