import { createPostJS } from "./createPostJS"
import {useEffect, useCallback ,useState} from 'react'
import addImage from '/post/Image_01.svg'
import AlertMsg from "../../../popups/alert/AlertMsg"
useEmblaCarousel.globalOptions = { watchDrag: false }
import tagSVG from '/createPost/tag.svg'
import add from '/createPost/Add_Plus.svg'

 import useEmblaCarousel from 'embla-carousel-react'
 import arrowLeft from '/createPost/Chevron_Left.svg'
import closeRed from '/createPost/Close_MD.svg'
import FullPost from "../../../popups/FullPost/FullPost"
import Post from "../posts/Post"

 import arrowRight from '/createPost/Chevron_Right.svg'
export default function CreatePost(){
  const [file, setFile] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagToBeAdded, setTagToBeAdded] = useState("");
  const [postsCreated, setPostsCreated] = useState([]);
  const [postText, setPostText] = useState("");

  const [fullPost, setFullPost] = useState(false);


  const [emblaRef, emblaApi] = useEmblaCarousel()

  const [disable, setDisable] = useState("first")

  const [alert, setAlert] = useState([]);

  function setAlertFunc(messages){
    setAlert([]);
    setTimeout(()=>{
        setAlert(prevAlerts => [...prevAlerts, ...messages]);
    },500)    
  }
  function closeAlert(){
      setAlert([])
  }
  function resetFields(){
    setPostText("")
    setFile([])
    setTags([])
    setTagToBeAdded("")
    
  }
  function addPost(data){
    setPostsCreated(prevFeedData => [...data,...prevFeedData]);
  }
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
    emblaApi.canScrollPrev()==false ? setDisable("first") : setDisable("middle")
  }, [emblaApi])
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
    emblaApi.canScrollNext()==false ? setDisable("last") : setDisable("middle")
  }, [emblaApi])
  
  function handleChange(e) {
    let fileList=Object.values(e.target.files)
    fileList=fileList.slice(0,3)
    fileList.map((img,i)=>{
      if(file.length<3){
        setFile(file=>([...file,URL.createObjectURL(img)]))  
      } else {
        return
      }
    })
  }
  function removeFile(index){
    let tempFiles=file
    setFile(file.filter((item=>item!==tempFiles[index])))
  }  
  function createTag(){
    let tempArr=tags

    if(tagToBeAdded!="" && tempArr.includes(tagToBeAdded)==false && tags.length<4){
      setTags(tags=>([...tags,tagToBeAdded.trim()]))
    }
    setTagToBeAdded("")
  }
  const [storedUrls, setStoredUrls] = useState([]);
  function changeFullPost(data){
      setStoredUrls([])
      setStoredUrls(prevUrls=>[...prevUrls,...data])
      setFullPost(!fullPost)
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
  return (<>
    {alert.length>0 && 
        <AlertMsg arr={alert} closeFunc={closeAlert}/>
    }   
    <div className={` createPostContainer ${(file.length>0 || postText!="") && "creatingPost"}`}>
      <div className="createPost">
        {file.length>0 &&               
          <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {file.map((file,i)=>{
                  return (
                  <div className="embla__slide" key={i}>
                    <div className="createPostOptions">
                      <div className="removeImgContainer" onClick={()=>{removeFile(i)}}>
                        <img src={closeRed}></img>                              
                      </div>
                    </div>    
                    <img src={file} key={i}  className="createPostImg"/>
                    

                  </div>
                )})}
                {file.length<3 &&                       
                <div className="embla__slide"> 
                  <button type="submit" className="addImageButton" onClick={()=>{document.getElementById("postImg").click()}}>
                    <img className="uploadImg"  src={addImage} ></img>
                    <p>Upload up to 3 images.</p>
                  </button>
                </div>
                }
              </div>
            </div>
            <div className="postNextContainer">
              <div>
                {disable=="first" ? null : 
                <button id="prevButton" className="embla__prev" onClick={scrollPrev}>
                  <img src={arrowLeft}></img>
                </button>}
              </div>
              <div>
                {disable=="last" ? null : 
                  <button id="nextButton" className="embla__next" onClick={scrollNext}>
                    <img src={arrowRight}></img>
                  </button>
                }
              </div>

            </div>
            
          </div>
        }   
        <div style={{padding:"calc(.5vmax + .5rem)", width:"100%"}}>
          <div className={`createPostTextArea ${file.length>0 && 'noPaddingTop'}`}>
            <textarea onChange={(e)=>{setPostText(e.target.value)}} value={postText} maxLength={140} placeholder="Whats up?..." style={{width:"90%",resize:"none",outline:"none",border:"none",flex:"1"}} id="postText"></textarea>                
          </div>
          <div className="createPostSubmit">
            {file.length==0 &&
              <button type="submit" className="uploadImgButton" onClick={()=>{document.getElementById("postImg").click()}}>
                <img className="uploadImg"  src={addImage} ></img>
              </button>
            }   
            
            <div style={{display:"flex",flexWrap:"wrap",flex:"3"}}>
              {tags.length<4 &&
                <div className={`addTag`}>
                  <img src={tagSVG}></img>
                  <input maxLength={10} value={tagToBeAdded} onChange={(e)=>{setTagToBeAdded(e.target.value)}}></input>
                  <button onClick={()=>{createTag()}}><img src={add}></img></button>
                </div>
              }

            </div>
            <button disabled={file.length>0 || postText!="" ? false : true } type="submit" className="postButtonCreate" onClick={(e)=>{document.getElementById("submitCreatePost").click()}}>
              Post
            </button>
          </div>
          <div style={{display:"flex",width:"100%",justifyContent:"start",marginTop:"calc(.5vmax + .5rem)"}}>
            {tags && tags.map((content,i)=>{
              return (
                <div key={i} className="tags"> 
                  <button onClick={()=>{removeTag(content)}}><p>{content}</p></button>
                </div>
              )
            })}
          </div>

          <form style={{display:"none"}}>  
              <button type="submit" id="submitCreatePost" onClick={(e)=>{e.preventDefault(),createPostJS(tags,resetFields,addPost,setAlertFunc)}}>Post</button>
              <input accept="image/png, image/jpeg, image/jpg" style={{display:"none"}}type='file' onChange={handleChange} id="postImg" name='postImgName' multiple></input>
          </form> 
        </div>
      </div>
    </div>
    {fullPost && 
        <FullPost urls={storedUrls} changeFullPost={changeFullPost}/>
    }
    {postsCreated && 
        postsCreated.map((post,index)=>{
            return (
              <div key={index} className="post">
                <Post key={index} data={post} changeFullPost={changeFullPost} compact={false}/>
              </div>
            )
        }) 
    }

  </>)
}