import '../styles/globals.css'
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext  } from '../context';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {initializeApp} from "firebase/app";
import "firebase/auth";
import {SSRProvider} from '@react-aria/ssr'; 
import { getlocal, storelocal } from '../localstore';
import { getAuth } from 'firebase/auth';
import { checktokensexpiry } from '../utils';
import { refreshTokenSetup } from '../utils/refreshToken';
import { Modal } from 'react-bootstrap';
import AddPhone from '../components/addphone';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const base64ToUint8Array = base64 => {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(b64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}


const WEB_PUSH_EMAIL="kr7168799@gmail.com"
const WEB_PUSH_PRIVATE_KEY="j7C65BPtXqBAoOthd4UNszoIowP5MMMywhVEcFvK940"
const  WEB_PUSH_PUBLIC_KEY="BO9Irctm_QrWtD7ttNZCGWPrKJBmImQE1CMyYKPmc1yzkLYp8A49C4kykjJAqD4uVt0x2CQErYAdbWTUZpE1KKs"


function MyApp({ Component, pageProps }) {


  const [modelopen, setModelopen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [acctype, setAcctype] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [premium, setPremium] = React.useState(false);
  

  //initialize firebase  
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
  const auth = getAuth()

  const setModel = (data) => {
     setModelopen(data)
  }    
   
    const login = () => {
        setLoggedIn(true);
       
    }

    const logout = () => {
      setLoggedIn(false);
      auth.signOut().then(()=>{
        console.log("successfully signed out");
      })
        localStorage.clear()
        window.clearTimeout(getlocal("refreshtimeout")) 
    }

      const checkType = () => {
        console.log("check");
        if (typeof window != undefined){
        var a =   getlocal("accounttype")
        if (a == 1){
          setAcctype(true)
        }else{
          setAcctype(false)
        }
        
        }
      }
    

    
      /////////
 

      const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscription, setSubscription] = useState(null)
  const [registration, setRegistration] = useState(null)

      const subscribeButtonOnClick = async event => {
        // event.preventDefault()
        const sub = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: base64ToUint8Array(WEB_PUSH_PUBLIC_KEY)
        })
        // TODO: you should call your API to save subscription data on server in order to send web push notification from server
        setSubscription(sub)
        setIsSubscribed(true)
        console.log('web push subscribed!')
        console.log(sub)
        
      }
    
      const unsubscribeButtonOnClick = async event => {
        event.preventDefault()
        await subscription.unsubscribe()
        // TODO: you should call your API to delete or invalidate subscription data on server
        setSubscription(null)
        setIsSubscribed(false)

        console.log('web push unsubscribed!')

        
      }
    
      /////////

    const changeaccount = ()=>{
       
      setAcctype(!acctype)
      console.log(acctype);
      if (typeof window != undefined){
        if (acctype){
          storelocal("accounttype",0)
        }else{
          storelocal("accounttype",1)
        }
      
      }
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

        if (typeof window !== 'undefined' && 'serviceWorker' in navigator ) {
          // run only in browser
          console.log("Asd");
          navigator.serviceWorker.ready.then(reg => {
            console.log("re++++++++++++" ,reg);
            reg.pushManager.getSubscription().then(sub => {
              if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
                // console.log(sub.getKey());
                console.log(sub);
                setSubscription(sub)
                setIsSubscribed(true)

              }
            }).catch(res =>{console.log("reason" , res);})
            setRegistration(reg)
          })
        }



        setLoaded(true)  
         
      }
     


      refreshTokenSetup()
   });

 
  return (

    <SSRProvider>
      <AuthContext.Provider value={{isLoggedIn:loggedIn , firebase:app , premium:premium  , login:login , logout:logout , accounttype: acctype , modelopen:modelopen, setModel:setModel  ,changeaccount:changeaccount, checkType:checkType }} >
      
        <Component {...pageProps} />
        
        <Modal  show={modelopen} style={{zIndex:34534534 , marginBlock:25+"vh"}}>
         
           <AddPhone />
           
        </Modal>
        <Modal  show={true} style={{zIndex:34534534 , marginBlock:25+"vh"}}>
         
         <div className='btn' onClick={()=>{ subscribeButtonOnClick() }}>subscribe Notifications</div>
         
      </Modal>
    </AuthContext.Provider>
    </SSRProvider>

    
  )
}

export default MyApp
