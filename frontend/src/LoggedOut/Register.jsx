import { useState } from "react"
import registerUser from "./javascript/registerUser"
import loadingGray from '/loadingGray.svg'

export default function Register(){
    let [registerUsername,setRegisterUsername]=useState("")
    let [registerPassword,setRegisterPassword]=useState("")
    let [registerEmail,setRegisterEmail]=useState("")

    let [awaitingResponse,setAwaitingResponse]=useState(false)
    let [resultOfRegistration,setResultOfRegistration]=useState(null)

    let [registerErrors,setRegisterErrors]=useState([])
    
    function resolveResponse(text){
        setAwaitingResponse(false)
        setResultOfRegistration(text)
    }
    async function attemptRegistration(){
      setAwaitingResponse(true)
        try {
            setRegisterErrors([])
            let result=await registerUser(registerUsername,registerPassword,registerEmail,resolveResponse)
            setRegisterErrors(result)
        } catch (error) {
            console.log(error)
        }
    }

    return(<>
            <form>
              <div className="landingInput">
                <input type='text' disabled={resultOfRegistration=="success" ? true : false} className={`${resultOfRegistration=="success" && "successInput"}`}  value={registerUsername} onChange={(e)=>setRegisterUsername(e.target.value)}  autoComplete="username" id="registerUsername"/>
                <label className={`${registerUsername!="" && 'inputHasValue'}`}>Username</label>
              </div>
              <div className="landingInput">
                <input type='email' disabled={resultOfRegistration=="success" ? true : false}  className={`${resultOfRegistration=="success" && "successInput"}`}  value={registerEmail} onChange={(e)=>setRegisterEmail(e.target.value)} autoComplete="email" id="registerEmail"/>
                <label className={`${registerEmail!="" && 'inputHasValue'}`} >Email</label>
              </div>
              <div className="landingInput">
                <input type='password' disabled={resultOfRegistration=="success" ? true : false}  className={`${resultOfRegistration=="success" && "successInput"}`}  value={registerPassword} onChange={(e)=>setRegisterPassword(e.target.value)} autoComplete="new-password" id="registerPassword"/>
                <label className={`${registerPassword!="" && 'inputHasValue'}`} >Password</label>
              </div>
              <button id='submitLandingForm' disabled={resultOfRegistration=="success" ? true : false}  className={`submitLandingFormButton ${resultOfRegistration=="error" && "submitError"} ${resultOfRegistration=="success" && "submitSuccess"}`} 
              onClick={(e)=>{
                e.preventDefault(),attemptRegistration()
              }}>
                {awaitingResponse ?
                    <img src={loadingGray} className="loadingAnim"/> 
                    :
                    <>
                    {resultOfRegistration=="error" && "Error. Try Again?"}
                    {resultOfRegistration==null && "Register"}
                    {resultOfRegistration=="success" && "Account Created!"}
                    </>
                }
                
              </button>
            </form>

            {registerErrors.length>0 &&
              <>
                <ul>
                    {registerErrors.map((error,index)=>{
                        return <li key={index}>{error.msg}</li>
                    })}
                </ul>
              </>
            }
            
        </>
    )
}