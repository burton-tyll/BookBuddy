import { useState, useEffect } from 'react';
import '../style/Book.css';
import FavoriteButton from './FavoriteButton';

function Book() {
    const address = 'localhost';
    const port = 80;

    const [books, setBooks] = useState([]);

    const allBooks = async () => {
        try {
            const response = await fetch(`http://${address}:${port}/books`);
            const getBooks = await response.json();
            setBooks(getBooks);
        } catch (error) {
            console.error('Erreur lors de la récupération des livres depuis la base de données.');
        }
    };

    useEffect(() => {
        allBooks();
    }, []);

    useEffect(() => {
        const elems = document.querySelectorAll('.modal');
        // eslint-disable-next-line no-undef
        M.Modal.init(elems);
    }, [books]);

    return (
        <section className="bookSection">
            <h1>Livres populaires</h1>
            <div className='booksGrid'>
                {books.map((book, index) => (
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

export default Book;
