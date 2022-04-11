import '../styles/globals.css'
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {initializeApp} from "firebase/app";
import "firebase/auth";

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
       
      setAcctype(!acctype)
    }
    useEffect (()=>{
      const app = initializeApp(firebaseConfig);
      if (!loaded){
        
         
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
                 
              }
            );
          });
        }
        setLoaded(true)
         
      }
   });

   const firebaseConfig = {
    apiKey: "AIzaSyARcLufTeUZbGue0-k9iZJVxmKlp0l0HQU",
    authDomain: "freebees-24743.firebaseapp.com",
    projectId: "freebees-24743",
    storageBucket: "freebees-24743.appspot.com",
    messagingSenderId: "1084271040061",
    appId: "1:1084271040061:web:91df1dc11b58f5a4807c54",
    measurementId: "G-6Z61GFCN05"
  };

  const app = initializeApp(firebaseConfig);
 
  return (
  
      <AuthContext.Provider value={{isLoggedIn:loggedIn , firebase:app , login:login , logout:logout , accounttype: acctype ,changeaccount:changeaccount }} >
       <Component {...pageProps} />
    </AuthContext.Provider>


  
  )
}

export default MyApp
