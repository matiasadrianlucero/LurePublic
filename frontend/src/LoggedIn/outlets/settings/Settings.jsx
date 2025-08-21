import updateUsername from "./updateUsername"
import updateAvatar from "./updateAvatar"
import updateBackground from "./updateBackground"
import updateEmail from "./updateEmail"
import updatePassword from "./updatePassword"
import updateBio from "./updateBio"
import updatePrivacy from "./updatePrivacy"

import { useEffect, useState } from "react"
import edit from  "/profile/Edit_Pencil_01.svg"
import darkEdit from  "/settings/darkEdit_Pencil_01.svg"

import cancel from  "/settings/Close_MD.svg"
import check from  "/settings/Check.svg"
import paperclip from  "/settings/Edit_Pencil_01.svg"
import RenderPostAvatar from "../../retrieveImages/RenderPostAvatar"
import RenderBackgroundImg from "../../retrieveImages/RenderBackgroundImg"
import AlertMsg from "../../popups/alert/AlertMsg"

import leftSwitch from '/settings/Switch_Left.svg'
import rightSwitch from '/settings/Switch_Right.svg'

import darkUser from '/settings/darkUser_Square.svg'
import lightUser from '/settings/User_Square.svg'

import shield from '/settings/Shield.svg'
import darkShield from '/settings/darkShield.svg'

import downCaret from '/settings/Caret_Circle_Down.svg'
import upCaret from '/settings/Caret_Circle_Up.svg'

