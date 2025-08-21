import { useEffect,useState } from "react";
import { retrieveImg } from "./retrieveImg";
import defaultBackground from "/defaultBackground.png";
export default function RenderBackgroundImg({url}) {
  let [img,setImg]=useState('')
  useEffect(()=>{
      if(url === null || url ==""){
          return
      }
    let imageUrl = null;

    const fetchData = async () => {
      imageUrl = await retrieveImg(url);
      setImg(imageUrl);
    };
  
    fetchData().catch(console.error);
  
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  },[])

  return (
    <>
      {img === '' ? <img src={defaultBackground} className="profileBackground"></img> : <img className="profileBackground" src={img}></img>}
    </>)
}