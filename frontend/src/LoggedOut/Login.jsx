import { useState } from "react"
import loadingGray from '/loadingGray.svg'
import loginUser from "./javascript/loginUser"
import { useNavigate } from "react-router-dom"
export default function Login(){
    let navigate=useNavigate()
    let rememberMe=false

    let [loginUsername,setLoginUsername]=useState("")
    let [loginPassword,setLoginPassword]=useState("")

    let [awaitingResponse,setAwaitingResponse]=useState(false)
    let [resultOfLogin,setResultOfLogin]=useState(null)

    let [loginErrors,setLoginErrors]=useState([])
    
    function resolveResponse(text){
        setAwaitingResponse(false)
        setResultOfLogin(text)
    }
    async function attemptLogin(){
        setAwaitingResponse(true)
        try {
            setLoginErrors([])
            let result=await loginUser(loginUsername,loginPassword,rememberMe,navigate,resolveResponse)
            setLoginErrors(result)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <form>
            <div className="landingInput">
                <input value={loginUsername} autoComplete="email" onChange={(e)=>setLoginUsername(e.target.value)} type='email' name="loginEmail" id="loginEmail" required/>
                <label className={`${loginUsername!="" && 'inputHasValue'}`} >Email</label>
            </div>
            <div className="landingInput">
                <input value={loginPassword} autoComplete="current-password" onChange={(e)=>setLoginPassword(e.target.value)} type='password' name="loginPassword" id="loginPassword" required/>
                <label className={`${loginPassword!="" && 'inputHasValue'}`}>Password</label>
            </div>
            <div className="rememberMe">
                <input disabled={true} type="checkbox" id="remember" value="remember" onClick={()=>{rememberMe=!rememberMe}} />
                <label htmlFor="remember">Remember me</label>
            </div>            
            <button id='submitLandingForm' onClick={(e)=>{e.preventDefault(),
                attemptLogin()}} className={`submitLandingFormButton ${resultOfLogin=="error" && "submitError"}`}>
                {awaitingResponse ? <img src={loadingGray} className="loadingAnim"/>
                :
                <>
                    {resultOfLogin=="error" ? "Error. Try Again?" : "Login"}
                </>
                }
                
            </button>
            {loginErrors.length>0 &&
              <>
                <ul>
                    {loginErrors.map((error,index)=>{
                        return <li key={index}>{error.msg}</li>
                    })}
                </ul>
              </>
            }
        </form>
    )
}