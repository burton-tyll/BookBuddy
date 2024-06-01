import '../style/Collection.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FavoriteButton from '../components/FavoriteButton';

function Collection() {
    const address = 'localhost';
    const port = 80;
    const [favs, setFavs] = useState([]);

    const getFavorites = async () => {
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(`http://${address}:${port}/favorite/${userId}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        const favorites = await response.json();
        return favorites;
    };

    const setFavorites = async () => {
        const favorites = await getFavorites();
        const allFavs = await Promise.all(
            favorites.map(async (favorite) => {
                const response = await fetch(`http://${address}:${port}/book/${favorite.bookId}`);
                const fav = await response.json();
                return fav;
            })
        );
        setFavs(allFavs);
    };

    useEffect(() => {
        setFavorites();
    }, []);

    useEffect(() => {
        const elems = document.querySelectorAll('.modal');
        // eslint-disable-next-line no-undef
        M.Modal.init(elems);
    }, [favs]);

    const test = () => {
        console.log(favs);
    };

    return (
        <section className="collection">
            <div className="menu">
                <h2>Mes favoris</h2>
                <div className='links'>
                    <li><Link to="/collection">Mes collections</Link></li>
                    <button onClick={test}>Voir tout</button>
                </div>
            </div>
            <div className="collectionContent">
                {favs.map((book, index) => (
                    <div key={index}>
                    <img className='bookImg modal-trigger' href={`#modal${index}`} src={`http://${address}/uploads/${book.img}`} alt={book.title} />
                    <div id={`modal${index}`} className="modal">
                        <div className="modal-content">
                            <div className='sideInfos'>
                                <img src={`http://${address}/uploads/${book.img}`} alt={book.title} />
                                <div className='inlineInfo'>
                                    <h5>Auteur: </h5><h6>{book.author}</h6>
                                </div>
                                <div className='inlineInfo'>
                                    <h5>Genre: </h5><h6>{book.genre}</h6>
                                </div>
                                <div className='inlineInfo'>
                                    <h5>Catégorie: </h5><h6>{book.category}</h6>
                                </div>
                                <div className='inlineInfo'>
                                    <h5>Nombre de pages: </h5><h6>{book.pages}</h6>
                                </div>
                            </div>
                            <div className='frontInfos'>
                                <div className='titleHead'>
                                    <h1>{book.title}</h1>
                                    <FavoriteButton 
                                        bookId={book._id}
                                    />
                                </div>
                                <p>{book.description}</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <a href="#" className="modal-close waves-effect waves-green btn-flat">Fermer</a>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </section>
    );
}

export default Collection;
