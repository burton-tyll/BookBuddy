import '../style/Collection.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FavoriteButton from '../components/FavoriteButton';
import Status from '../components/Status';

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

    return (
        <section className="collection">
            <div className="menu">
                <h2>Mes favoris</h2>
                <div className='links'>
                    <li><Link to="/collection">Mes collections</Link></li>
                </div>
            </div>
            <div className="collectionContent">
                {favs.map((book, index) => (
                    <div key={index}>
                    <img className='bookImg modal-trigger' href={`#modal${index}`} src={`http://${address}/uploads/${book.img}`} alt={book.title} />
                    <div id={`modal${index}`} className="modal">
                        <div className="modalFavContent">
                            <div className='headermodal'>
                                <FavoriteButton 
                                    bookId={book._id}
                                />
                                <Status 
                                    bookId={book._id}
                                />
                            </div>
                            <div className='bodymodal'>
                                <div className='bodyimg'>
                                    <img src={`http://${address}:${port}/uploads/${book.img}`} alt={book.title} />
                                </div>
                                <div className='bodysynopsis'>
                                    <h1>Synopsis</h1>
                                    <p>{book.description}</p>
                                </div>
                            </div>
                            <div className='footermodal'>
                                <div className='author'>
                                    <img src='/img/auteur.png' alt='auteur' />
                                    <h4>{book.author}</h4>
                                </div>
                                <div className='category'>
                                    <img src='/img/categorie.png' alt='catégorie' />
                                    <h4>{book.category}</h4>
                                </div>
                                <div className='genre'>
                                    <img src='/img/genre.png' alt='genre' />
                                    <h4>{book.genre}</h4>
                                </div>
                                <div className='pages'>
                                    <img src='/img/pages.png' alt='pages' />
                                    <div className='inputpages'><input id='pagesInput' type="text" placeholder='ma page' /><h4>/{book.pages}</h4></div>
                                </div>
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
