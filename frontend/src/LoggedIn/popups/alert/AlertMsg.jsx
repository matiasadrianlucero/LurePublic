import cross from '/cross.svg'
export default function AlertMsg({arr,closeFunc}){
    return (
        <div id="alert">
            <div>
                {arr && arr.map((content,i)=>{
                    return(
                        <p key={i} className="alert-msg">{content.msg}</p>
                    )
                })}
            </div>
            <button><img src={cross} onClick={()=>{closeFunc()}}></img></button>
        </div>
    )
}