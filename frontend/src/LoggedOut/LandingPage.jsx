import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import checkLogin from "./javascript/checkLogin";
import lureIcon from '/fishBait.png'
import Login from './Login';
import Register from './Register';

import logout from '../LoggedIn/logout';
function App() {
  let [displayLogin,setDisplayLogin]=useState(true)
  let navigate=useNavigate()

  useEffect(() => {
    let checkToken = async()=>{
        let result=await checkLogin()
        if(result==false){
            logout()
            navigate("/")
        } else {
            navigate("/Home/Feed")
        }
    }
    if(localStorage.getItem("token")!=null){
        checkToken()
    } else {
        return
    }
  }, [])
  return (<>
    <div style={{display:"flex",justifyContent:"center",width:"100%",height:"90vh"}}>
      <div className="landing">  
          <div className="titleContainer">
            <img src={lureIcon}></img>
            <h2>LURE</h2>
          </div>
          {displayLogin ? 
            <Login />
            :
            <Register />
          }
          <div className="landingTitle">
            {displayLogin ? 
              <>
              <p className="changeLandingFormText" >Don&apos;t have an account?</p> 
              <button className='smallButton' onClick={()=>{setDisplayLogin(!displayLogin)}}>Sign up here.</button>
              </>
              : 
              <>
              <p className="changeLandingFormText" >Already have an account? </p>
              <button className='smallButton' onClick={()=>{setDisplayLogin(!displayLogin)}}>Log in here.</button>
              </>
            }
          </div> 
      </div>
    </div>
    <div className='landingAlert'>
      <p>Server will spin down with inactivity which may delay requests by 50 seconds or more.</p>
    </div>
  </>)
}

export default App
