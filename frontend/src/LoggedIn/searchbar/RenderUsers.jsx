import RenderPostAvatar from "./../retrieveImages/RenderPostAvatar";
import { useNavigate } from "react-router-dom";
export default function RenderUsers({data}){
    let navigate = useNavigate()
    return(<>
        {data.map((user,i)=>{
            return(
                <>
                <div key={user.username} className="findUser" style={{display:"flex"}} onClick={()=>{navigate("/Profile/" + user.username)}}>
                    <RenderPostAvatar url={user.profilePic} />
                    <div style={{display:"flex",flexDirection:"column"}}>
                        <p className="findUsername">{user.username}</p>
                        <p className="searchFollowAmmount">{user.reciever.length} Followers</p>
                    </div>
                </div>
                </>
            )
        })}
        </>
    )
}