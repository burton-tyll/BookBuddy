import { useState, useEffect } from 'react';
import '../style/FavoriteButton.css';
import 'animate.css';

const address = 'localhost'
const port = 80

// eslint-disable-next-line react/prop-types
function FavoriteButton({ bookId }) {

    const [favorite, setFavorite] = useState(false);


    /*------------Récupération des favoris déjà existants*/
    const checkFavorite = async () => {
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(`http://${address}:${port}/favorite/${userId}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }); 
        const favorites = await response.json();
        /*-------Comparaison avec le livre ouvert*/
        favorites.map(favorite => {
            if (favorite.bookId == bookId){
                setFavorite(true)
            }
        })
    }

    /*Analyse des favoris existants au chargement de la page */
    useEffect(()=>{
        checkFavorite()
    }, [])

    /*Fonction d'ajout de favoris */
    const addFavorite = (bookId) => {
        console.log(bookId)
        fetch(`http://${address}:${port}/addFavorite/${bookId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`, // Authentification si nécessaire
                'Content-Type': 'application/json' // Type de contenu JSON
            }
        }) 
    }

    const deleteFavorite = (bookId) => {
        fetch(`http://${address}:${port}/deleteFavorite/${bookId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`, // Authentification si nécessaire
                'Content-Type': 'application/json' // Type de contenu JSON
            }
        })
    }

    const handleClick = async () => {
        setFavorite(!favorite);
        if (!favorite){
            addFavorite(bookId)
        }else{
            deleteFavorite(bookId)
        }
    };

    return (
        <img 
            className={favorite ? 'animate__animated animate__heartBeat favoriteButton' : 'favoriteButton'} 
            onClick={handleClick} 
            src={favorite ? '/img/full_heart.png' : '/img/empty_heart.png'} 
            alt="Favorite Button"
        />
    );
}

export default FavoriteButton;
