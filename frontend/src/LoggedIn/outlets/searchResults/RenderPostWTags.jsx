import retrievePostWTags from "./retrievePostWTags";
import RenderTab from "../home/feed/RenderTab"
import { useParams } from 'react-router-dom';
export default function RenderPostWTags(){
    const { text, tags } = useParams();
    return (
        <>  
            <RenderTab  tabToRender={retrievePostWTags} text={text}  tags={tags}/>
        </>
    )
}