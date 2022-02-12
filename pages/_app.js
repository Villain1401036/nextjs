import '../styles/globals.css'
import { Routes, Route, Link } from "react-router-dom";
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {

  const authContext = useContext(AuthContext);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [acctype, setAcctype] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
    const login = () => {
        setLoggedIn(true);
    }
    const logout = () => {
        setLoggedIn(false);
    }

    
    const changeaccount = ()=>{
      console.log("changeacc");
      setAcctype(!acctype)
    }
    useEffect (()=>{
      if (!loaded){
        console.log("servicework");
        if ("serviceWorker" in navigator) {
          window.addEventListener("load", function () {
            navigator.serviceWorker.register("/sw.js").then(
              function (registration) {
                console.log(
                  "Service Worker registration successful with scope: ",
                  registration.scope
                );
              },
              function (err) {
                console.log("Service Worker registration failed: ", err);
              }
            );
          });
        }
        setLoaded(true)
        console.log("sw");
      }
   });

  return (
    <AuthContext.Provider value={{isLoggedIn:loggedIn , login:login , logout:logout , accounttype: acctype ,changeaccount:changeaccount }} >
       <Component {...pageProps} />
    </AuthContext.Provider>
  
  )
}

export default MyApp
