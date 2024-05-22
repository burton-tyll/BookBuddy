import React from 'react';
import '../style/registerForm.css';

const RegisterForm = () => {
  return(
    <form id='connexionForm'>
      <input id='firstNameInputField'></input>
      <input id='lastNameInputField'></input>
      <button id='connexionButton'>se connecter</button>
    </form>
  )
};

export default RegisterForm;