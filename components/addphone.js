//task card for a new task that has been posted

import { Phone } from '@material-ui/icons';
import { ButtonBase } from '@mui/material';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import React, { useState } from 'react'
import { FaEdit, FaGoogle, FaMap, FaMapSigns, FaPen, FaRegEdit } from 'react-icons/fa';
import { convertToJson } from '../constants';
import { CLR_HEAD } from '../themes';
import { signInWithPhone } from './containers/logincomponent';


export default function AddPhone(props){

    //for phone auth 

    
    const auth = getAuth();
    
    const [otpsent , setOtpsent] = useState(false)
    const [phone, setPhone] = React.useState("");
    const [vcode , setVcode ] = useState(null);


    
  const confirmCode = (code) =>{
     
    confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(user);

      //do stuff like updating it to the user account
       
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
      console.log(error);
    });
  }
  
  
  
  const signInWithPhone = async () =>{
         
            window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
              'size': 'invisible',
              'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                onSignInSubmit();
              }
            }, auth);
          const phoneNumber = "+91" + phone
          const appVerifier = window.recaptchaVerifier;
        
          signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;
               
              setOtpsent(true);
              // ...
            }).catch((error) => {
              // Error; SMS not sent
              // ...
            });
        
          }
  const [isloaded,setIsLoaded] = React.useState(true);

  console.log(phone);
  


	return(
		<div>
            <div  onClick={() =>{console.log("selected");}} style={{ width:100+"%" , height:50+"vh" ,display:"flex",flexDirection:"column" , alignItems:"center" ,textAlign:"center" }} >
                 <h1>ADD PHONE</h1>
                 <h3>So that we can secure your Account</h3>

                { !otpsent  && <> <input   type='number'   className="form-control"  style={{  width:80+"%",margin:10+"px" ,textAlign:"center" }} placeholder="Enter Phone" value={phone}
            onChange={(e) => { (e.target.value.length > 10 ? setPhone(phone) : setPhone(e.target.value))}} /> 
             <button className="btn" style={{ margin:2+"vw" ,borderRadius: 1+"vw", backgroundColor:CLR_HEAD,color:"white" ,borderWidth:1+"vw" }}  onClick={() => {signInWithPhone();}} >submit</button>
             </> }

            {otpsent && <><input   type='number' className="form-control"  style={{width:80+"%",margin:10+"px" ,textAlign:"center" }} placeholder="Enter otp" value={vcode}
            onChange={(e) => { (e.target.value.length > 6 ? setVcode(vcode) : setVcode(e.target.value))}} />  

           
<button className="btn" style={{ margin:2+"vw" ,borderRadius: 1+"vw", backgroundColor:CLR_HEAD,color:"white" ,borderWidth:1+"vw" }}  onClick={() => confirmCode(vcode)} >verify</button>   </>  }  
               
            </div>

            <div id='sign-in-button'></div>

		</div>
	);



}

