import retrieveTags from "./retrieveTags";
import RenderTab from "../home/feed/RenderTab"
import { useParams } from 'react-router-dom';
export default function RenderTags(){
    const { tags } = useParams();
    return (
        <>
            <RenderTab tabToRender={retrieveTags} username={tags} />
        </>
    )
}