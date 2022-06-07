import React, { useContext, useState } from 'react';

import { GoogleLogin } from 'react-google-login';

import { GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';
import { AuthContext } from '../context';
import { Button, TextField } from '@material-ui/core';
import { FcGoogle } from 'react-icons/fc';
import { geturlFormdata } from '../constants';
import { getdata, getTokenswithIdToken } from '../networking/getdata';
import axios from 'axios';
import { setup_after_LoginSuccess } from '../utils';
import { getlocal, storelocal } from '../localstore';
import { verifyonServer } from '../utils/signinUtils';


const clientId = '105523503358433294711';


function Login() {

  const authContext = React.useContext(AuthContext);

  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  
  const onSuccess = (res) => {
 
    console.log(res);
    
    verifyonServer(res._tokenResponse.idToken, "email" ,res.user.email, res)

  };


  const onFailure = () => {
     
    alert(
      `Something went Wrong. Try again `
    );

  };




  const signInWithGoogle = async () =>{

    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      // const user = result.user;
       
      onSuccess(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
       
      onFailure()
      // ...
    });

  }

  return (
  <>
    <div onClick={signInWithGoogle}>
      <FcGoogle  size={30}  />oogle
    </div>
  </>
  );
}

export default Login;