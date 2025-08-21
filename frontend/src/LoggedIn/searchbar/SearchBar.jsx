import findUser from "./findUser"
import { useDebounce } from 'use-debounce';
import {useEffect, useState} from 'react'

import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import eyeglass from "/findUser/search.svg"
import close from "/findUser/Close_MD.svg"
import tagSVG from '/createPost/tag.svg'
import add from '/createPost/Add_Plus.svg'

import RenderUsers from "./RenderUsers";
export default  function SearchBar(){
  let [fetching,setFetching]=useState(true)
  const navigate = useNavigate();  
  let [textToFind,setTextToFind]=useState('')
  let [findUserResults,setFindUserResults]=useState([])
  
  const [debouncedFindUser] = useDebounce(textToFind, 1500);
  
  function switchLoading(bool){
    setFetching(bool)
  }
  useEffect(() => {
    setFindUserResults([])
    const fetchData = async () => {
      
      try {
        const data = await findUser(textToFind,switchLoading);
        console.log(data)
        setFindUserResults(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setFetching(false)
      }
    };
    if (textToFind !== '') {
      fetchData();
    } else {
      setFetching(true)
      setFindUserResults()
    }
  },[debouncedFindUser])
  useEffect(()=>{
    if(fetching){
      return
    } else {
      setFetching(true)
    }
  },[textToFind])

  const [tagToBeAdded, setTagToBeAdded] = useState("");
  const [tags, setTags] = useState([]);
  function createTag(){
    let tempArr=tags
    tagToBeAdded.trim()
    console.log("tagto" + tagToBeAdded + "a",tagToBeAdded!="",tagToBeAdded!=" ",)
    if(tagToBeAdded!=" " && tempArr.includes(tagToBeAdded)==false && tags.length<4){
      setTags(tags=>([...tags,tagToBeAdded.trim()]))
    }
    console.log(tags)
    setTagToBeAdded("")
  }
  useEffect(()=>{
    if(tagToBeAdded.endsWith(" ")){
      createTag()
    }
  },[tagToBeAdded])
  function removeTag(tagToBeRemoved){
    setTags(tags.filter(a =>
      a !== tagToBeRemoved
    ));
  }
  function decideSearch(){
    tags.length>0 && textToFind && navigate('/Search/Post/' + textToFind.trim() + '/' + tags.join("&")) 
    textToFind && navigate('/Search/Post/' + textToFind.trim()) 
    tags.length>0 && navigate('/Search/Tags/' + tags.join("&"))
  }
  return (<>
    <div className={`searchForm ${textToFind!="" && 'changeBorderRadius'}`}>
      <form onSubmit={()=>{
        decideSearch()
        }}
      >
        <input placeholder="Search" className="searchInput" value={textToFind} onChange={(event)=>{setTextToFind(event.target.value)}} ></input>  
        <img onClick={()=>{textToFind!="" && setTextToFind(""),setTags([])}} src={textToFind!="" ? close : eyeglass}></img>
      </form> 
      <div style={{display:"flex",flexWrap:"wrap"}}>
        {tags && tags.map((content,i)=>{
          return (    
              <div key={i} className="tags">
                <button onClick={()=>{removeTag(content)}}><p>{content}</p></button>
              </div>
          )
        })}
      </div>
    </div>

    {textToFind !== ''  && 
      <>
      <div id='searchContent'>
        {fetching ?
          <div style={{padding:"1vmax"}}>
          <svg id="dots" fill="black" className="loadingFind"width="132px" height="58px" viewBox="0 0 132 58" version="1.1" xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
            <defs></defs>
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketch:type="MSPage">
                <g id="dots" sketch:type="MSArtboardGroup" fill="#A3A3A3">
                    <circle id="dot1" sketch:type="MSShapeGroup" cx="25" cy="30" r="13"></circle>
                    <circle id="dot2" sketch:type="MSShapeGroup" cx="65" cy="30" r="13"></circle>
                    <circle id="dot3" sketch:type="MSShapeGroup" cx="105" cy="30" r="13"></circle>
                </g>
            </g>
          </svg>
          </div>
          :
          <>
            {findUserResults.length>0 &&
            <>
              <RenderUsers data={findUserResults} />
            </> 
            }
          </>
        }
        {fetching==false && findUserResults.length==0 &&
          <p >No profiles found.</p>
        }
        {tags.length<4 &&
          <form className={`searchTags`} onSubmit={()=>{event.preventDefault(),createTag()}}>
            <img src={tagSVG}></img>
            <input  maxLength={10} value={tagToBeAdded} onChange={(e)=>{setTagToBeAdded(e.target.value)}}></input>
            <button onClick={()=>{createTag()}}><img src={add}></img></button>
          </form>
        }
      </div>
      

      </>
    }

  </>)
}
