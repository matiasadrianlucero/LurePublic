import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logout from "../logout";
import {useState} from 'react'

import homeIcon from '/sidebar/darkIcons/House_01.svg'
import RenderPostAvatar from "../retrieveImages/RenderPostAvatar";
import bookmark from '/sidebar/darkIcons/Bookmark.svg'
import friendRequest from '/sidebar/darkIcons/Users.svg'
import settingsIcon from '/sidebar/darkIcons/Settings.svg'
import logoutIcon from '/sidebar/darkIcons/Exit.svg'

import lightHomeIcon from '/sidebar/lightIcons/House_01.svg'

import lightBookmark from '/sidebar/lightIcons/Bookmark.svg'
import lightFriendRequest from '/sidebar/lightIcons/Users.svg'
import lightSettingsIcon from '/sidebar/lightIcons/Settings.svg'

import darkSearch from '/sidebar/darkIcons/search.svg'
import lightSearch from '/sidebar/lightIcons/search.svg'


import lureIcon from '/fishBait.png'

import { checkNotifications } from "./checkNotifications";
export default function SideBar({changeMiddleContent}){
    const navigate = useNavigate();

    let [notificationAmmount,setNotificationAmmount]=useState(0)

    async function retrieveNotificationAmmount(){
        let result=await checkNotifications()
        setNotificationAmmount(result.notificationsCount)
    }
    function reduceNotificationAmmount(){
        setNotificationAmmount(notificationAmmount>0 && notificationAmmount-1)
    }
    useEffect(()=>{
        retrieveNotificationAmmount()
    },[])
    return(<>
        <div className="sideBar">
             <div className="titleContainer">
                    <img src={lureIcon}></img>
                    <h2>LURE</h2>
            </div>
            <div className="topButtons">
                <button className={`sidebarButton ${window.location.pathname.includes("Home") && "sideBarSelected"}`} onClick={()=>{navigate("/Home/Feed"),("home")}}>
                    <img src={window.location.pathname.includes("Home") ? lightHomeIcon : homeIcon }></img><p>Home</p>
                </button>

                <button className={`sideBarSearch sidebarButton ${window.location.pathname.includes("Search") && "sideBarSelected"}`} onClick={()=>{navigate(`/Search`)}}>
                    <img src={window.location.pathname.includes("Search") ? lightSearch : darkSearch}></img><p>Search</p>
                </button>
                <button className={`sidebarButton ${window.location.pathname.includes(localStorage.getItem("username")) && !window.location.pathname.includes("Favourites") && "sideBarSelected"}`} onClick={()=>{
                    navigate("/Profile/" + localStorage.getItem("username"))}}>
                    <RenderPostAvatar url={localStorage.getItem("avatar")}/><p>My Profile</p>
                </button>

                <button className={`sidebarButton ${window.location.pathname.includes("Favourites") && "sideBarSelected"}`} onClick={()=>{navigate(`/Profile/${localStorage.getItem('username')}/Favourites`)}}>
                    <img src={window.location.pathname.includes("Favourites") ? lightBookmark : bookmark}></img><p>Favourites</p>
                </button>
                <button className={`sidebarButton ${window.location.pathname.includes("Notifications") && "sideBarSelected"}`} onClick={()=>{navigate(`/Notifications`)}} >
                    <img src={window.location.pathname.includes("Notifications") ? lightFriendRequest : friendRequest}></img>
                    <p>Notifications</p>
                    {notificationAmmount>0 && <p style={{flex:1,justifySelf:"end"}}>{notificationAmmount}</p>}
                </button>
                <button className={`sidebarButton ${window.location.pathname.includes("Settings") && "sideBarSelected"}`} onClick={()=>{navigate("/Settings/")}} >
                    <img src={window.location.pathname.includes("Settings") ? lightSettingsIcon : settingsIcon}></img><p>Settings</p>
                </button>    
                <button id="reduceNotificationAmmount" style={{display:"none"}} onClick={()=>{reduceNotificationAmmount()}} >
                
                </button>    
            </div>
            <div className="bottomButtons" style={{marginBottom:"2vw"}}>
                <button onClick={()=>{navigate("/"),logout()}} className="sidebarButton logout"><img src={logoutIcon}></img><p>Logout</p></button>
            </div>
        </div>
    </>)
}