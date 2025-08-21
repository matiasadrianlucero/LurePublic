import { useState } from "react";
import RenderFollowing from "./RenderFollowing"
import RenderFollowers from "./RenderFollowers"
import { useNavigate,useParams } from "react-router-dom";

export default function FollowingAndFollowers({followers}){
    const navigate = useNavigate();
    const {username}=useParams()
    return (
        <>
            <div className='feedButtons'>
                <div style={{flex:3}}>
                    <h4>{username}</h4>
                </div>
                <div style={{flex:1,justifyContent:"space-evenly",display:"flex"}}>
                    <button className={`tabButton ${window.location.pathname.includes("Following") && 'selected'}`} id='exploreButton' onClick={()=>{navigate('/Profile/'+ username + '/Following')}}>
                        Following
                    </button>
                    <button className={`tabButton ${window.location.pathname.includes("Followers") && 'selected'}`} id='feedButton' onClick={()=>{navigate('/Profile/' +  username +'/Followers')}}>
                        Followers
                    </button>
                </div>
            </div>
            {followers ?
                <RenderFollowers />
                :
                <RenderFollowing />
            } 
            
        {/* </div> */}
        </>
    )
}