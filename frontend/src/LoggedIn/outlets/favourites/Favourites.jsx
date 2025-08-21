import RenderTab from "../home/feed/RenderTab"
import retrieveFavourites from "./retrieveFavourites"
export default function Favourites(){
    return (
        <>
        <div className='feedButtons'>
            <button className='selected' id='feedButton'>
                <p>Favourites</p>
            </button>
        </div>
        <RenderTab tabToRender={retrieveFavourites} compact={false}/>
        </>
    )
}