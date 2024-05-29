/* eslint-disable no-undef */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './assets/views/Header';
import HomePage from './assets/views/HomePage';
import Collection from './assets/views/Collection';
import ConnexionForm from '../components/ConnexionForm';

function App() {
    useEffect(() => {
        const elems = document.querySelectorAll('.dropdown-trigger');
        const options = {}; // Ajouter les options nécessaires si besoin
        M.Dropdown.init(elems, options);
    }, []);

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path='/collection' element={<Collection />} />
                <Route path='/connexion' element={<ConnexionForm />} />
            </Routes>
        </Router>
    );
}

export default App;
