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
import { geturlFormdata } from '../constants';
import { postdata } from '../networking/postdata';

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
  
  const [notif ,setNotif] = React.useState(false);

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
          applicationServerKey : WEB_PUSH_PUBLIC_KEY

        })
        // TODO: you should call your API to save subscription data on server in order to send web push notification from server
        setSubscription(sub)
        setIsSubscribed(true)
        console.log('web push subscribed!')
        console.log(sub)
        
      }
    
      const unsubscribeButtonOnClick = async event => {
        // event.preventDefault()
        console.log(subscription);
        if (subscription == null ){
          console.log("sub not set");
          return
        }
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

    const requestPermission = async (  ) => {

      console.log('Requesting permission...');
      try {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          
        }
      })
    }
     catch{
      console.log('Notification permission granted.');
     }

    }

    const postregistrationtoken = async (email , regToken) =>{
      var  urlForm = geturlFormdata("notification","subscribe" , {},{"email": email , "registrationToken":regToken})  
     await  postdata(urlForm.url , "",urlForm.formdata ,{} )
     .then((res) =>{
        console.log(res);
      }
     ).catch(err=>{
      console.log(err);
     })
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

        // if (typeof window !== 'undefined' && 'serviceWorker' in navigator ) {
        //   // run only in browser
        //   console.log("Asd");
          

        //   // if(Notification.permission != 'granted'){
        //   //   setNotif(true);
        //   // }

        //   console.log("in reg");
          
        //   navigator.serviceWorker.ready.then(reg => {
        //     console.log("re++++++++++++" ,reg);
        //     reg.pushManager.getSubscription().then(sub => {
        //       // console.log(sub);
        //       if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
               
        //         console.log(sub);
        //         console.log( Buffer.from(sub.getKey('p256dh')).toString("base64") );
        //         // console.log(sub.getKey('name'));
        //         console.log( Buffer.from(sub.getKey('auth')).toString("base64") );
                
        //         setSubscription(sub)
        //         setIsSubscribed(true)

        //       }
        //     }).catch(res =>{console.log("reason" , res);})
        //     setRegistration(reg)
        //   })

        // }
       

        const messaging = getMessaging(app);
        
        getToken(messaging, { vapidKey: WEB_PUSH_PUBLIC_KEY }).then((currentToken) => {
          if (currentToken) {
            console.log(currentToken);
            // Send the token to your server and update the UI if necessary
            // ...
            postregistrationtoken(getlocal("temp_id"), currentToken )


          } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            // ...
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
          // ...
        });

        // onMessage(messaging, (payload) => {
        //   console.log('Message received. ', payload);
        //   // alert("asdasd")
        //   // ...
        //   // window.Notification.show()
        // });
        
        
      

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

{/* 
        <Modal  show={true} style={{zIndex:34534534 , marginBlock:25+"vh"}}>  
         <div className='btn' onClick={()=>{ subscribeButtonOnClick() }}>subscribe Notifications</div>
         <div className='btn' onClick={()=>{ unsubscribeButtonOnClick() }}>unsubscribe Notifications</div>
      </Modal> */}


    </AuthContext.Provider>
    </SSRProvider>

    
  )
}

export default MyApp
