import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import SideBar from "./sideBar/SideBar"
import checkLogin from "../LoggedOut/javascript/checkLogin";
import SearchBar from "./searchbar/SearchBar";
import logout from "./logout";
export default function LoggedIn(){
    let navigate=useNavigate()
    useEffect(() => {
        let checkToken = async()=>{
            let result=await checkLogin()
            if(result==false){
                logout()
                navigate("/")
            } else {
                return
            }
        }
        if(localStorage.getItem("token")!=null){
            checkToken()
        } else {
            logout()
            navigate("/")
        }
    }, [])
    return (
    <div style={{display:"flex",justifyContent:"center"}}>
        <div className="homeFather">
            <SideBar />
            <div className="middleContainer">
                <Outlet  />
            </div>
            <div className="rightContainer">
                {!window.location.pathname.includes("Search")  && 
                    <SearchBar />
                }
            </div>
        </div>
        
    </div>)
}