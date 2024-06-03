/* eslint-disable no-undef */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './assets/views/Header';
import HomePage from './assets/views/HomePage';
import Collection from './assets/views/Collection';
import ConnexionForm from './assets/components/ConnexionForm';
import RegisterForm from './assets/components/RegisterForm';
import DisconnectionButton from './assets/components/DisconnectionButton'

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
                <Route path="/" element={<ConnexionForm />} />
                <Route path="/Accueil" element={<HomePage />} />
                <Route path="/inscription" element={<RegisterForm />} />
            </Routes>
        </Router>
    );
}

export default App;
