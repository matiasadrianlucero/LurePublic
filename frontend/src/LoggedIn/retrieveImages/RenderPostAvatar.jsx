import { useEffect,useState } from "react";
import { retrieveImg } from "./retrieveImg";
import defaultAvatar from "/defaultAvatar.jpg";
export default function RenderPostAvatar({url}) {
  let [img,setImg]=useState('')
  useEffect(()=>{
      if(url === "" || url === null){
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
    {img === '' ? <img src={defaultAvatar} className="postAvatar"></img> : <img className="postAvatar" src={img}></img>}
    </>)
}