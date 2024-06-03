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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleConnexion = async (e) => {
        e.preventDefault();
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
            // Si la connexion est réussie, mettez à jour l'état de connexion
            setIsConnected(true);
            setUserId(data.userId); // Assurez-vous que la réponse contient l'ID utilisateur
            setToken(data.token); // Assurez-vous que la réponse contient le token
            sessionStorage.setItem('token', data.token)
            sessionStorage.setItem('userId', data.userId)
            // Réinitialise le formulaire après la connexion réussie si nécessaire
            setFormData({
                email: '',
                password: ''
            });
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
        <div>
            {isConnected ? (
                <div>
                    <h5>Vous êtes connecté !</h5>
                    <DisconnectionButton userId={userId} token={token} onDisconnect={handleDisconnection} />
                </div>
            ) : (
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
                            <span className="helper-text" data-error="wrong" data-success="right">
                                <a href="#">Mot de passe oublié ?</a>
                            </span>
                        </div>
                    </div>
                    <button id='connexionButton' type="submit">Connexion</button>
                </form>
            )}
        </div>
    );
};

export default ConnexionForm;
