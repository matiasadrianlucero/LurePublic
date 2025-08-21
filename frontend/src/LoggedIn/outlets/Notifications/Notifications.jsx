import {useEffect,useState} from 'react'
import {retrievePendingRequests} from './retrievePendingRequests'
import { acceptFollowRequest } from './acceptFollowRequest'
import { denyFollowRequest } from './denyFollowRequests'
import { dismissNotification } from './dismissNotification'
import RenderPostAvatar from '../../retrieveImages/RenderPostAvatar'
import { useNavigate } from "react-router-dom";
import NothingFound from '../../misc/NothingFound'
export default function Notifications(){
    let navigate =useNavigate()
    const [pendingRequests,setPendingRequests]=useState([])
    const [notifications,setNotifications]=useState([])
    const [limitNotifications,setLimitNotifications]=useState("all")
    
    const fetchdata =async ()=>{
        try{
            let results=await retrievePendingRequests()
            results.pendingRequests.length>0 && setPendingRequests(pendingRequests=>[...pendingRequests,...results.pendingRequests])
            results.notifications.length>0 && setNotifications(notifications=>[...notifications,...results.notifications])
        } catch(e){
            console.log(e)
        }
    }
    function removeNotification(index){
        let tempFiles=notifications
        setNotifications(notifications.filter((item=>item!==tempFiles[index])))
    }  
    function removeRequest(index){
        let tempFiles=pendingRequests
        setPendingRequests(pendingRequests.filter((item=>item!==tempFiles[index])))
    }  
    useEffect(()=>{
        fetchdata()
    },[])
    return (<>
        <div className='feedButtons'>
        <div style={{flex:3}}>
            <h4>Notifications</h4>
        </div>
        <div style={{flex:1,justifyContent:"space-evenly",display:"flex"}}>
            <button id='feedButton' className={`tabButton ${limitNotifications=="all" && "selected"}`} onClick={()=>{setLimitNotifications("all")}}>
                All
            </button>
            <button id='exploreButton' className={`tabButton ${limitNotifications=="alerts" && "selected"}`} onClick={()=>{setLimitNotifications("alerts")}}>
                Alerts
            </button>
            <button id='exploreButton' className={`tabButton ${limitNotifications=="pending" && "selected"}`} onClick={()=>{setLimitNotifications("pending")}}>
                Pending
            </button>
        </div>

        </div>
        { pendingRequests.length>0 && (limitNotifications=="all" || limitNotifications=="pending") && pendingRequests.map((request,index)=>{
            return (
                <div key={index} className="follow" >
                    <RenderPostAvatar url={request.sendingRelation.profilePic}/>
                    <p style={{width:"50%",
                        textOverflow: "ellipsis",textAlign:"start",
                        whiteSpace: "nowrap",
                        overflow: "hidden"}}
                        onClick={()=>{navigate(`/Profile/${request.sendingRelation.username}`)}}
                        >{request.sendingRelation.username} wants to follow you.</p>
                    <div className='pendingButtons'>
                        <button onClick={()=>{
                            acceptFollowRequest(request.sendingRelation.username,removeRequest,index)
                        }}>Accept</button>
                        <button onClick={()=>{
                            denyFollowRequest(request.sendingRelation.username,removeRequest,index)
                        }}>Deny</button>
                    </div>
                </div>
            )
        })}
        {pendingRequests.length==0 && limitNotifications=="pending" && 
            <NothingFound />
        }
        {notifications.length>0 && (limitNotifications=="all"|| limitNotifications=="alerts")&& notifications.map((request,index)=>{
            return (
                <div key={index} className="follow" >
                    <RenderPostAvatar url={request.sendingRelation.profilePic}/>
                    <p style={{width:"50%",
                        textOverflow: "ellipsis",textAlign:"start",
                        whiteSpace: "nowrap",
                        overflow: "hidden"}} 
                        onClick={()=>{navigate(`/Profile/${request.sendingRelation.username}`)}}
                        >{request.sendingRelation.username} {request.text}</p>
                    <div className='pendingButtons'>
                        <button onClick={()=>{dismissNotification(request.sendingRelation.username,removeNotification,index)}}>Dismiss</button>
                    </div>
                </div>
            )
        })}
        {notifications.length==0 && limitNotifications=="alerts" && 
            <NothingFound />
        }
        {pendingRequests.length==0 && notifications.length==0  && limitNotifications=="all" && 
            <NothingFound />
        }
    </>)
}