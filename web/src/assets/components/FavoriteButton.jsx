import {useState} from 'react'
import '../style/FavoriteButton.css'
import 'animate.css'

function FavoriteButton(){
    const [favorite, setFavorite] = useState(false)

    const handleClick = () =>{
        setFavorite(!favorite)
    }

    return(
        <img className={favorite ? 'animate__animated animate__heartBeat favoriteButton' : 'favoriteButton'} onClick={handleClick} src={favorite ? '/img/full_heart.png' : 'img/empty_heart.png'}/>
    )
}

export default FavoriteButton