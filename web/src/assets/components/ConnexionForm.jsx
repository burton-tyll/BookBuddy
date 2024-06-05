import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/connexionForm.css';
import DisconnectionButton from './DisconnectionButton';
import Books from './Books';
import NewBookForm from './NewBookForm';

const port = 80;

const ConnexionForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isConnected, setIsConnected] = useState(false);
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();  // Initialiser useNavigate

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleConnexion = async (e) => {
        e.preventDefault();
        console.log('Sending data:', formData); // Ajoutez ceci pour vérifier les données

        try {
            const response = await fetch(`http://localhost:${port}/connexion`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data); // Affiche la réponse du serveur si nécessaire
            setIsConnected(true);
            setUserId(data.userId);
            setToken(data.token);
            sessionStorage.setItem('token', data.token)
            sessionStorage.setItem('userId', data.userId)
            setFormData({
                email: '',
                password: ''
            });
            navigate('/Accueil', { replace: true });  // Rediriger l'utilisateur vers la page d'accueil
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
        }
    };

    const handleDisconnection = () => {
        setIsConnected(false);
        setUserId(null);
        setToken(null);
    };

    return (
        <div id="divConnexionForm">
            <form id='connexionForm' onSubmit={handleConnexion}>
                <h5>Bienvenue !</h5>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="email" type="email" className="validate" name="email" value={formData.email} onChange={handleInputChange} />
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row divPassword">
                    <div className="input-field col s12 inputPassword">
                        <input id="password" type="password" className="validate" name="password" value={formData.password} onChange={handleInputChange} />
                        <label htmlFor="password">Mot de passe</label>
                    </div>
                </div>
                <p>Vous n'avez pas de compte ? Inscrivez-vous <a href="/inscription">ici</a>.</p>
                <button id='connexionButton' type="submit">Connexion</button>
            </form>
        </div>
    );
};

export default ConnexionForm;
