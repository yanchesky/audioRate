import React from 'react';
import { signInWithGoogle } from '../firebase'
import GoogleButton from 'react-google-button'

const Introduction = () => {
  return (
    <div>
      <p>
        Cześć! To jest apka to oceniania plików dzwiękowych. Zaloguj się za pomocą konta google i przejdź do głosowania.
        Po zagłosowaniu będziesz miał dostęp to wyników
      </p>
      <GoogleButton style={{margin: '20px auto'}} label="Zaloguj z Google" type='light' onClick={signInWithGoogle} />
    </div>
  );
};

export default Introduction;