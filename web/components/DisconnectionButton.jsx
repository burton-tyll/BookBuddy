import React from 'react';

const DisconnectionButton = ({ userId, token, onDisconnect }) => {
  const handleDisconnection = async () => {
    try {
      const response = await fetch(`http://localhost:3000/disconnection/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data); // Affiche la réponse du serveur si nécessaire
      // Si la déconnexion est réussie, appelez la fonction de rappel
      onDisconnect();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <button id='disconnectionButton' onClick={handleDisconnection}>Déconnexion</button>
  );
};

export default DisconnectionButton;

