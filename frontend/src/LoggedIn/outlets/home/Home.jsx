import {useEffect, useState} from 'react'

import CreatePost from './createPost/CreatePost.jsx'
import FullPost from '../../popups/FullPost/FullPost.jsx'
import { useNavigate } from "react-router-dom";

import retrieveMyFeed from './posts/retrieveMyFeed.js'
import retrieveExplore from './posts/retrieveExplore.js'

import RenderTab from './feed/RenderTab.jsx'
export default function Home({tabSelected}){
  const [displayFullPost, setDisplayFullPost] = useState(false);
  
  const [fullPostData, setFullPostData] = useState([]);
  const navigate = useNavigate();

  function changeFullPost(data){
    setDisplayFullPost(!displayFullPost)
    setFullPostData(data);
    
  }
  return (<>
    {displayFullPost && 
      <FullPost changeFullPost={changeFullPost} data={fullPostData}/>
    }
    <div className='feedButtons'>
      <div style={{flex:3}}>
        <h4>Home</h4>
      </div>
      <div style={{justifyContent:"space-evenly",display:"flex"}}>
        <button className={`tabButton ${tabSelected==="Feed" && 'selected'}`} id='feedButton' onClick={()=>{navigate("/Home/Feed")}}>
          My Feed
        </button>
        <button className={`tabButton ${tabSelected==="Explore" && 'selected'}`} id='exploreButton' onClick={()=>{navigate("/Home/Explore")}}>
          Explore
        </button>
      </div>
    </div>
    <CreatePost/>
    {tabSelected === "Feed" && <RenderTab tabToRender={retrieveMyFeed} compact={false}/>}
    {tabSelected === "Explore" && <RenderTab tabToRender={retrieveExplore} compact={false}/>}    
  </>)
}

