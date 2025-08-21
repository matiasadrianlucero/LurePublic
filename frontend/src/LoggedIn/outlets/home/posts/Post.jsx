import ReactTimeAgo from 'react-time-ago'
import { useEffect,useState,useCallback } from "react"

import { submitComment } from "./interactions/submitComment"
import { useNavigate } from "react-router-dom";

import likeIcon from '/post/Heart_02.svg'
import likeIconFilled from '/post/Heart_02_Yellow.svg'

import bookmarkIcon from '/post/Bookmark.svg'
import bookmarkIconFilled from '/post/BookmarkFilled.svg'

import RenderPostAvatar from "../../../retrieveImages/RenderPostAvatar"
import RenderPostImg from "../../../retrieveImages/RenderPostImg"

import getAllComments from "./getAllComments"

import interactLike from "./interactions/interactLike"
import interactFavourite from './interactions/interactFavourite';

import useEmblaCarousel from 'embla-carousel-react'

import arrowRight from '/createPost/Chevron_Right.svg'
import arrowLeft from '/createPost/Chevron_Left.svg'

import TimeAgo from 'javascript-time-ago'
TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

export default function Post({data,changeFullPost,altLayout}){
    const timeAgo = new TimeAgo('en-US')
    const [time, setTime] = useState(1000);
    
    const navigate = useNavigate();
    let [isLiked,setIsLiked]=useState(
        data.LikesRel.length>0 ? true :false
    )
    let [isFavourite,setIsFavourite]=useState(
        data.Favourites.length>0 ? true :false
    )
    let [likes,setLikes]=useState(data.likes)
    let [comments,setComments]=useState(data.postedIn)
    let [commentAmmount,setCommentAmmount]=useState(data.commentAmmount)
    let [postText,setPostText]=useState("")
    
    let [imgs,setImgs]=useState([])
    let [tags,setTags]=useState([])

    let [allComents,setAllComments]=useState(false)

    const [emblaRef, emblaApi] = useEmblaCarousel()
    const [disable, setDisable] = useState("first")
        
    const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
    emblaApi.canScrollPrev()==false ? setDisable("first") : setDisable("middle")
    }, [emblaApi])
    const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
    emblaApi.canScrollNext()==false ? setDisable("last") : setDisable("middle")
    }, [emblaApi])
    async function viewAllComments(){
        const retrieveResults = await getAllComments(data.id);
        setComments(retrieveResults);
    }
    useEffect(() => {
        if(data.tags){
            let tempString=data.tags
            let tempArr=tempString.split(" ")
            setTags(tempArr)
        }  
        let arr=[data.img,data.img2,data.img3]
        let tempArr=[]
        arr.forEach(element => {
            if(element!==null && element!==""){
                tempArr.push(element)
            }
        });
        setImgs(tempArr)
    }, []);
    function animateLike(){
        if (isLiked){
            setIsLiked(false)  
            setLikes(likes-1) 
            return
        }
        setIsLiked(true) 
        setLikes(likes+1)
    }
    function animateFavourite(){
        isFavourite ? setIsFavourite(false) : setIsFavourite(true)
    }
    function addComment(){
        viewAllComments()
        setPostText("")
        setCommentAmmount(commentAmmount+1)
    }
    
    return (<>
        {imgs.length>0 && 
            <div className="postDivImg">
                {imgs.length>0  && 
                <div className="embla">
                    <div className="embla__viewport" ref={emblaRef}>
                        <div className="embla__container">
                            {imgs.map((file,i)=>{
                                return (
                                <div onClick={()=>{screen.width>768 && changeFullPost(imgs)}} className="embla__slide postImg" key={i}>
                                    <RenderPostImg url={file} />    
                                </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
                }   
                {imgs.length>1 &&
                    <div className="postNextContainer nextContainerPost">
                        {altLayout ? 
                        <>
                            <div>
                                <p> +{imgs.length-1}</p>
                            </div>
                        </> 
                        :
                        <>
                            <div>
                                {disable=="first" ? null : <button id="prevButton" className="embla__prev" onClick={scrollPrev}>
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
                        </>
                        } 
                    </div>
                }
            </div>
        }
        <div className="postCommentSection">
            <div className='postInteractions'>
                <div>
                    <button 
                        onClick={()=>{interactLike(data.id,animateLike)}} className="likeButton"><img src={isLiked ? likeIconFilled : likeIcon} className={`thumbsUp ${ !isLiked && 'commentButton' }`}></img>
                    </button>
                    <button onClick={()=>{
                        interactFavourite(data.id,animateFavourite)
                    }} className="likeButton"><img src={isFavourite ? bookmarkIconFilled : bookmarkIcon} className={`thumbsUp ${ !isFavourite && 'commentButton' }`} ></img>
                    </button>
                </div>
                <p>{likes} Likes {commentAmmount} Comments</p>
            </div>
                
            <div className="postBody">       
                <div>
                    <div className="comment">
                        <RenderPostAvatar url={data.user.profilePic} />
                        <div className='commentContent'>
                            <div className='commentUser' style={{display:"flex"}}>
                                <p className="commentUsername" onClick={()=>{navigate("/Profile/" + data.user.username)}}>{data.user.username} </p>
                                <p className="commentDate"><ReactTimeAgo date={Date.parse(data.dateOfCreation)} locale="en-US"/></p>
                            </div>
                            <p className="commentText">{data.text}</p>     
                        </div>
                    </div>                
                    {allComents ?
                        comments.map((comment,i)=>{
                            
                            return(
                                <div key={i} className="comment">
                                    <RenderPostAvatar url={comment.commentRelation.profilePic} />
                                    <div className='commentContent'>
                                        <div className='commentUser' style={{display:"flex"}}>
                                            <p className="commentUsername" onClick={()=>{navigate("/Profile/" + comment.commentRelation.username)}}>{comment.commentRelation.username} </p>
                                            <p className="commentDate"><ReactTimeAgo date={Date.parse(comment.dateOfCreation)} locale="en-US"/></p>
                                        </div>
                                        <p className="commentText">{comment.response}</p>     
                                    </div>
                                </div>  
                            )              
                        })
                        :
                        <>
                            {comments.length>0 &&
                                <div className="comment">
                                    <RenderPostAvatar url={comments[0].commentRelation.profilePic} />
                                    <div className='commentContent'>
                                        <div className='commentUser' style={{display:"flex"}}>
                                            <p className="commentUsername" onClick={()=>{navigate("/Profile/" + comments[0].commentRelation.username)}}>{comments[0].commentRelation.username} </p>
                                            <p className="commentDate"><ReactTimeAgo date={Date.parse(comments[0].dateOfCreation)} locale="en-US"/></p>
                                        </div>
                                        <p className="commentText">{comments[0].response}</p>     
                                    </div>
                                </div>                 
                            }
                            {comments.length>1 &&
                            
                            <div className="comment">
                                    <RenderPostAvatar url={comments[1].commentRelation.profilePic} />
                                    <div className='commentContent'>
                                        <div className='commentUser' style={{display:"flex"}}>
                                            <p className="commentUsername" onClick={()=>{navigate("/Profile/" + comments[1].commentRelation.username)}}>{comments[1].commentRelation.username} </p>
                                            <p className="commentDate"><ReactTimeAgo date={Date.parse(comments[1].dateOfCreation)} locale="en-US"/></p>
                                        </div>
                                        <p className="commentText">{comments[1].response}</p>     
                                    </div>
                                </div>               
                            }
                            {comments.length>2 && !allComents &&
                                <div className="postComment">
                                    <button onClick={()=>{setAllComments(true),viewAllComments(data.id)}} >View all Comments</button>
                                </div>                                
                            }
                        </>
                    }
                </div>
            </div>
            
            <form className="leaveComment">
                <textarea maxLength={70} placeholder="Add a comment..." name="commentPost" 
                onChange={(event)=>{setPostText(event.target.value)}}
                value={postText}
                // id="commentPost"
                className="commentPost"></textarea>           
                <button onClick={(event)=>{
                        event.preventDefault(),
                        submitComment(data.id,postText,addComment)
                    }}
                    disabled={postText=="" ? true : false}
                >COMMENT</button>
            </form> 
            
            <div className='tagContainer'>
                {tags.length>0 && tags.map((content,i)=>{
                    return  <button className='postTag' onClick={()=>{navigate('/Search/Tags/' + content)}} key={i}>{content} </button>
                })}            
            </div>
        </div>    
    </>)
}