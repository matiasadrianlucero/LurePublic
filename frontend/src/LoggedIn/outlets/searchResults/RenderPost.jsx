import retrievePost from "./retrievePost"
import RenderTab from "../home/feed/RenderTab"
import { useParams } from 'react-router-dom';
export default function RenderPost(){
    const { text } = useParams();
    return (
        <>
            <RenderTab tabToRender={retrievePost} text={text} />
        </>
    )
}