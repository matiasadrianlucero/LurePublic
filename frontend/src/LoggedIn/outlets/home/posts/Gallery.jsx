import RenderPostImg from "../../../retrieveImages/RenderPostImg"
import { useState,useEffect } from "react"
export default function Gallery({changeFullPost,data}){
    let [imgs,setImgs]=useState([])
    useEffect(() => {
        let arr=[data.img,data.img2,data.img3]
        let tempArr=[]
        arr.forEach(element => {
            if(element!==null && element!==""){
                tempArr.push(element)
            }
        });
        setImgs(tempArr)
    }, []);
    return(<>
        {imgs.map((file,i)=>{
            return(
            <div key={i} onClick={()=>{screen.width>768 && changeFullPost(imgs)}}> 
                    <RenderPostImg url={file} />
            </div>)    
        })}
        </>
    )
}