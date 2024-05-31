import '../style/Collection.css';
import { Link } from 'react-router-dom';

function Collection(){

    const address = 'localhost'
    const port = 80

    const getFavorites = async () => {
        const token = sessionStorage.getItem('token');
        const favorites = await fetch(`http://${address}:${port}/`)
    }


    return(
        <section className="collection">
            <div className="menu">
                <h2>Mes favoris</h2>
                <div className='links'>
                    <li><Link to="/mes-collections">Mes collections</Link></li>
                    <a>Voir tout</a>
                </div>
            </div>
            <div className="collectionContent">
                <div className='livreTest'></div>
                <div className='livreTest'></div>
                <div className='livreTest'></div>
                <div className='livreTest'></div>
                <div className='livreTest'></div>
                <div className='livreTest'></div>
                <div className='livreTest'></div>
                <div className='livreTest'></div>
            </div>
        </section>
    )
}

export default Collection