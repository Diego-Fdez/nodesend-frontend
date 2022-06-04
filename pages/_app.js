import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import AuthState from '../context/authState';
import ArchivoState from '../context/archivoState';
import React from 'react'; 

function MyApp({ Component, pageProps }) {
  return (
    <AuthState>
      <ArchivoState>
        <Component {...pageProps} />
      </ArchivoState>
    </AuthState>
  )
};

export default MyApp;