import { retrieveSettings } from "./retrieveSettings"
export default function Settings({changePopUp}){
    const [alert, setAlert] = useState([]);
    
    const [editingUsername, setEditingUsername] = useState(false);
    const [editingBio, setEditingBio] = useState(false);
    const [editingEmail, setEditingEmail] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);

    const [password, setPassword] = useState("");

    const [personalInfo, setPersonalInfo] = useState(true)
    
    const [inputBackgroundPic, setInputBackgroundPic] = useState("");
    const [inputProfilePic, setInputProfilePic] = useState("");

    const [inputUsername, setInputUsername] = useState("");
    const [inputBio, setInputBio] = useState("");
    const [inputEmail, setInputEmail] = useState("");

    const [privacyInput, setPrivacyInput] = useState("");

    const [defaultUsername, setDefaultUsername] = useState("");
    const [defaultBio, setDefaultBio] = useState("");
    const [defaultEmail, setDefaultEmail] = useState("");

    const [inputPassword, setInputPassword] = useState("");
    const [advancedSettings, setAdvancedSettings] = useState(false)

    function setAlertFunc(messages){
        setAlert([]);
        setTimeout(()=>{
            setAlert(prevAlerts => [...prevAlerts, ...messages]);
        },500)
        
    }
    function closeAlert(){
        setAlert([])
    }
    
    useEffect(()=>{
        let fetchData = async ()=>{
            let result = await retrieveSettings()
            
            setInputBackgroundPic(result.backgroundPic)
            setInputProfilePic(localStorage.getItem("avatar"))

            setDefaultUsername(localStorage.getItem("username"))
            setInputUsername(defaultUsername)
            setDefaultBio(result.bio)
            setInputBio(defaultBio)

            setDefaultEmail(result.email)
            setInputEmail(defaultEmail)

            setPrivacyInput(result.private)               
        }
        fetchData()
    },[])
    function handleBackgroundPicChange(data){
        setInputBackgroundPic(data)
    }
    function handleProfilePicChange(data){
        setInputProfilePic(data)
    }
    function handleUsernameChange(data){
        setDefaultUsername(data)
    }
    useEffect(()=>{
        setInputUsername(defaultUsername)
    },[defaultUsername])
    function handleBioChange(data){
        setDefaultBio(data)
    }
    useEffect(()=>{
        setInputBio(defaultBio)
    },[defaultBio])
    function handlePrivacySettingChange(){
        setPrivacyInput(!privacyInput);
    }
    function handleEmailChange(data){
        setDefaultEmail(data);
    }
    useEffect(()=>{
        setInputEmail(defaultEmail)
    },[defaultEmail])
    return (<>
        {alert.length>0 && 
            <AlertMsg arr={alert} closeFunc={closeAlert}/>
        }   
        <h3>Settings</h3>     
        <div className="accountSettings">
            <div className={`advancedSettings ${personalInfo && "advacendSelected"}`}>
                <button onClick={()=>{setPersonalInfo(!personalInfo)}} className={`openAdvanced ${personalInfo && "openAdvancedSelected"}`}>
                    <img src={personalInfo ? upCaret : downCaret}></img>
                    <h4 className={`${personalInfo && "advancedSelectedButton"}`}>Personal Settings<img src={personalInfo ? darkUser : lightUser}></img></h4>
                </button>
                {personalInfo &&
                <>
                    <div className="imageSettings">
                        <div className="backgroundSettings">
                            <RenderBackgroundImg key={inputBackgroundPic} url={inputBackgroundPic} />
                            <img onClick={()=>{document.getElementById("updateBackgroundFile").click()}} className="editButton" src={paperclip}></img>
                            <form style={{display:"none"}} >
                                <input accept="image/png, image/jpeg, image/jpg" type="file" id="updateBackgroundFile" onChange={()=>{updateBackground(setAlertFunc,handleBackgroundPicChange)}}></input>
                            </form>
                        </div>
                        <div className="avatarSettings">
                            <RenderPostAvatar key={inputProfilePic} url={inputProfilePic} />
                            <img className="editButton" src={paperclip} onClick={()=>{document.getElementById("updateAvatarFile").click()}} ></img>
                            <form style={{display:"none"}} >
                                <input accept="image/png, image/jpeg, image/jpg" type="file" id="updateAvatarFile" onChange={()=>{updateAvatar(setAlertFunc,handleProfilePicChange)}}></input>
                            </form>
                        </div>
                    </div>
                    <div className="textSettings">
                    <form className="privateSettings"> 
                        <label>Username</label>
                        <input className="settingInput"  disabled={editingUsername ? false : true} onChange={(e) => setInputUsername(e.target.value)} value={inputUsername} id="updateUsername"></input>
                        <button className="updateButton " onClick={(e)=>{e.preventDefault(),setEditingUsername(!editingUsername),setInputUsername(defaultUsername)}}>
                            <img className="" src={editingUsername ? cancel  : darkEdit}  ></img>
                        </button>    
                        {editingUsername && 
                            <button className="updateButton" type="submit" onClick={(e)=>{e.preventDefault(),updateUsername(setAlertFunc,inputUsername,handleUsernameChange)}}><img className=" submitUpdate"src={check}></img></button>    
                        }
                    </form>       

                    <form className="privateSettings">
                        <label>Bio</label>
                        <textarea maxLength={99} disabled={editingBio ? false : true}  className="bioTextarea" id="updateBio" onChange={(e) => setInputBio(e.target.value)} value={inputBio} ></textarea>   
                        <button className="updateButton"  type="submit" onClick={(e)=>{e.preventDefault(),setEditingBio(!editingBio),setInputBio(defaultBio)}}>
                            <img className="" src={editingBio ? cancel  : darkEdit} ></img>
                        </button>    
                        {editingBio && 
                            <button className="updateButton" type="submit" onClick={(e)=>{e.preventDefault(),updateBio(setAlertFunc,inputBio,handleBioChange)}}><img className=" submitUpdate"src={check}></img></button>    
                        }
                    </form>               
                    </div>
                </>
                }
                
            </div>
            <div className={`advancedSettings ${advancedSettings && "advacendSelected"}`}>
                <button onClick={()=>{setAdvancedSettings(!advancedSettings)}} className={`openAdvanced ${advancedSettings && "openAdvancedSelected"}`}>
                    <img src={advancedSettings ? upCaret : downCaret}></img>
                    <h4 className={`${advancedSettings && "advancedSelectedButton"}`}>Advanced Settings<img src={advancedSettings ? darkShield : shield}></img></h4>
                </button>
                {advancedSettings && 
                    <div className="advancedForms">
                        <form className="privateSettings">
                            <label>Email</label>
                            <input className="settingInput" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)}  disabled={editingEmail ? false : true} id="updateEmail"></input>
                            <button className="updateButton " onClick={(e)=>{e.preventDefault(),setEditingEmail(!editingEmail),setInputEmail(defaultEmail)}}>
                                <img className="" src={editingEmail ? cancel  : darkEdit}  ></img>
                            </button>    
                            {editingEmail && 
                                <button className="updateButton" type="submit" onClick={(e)=>{e.preventDefault(),updateEmail(setAlertFunc,handleEmailChange)}}><img className=" submitUpdate"src={check}></img></button>
                            }
                        </form >
                        <form className="privateSettings">
                            <label>Password</label>
                            <div>
                                <input type="password" disabled={editingPassword ? false :true} className="settingInput" onChange={(e)=>setPassword(e.value)} id="updatePasswordUpdate" placeholder="••••••"></input>
                                <input type="password" disabled={editingPassword ? false :true} className="settingInput" id="updatePasswordCurrent"  placeholder='Current Password'></input>
                            </div>
                            <button className="updateButton " onClick={(e)=>{e.preventDefault(),setEditingPassword(!editingPassword)}}>
                                <img className="" src={editingPassword ? cancel  : darkEdit}  ></img>
                            </button>    
                            {editingPassword && 
                                <button className="updateButton" type="submit" onClick={(e)=>{e.preventDefault(),updatePassword(setAlertFunc)}}><img className=" submitUpdate"src={check}></img></button>
                            }
                        </form> 
                        <form className="privateSettings">
                            <label>Privacy {privacyInput}</label>
                            <p>*Users can't follow you without permission.<br></br>*Posts can't be found in search and won't appear on explore tab.</p>
                            <button type="submit" 
                            onClick={(e)=>{e.preventDefault(),updatePrivacy(privacyInput,handlePrivacySettingChange,setAlertFunc)}}>
                                <img  src={privacyInput==false ? leftSwitch : rightSwitch}></img>
                            </button>    
                        </form >
                    </div>
                }   
            </div>
        </div>
    
    </>)
}