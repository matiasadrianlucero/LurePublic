import loading from '/loading.svg'
import loadMore from '/renderTab/Redo.svg'
import Post from '../posts/Post';
import {useEffect, useState, useRef} from 'react'
import Gallery from '../posts/Gallery';
import { useIntersection } from './useInteraction';
import FullPost from '../../../popups/FullPost/FullPost';
export default function RenderTab({tabToRender,username,compact,text,tags,date}){
    const [fetching, setFetching] = useState(false);
    const [feedData, setFeedData] = useState([]);
    const [firstRetrieve, setFirsRetrieve] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);
    const [noMorePosts, setNoMorePosts] = useState(false);

    const [fullPost, setFullPost] = useState(false);

    const [storedUrls, setStoredUrls] = useState([]);
    function changeFullPost(data){
        setStoredUrls(data)
        setFullPost(!fullPost)
    }
    
    const loadMoreRef = useRef(null);
    const isVisible=useIntersection(loadMoreRef,"0px")
    const lastDate = useRef(date ? date : 0);

    const fetchData = async () => {
        if (fetching) return                
        setFetching(true)

        try {
            const data = await tabToRender(lastDate.current,username,text,tags);
    
            if(Object.prototype.hasOwnProperty.call(data.postsList, "error")){
                setIsPrivate(true)
                return
            }
            if(data.postsList.length>0){
                setFeedData(prevFeedData => [...prevFeedData,...data.postsList]);
                lastDate.current=data.postsList[data.postsList.length-1].dateOfCreation
            } else {
                setNoMorePosts(true)
            }
            setFirsRetrieve(true)
            
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setFetching(false)
        }
    };
    useEffect(() => {
        const button = loadMoreRef.current;
        if (button) {
            button.addEventListener("click", fetchData);
        }
        button.click()
        // fetchData()
        return () => {
            button.removeEventListener("click", fetchData);
        };        
    }, []);
    useEffect(()=>{
        if (isVisible && firstRetrieve && loadMoreRef.current) {
            loadMoreRef.current.click(); 
        }
    },[isVisible])
    return (
        <>
        {isPrivate ?            
            <p className='privateProfile'>Profile is private.</p>
        :
            <>
            {fullPost && 
                <FullPost urls={storedUrls} changeFullPost={changeFullPost}/>
            }
            {firstRetrieve==false && <div className='loadingContainer'><img className='loading' src={loading}></img></div>}
            {firstRetrieve==true && noMorePosts==false && feedData.length==0 && <p style={{color:"gray"}}>No posts found.</p>}        
            {feedData && 
                feedData.map((post,index)=>{
                    return (
                        <>
                            {compact ?
                                <>
                                <div key={index} className="altLayout">
                                    <Gallery key={index} data={post} changeFullPost={changeFullPost}/>
                                </div>
                                </>
                                :
                                <div key={index} className="post">
                                    <Post key={index} data={post} changeFullPost={changeFullPost}/>
                                </div>
                            }
                        </>
                    )
                }) 
            }
            {noMorePosts==false ?
                <button id='loadMoreFeed' 
                    ref={loadMoreRef} 
                >
                    <img src={loadMore}></img>
                    
                </button>
                :
                <h3 className='noMorePosts'>
                    There are no more posts to show right now.
                </h3>
            }
            </>
        }
        </>
    )
}