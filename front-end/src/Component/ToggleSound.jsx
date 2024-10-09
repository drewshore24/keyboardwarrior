import "../css/ToggleSound.css";
import disableSound from '../images/sound-off.svg';
import enableSound from '../images/sound-on.svg';

function ToggleSound({soundOn, setSoundOn}){

    function handleToggle(){
        if(soundOn){
            setSoundOn(false)
        }
        if(!soundOn){
            setSoundOn(true)
        }
    }

    function toggleDisplay(){
        if(soundOn){
            return(
        <button className='togglebutton'onClick={handleToggle}><img src={disableSound}/></button>
            )
        }
        if (!soundOn){
            return(
        <button className='togglebutton' onClick={handleToggle}><img src={enableSound}/></button>
            )
        }
    }
    return (
        <div>
        {toggleDisplay()}
        </div>
    )
}

export default ToggleSound




