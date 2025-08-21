import {useState} from 'react'
import SearchBar from '../../searchbar/SearchBar';
import { Outlet,useParams,useNavigate } from 'react-router-dom';
import thumbsUpCat from "/thumbsUpCat.png"
export default function Search({withTags,searchingProfile}){
    const { text,tags,name } = useParams();
        
    const [tagsState, setTagsState] = useState(tags!=null ? tags : null);

    let tempString
    let splitTags
    if(tagsState){
        tempString=tagsState.trim()
        splitTags=tempString.split("&")
    }
    const navigate=useNavigate()
    
    return (<>   
        <SearchBar />
        <div className='feedButtons'>
            <div style={{flex:3}}>
                <h4>Search</h4>
            </div>
            <div style={{justifyContent:"space-evenly",display:"flex"}}>
                {!window.location.pathname.includes("Tags") &&
                <>
                    <button
                    className={`tabButton ${window.location.pathname.includes("Post") && "selected"}`}
                    id='feedButton' 
                    onClick={() => {
                        if (tagsState) {
                            navigate(`/Search/Post/${text}/${tagsState}`);
                        } else {
                            navigate(`/Search/Post/${text}`);
                        }
                    }}
                    >
                    Post
                    </button>

                    <button
                    className={`tabButton ${window.location.pathname.includes("Profile") && "selected"}`}
                    id='exploreButton' 
                    onClick={() => {
                        navigate(`/Search/Profile/${text}`);
                    }}
                    >
                    Profile
                    </button>
                </>
                }


            </div>
        </div>
        <div>
            {(!window.location.pathname.includes("Profile") &&!window.location.pathname.includes("Post") &&!window.location.pathname.includes("Tags")) 
            ?
            <>
                <div className='nothingFound'><img src={thumbsUpCat}></img><h3>Try looking something up!</h3></div>            
            </>
            :
                <p>Results of: {text || name} </p>
            }
            {window.location.pathname.includes("Post") && splitTags &&
                <>    
                <div style={{display:"flex",alignItems:"center"}}>
                    <p>With tags: </p>      
                    <div className='searchedPostTag tagContainer '>
                        {splitTags.map((content,i)=>{
                            return <button className='postTag' onClick={()=>{navigate('/Search/' + content)}} key={i}>{content}</button>
                        })}
                    </div>      
                </div>
                </>
            }
        </div>
        <Outlet />
    </>)
}