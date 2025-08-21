import { useEffect, useState } from 'react';
import { useNavigate,useParams } from "react-router-dom";

import RenderPostAvatar from '../../retrieveImages/RenderPostAvatar';
import RenderBackgroundImg from '../../retrieveImages/RenderBackgroundImg.jsx';

import retrieveProfile from './retrieveProfile.js'

import unfollowUser from './unfollowUser.js';
import sendFollowRequest from './sendFollowRequest.js';

import RenderTab from '../home/feed/RenderTab.jsx';

import retrieveProfilePosts from './retrieveProfilePosts.js';
import retrieveProfileGallery from './retrieveProfileGallery.js';

import editPencil from "/settings/Edit_Pencil_01.svg"
export default function Profile() {
  const { username } = useParams();
  
  let [profile,setProfileData]=useState()
  let [followingState,setFollowingState]=useState()

  let [profileTab,setTab]=useState("posts")
  const navigate = useNavigate();
  function handleChangeFollowingState(res){
    setFollowingState(res)
  }
  useEffect(() => {
    const fetchData = async ()=>{
      try{
        let results=await retrieveProfile(username)
        setProfileData(results)
        setFollowingState(results.checkIfFollowing)
      } catch(e) {
          console.log(e)
      }
    }
    fetchData()
  },[])
  return (
    <>
      {profile && 
      <>
        <div className='profileData'>
          <div className='profilePersonalInfo'>

            <RenderBackgroundImg url={profile.profileData.backgroundPic} />
            <div className='profileAvatarUsername'>
              <RenderPostAvatar url={profile.profileData.profilePic} />     
              <p>{profile.profileData.username}</p>
            </div>
            {profile.profileData.username!=localStorage.getItem("username") ?
              <>
                <button  className={`followButton ${followingState== "none" && "startFollowing" }`}
                  onClick={()=>{
                    followingState=="pending" || followingState=="accepted" && unfollowUser(profile.profileData.username,handleChangeFollowingState)
                    followingState=="none" && sendFollowRequest(profile.profileData.username,handleChangeFollowingState)
                  }}>
                    {followingState=="none"  && "Follow"}
                    {followingState=="accepted"  && "Unfollow"}
                    {followingState=="pending"  && "Cancel Request"}
                    
                </button>
              </>
              :
              <>
              <button  className={`followButton ${followingState== "none" && "startFollowing" }`}
                  onClick={()=>{
                    navigate(`/Settings`)
                  }}>
                    <img src={editPencil} ></img>Edit
                </button>
              </>
            }
          </div>
          <div className='profileUser'>                       
            <p>{profile.profileData.bio}</p>
            <div className='profileStatContainer'>
              <div>
                <p className='profileStatCount'> {profile.postCount} </p><p className='profileStatClass'> Posts</p>
              </div>
              <div>
                <p className='profileStatCount' >{profile.followingCount} </p> <button className='profileStatClass' onClick={()=>{navigate('/Profile/' + username + '/Following')}}>Following</button>  
              </div>
              <div>
                <p className='profileStatCount' >{profile.followersCount} </p> <button className='profileStatClass' onClick={()=>{navigate('/Profile/' + username + '/Followers')}}>Followers</button>  
              </div>
            </div>  
          </div>

        </div>
        <div className='altLayoutButtons'>
          <button className={`profileDisplayButtons ${profileTab=="gallery" && 'profileSelected'}`} id="imgOnly" onClick={()=>{setTab("gallery")}}>
            Gallery 
          </button>
          <button id="wholePost" className={`profileDisplayButtons ${profileTab=="posts" && 'profileSelected'}`} onClick={()=>{setTab("posts")}}>
            Posts
          </button>
        </div>
  
        {profileTab === "gallery" ? 
        <RenderTab key={profileTab} tabToRender={retrieveProfileGallery} username={username} compact={true}/>
        :
        <RenderTab key={profileTab} tabToRender={retrieveProfilePosts} username={username}/>
        }
      </>
      }
    </>
  )
}
