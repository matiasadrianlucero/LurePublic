
import RenderPostImg from "../../retrieveImages/RenderPostImg"
import cross from '/cross.svg'
import { useEffect,useState,useCallback } from 'react'

import useEmblaCarousel from 'embla-carousel-react'
 import arrowRight from '/createPost/Chevron_Right.svg'
  import arrowLeft from '/createPost/Chevron_Left.svg'
export default function FullPost({changeFullPost,urls}){    
    let [imgs,setImgs]=useState(urls)

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

    return (
    <div style={{justifyContent:"center",display:"flex",position: "absolute",alignSelf: "center"}}>
        
        <div className="bigPost" style={{position:"fixed"}}>
            <div>
                <img className="closeBigPost" src={cross} onClick={()=>{changeFullPost("")}}></img>
                <div style={{position:"relative"}}>
                        
                    <div className="embla" style={{overflow:"visible"}}>
                        <div className="embla__viewport" ref={emblaRef}>
                            <div className="embla__container">
                                {imgs && imgs.map((file,i)=>{
                                    return (
                                    <div className="embla__slide fullPostImg"  style={{alignItems:"center",display:"flex",justifyContent:"center"}} key={i}>
                                        <RenderPostImg url={file} />                                            
                                    </div>
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                    
                    {imgs.length>1 &&               
                        <div className="postNextContainer nextContainerPost">
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

                        </div>
                    }
                </div>
            </div>
        </div>
    </div>)
}