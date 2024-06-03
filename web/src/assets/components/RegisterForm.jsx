// RegisterForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/registerForm.css';

const port = 80

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });
  const [isConnected, setIsConnected] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:${port}/addUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data); // Affichez la réponse du serveur si nécessaire
      // Si l'inscription est réussie, connectez automatiquement l'utilisateur
      if (response.ok) {
        setIsConnected(true);
        setUserId(data.user.id);
        setToken(data.token);
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('userId', data.userId)
      }
      // Réinitialisez le formulaire après l'inscription réussie si nécessaire
      setFormData({
        username: '',
        password: '',
        email: ''
      });
      navigate('/Accueil', {replace:true});
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnection = () => {
    setIsConnected(false);
    setUserId(null);
    setToken(null);
  };

  return (
    <div id='divRegisterForm'>
      {isConnected ? (
        <div>
          <h5>Bienvenue !</h5>
          <button onClick={handleDisconnection}>Déconnexion</button>
        </div>
      ) : (
        <form className="col s12" id="registerForm" onSubmit={handleSubmit}>
          <h5>Créer son compte :</h5>
          <div className="row">
            <div className="input-field col s12">
              <input id="inputFirst_name" type="text" className="validate" name="username" value={formData.username} onChange={handleInputChange} />
              <label htmlFor="first_name">Nom d'utilisateur</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="inputPassword" type="password" className="validate" name="password" value={formData.password} onChange={handleInputChange} />
              <label htmlFor="password">Mot de passe</label>
            </div>
          </div>
          <div className="row divEmail">
            <div className="input-field col s12 inputEmail">
              <input id="inputEmail" type="email" className="validate" name="email" value={formData.email} onChange={handleInputChange} />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <button id='registerButton' type="submit">Inscription</button>
        </form>
      )}
    </div>
  );
};

export default RegisterForm;
