import '../styles/globals.css'
import { Routes, Route, Link } from "react-router-dom";
import React from 'react';
import { AuthContext } from '../context';

function MyApp({ Component, pageProps }) {

  const [loggedIn, setLoggedIn] = React.useState(false);
    const login = () => {
        setLoggedIn(true);
    }
    const logout = () => {
        setLoggedIn(false);
    }

  return (
    <AuthContext.Provider value={{isLoggedIn:loggedIn , login:login , logout:logout }} >
       <Component {...pageProps} />
    </AuthContext.Provider>
  
  )
}

export default MyApp
