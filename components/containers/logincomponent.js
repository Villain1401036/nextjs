import { TextField } from "@material-ui/core";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber  } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useState , useContext, Component } from "react";
import { geturlFormdata, siterooturl } from "../../constants";
import { AuthContext } from "../../context";
import { storelocal, storeobjlocal } from "../../localstore";
import { getdata, getTokens } from "../../networking/getdata";
import { CLR_FBAR, CLR_HEAD, CLR_RCARD1, CLR_RCARD2, CLR_RCARD3 } from "../../themes";
import { getuserdata } from "../../utils";

export default function Logincomponent(props){
    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otpsent , setOtpsent] = useState(false)
    const [phone, setPhone] = React.useState("");

    const [type, setType] = useState("login");
    
    const [vcode , setVcode ] = useState(null);
    const auth = getAuth();
    const authContext = useContext(AuthContext)
    const router = useRouter();
    
    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
  


    async function handleSubmit(event) {
      event.preventDefault();
    
      var urlForm = geturlFormdata("user","login")
      await getTokens(urlForm.url, email , password ).then((value)=>{
      var idtype = null
      if  (email.includes("@")){
            idtype = "email"
      }else{
          idtype = "phone"
      }

    
      getuserdata(idtype , email).then((value)=>{
        router.push(`${siterooturl}home`)
      })
        
       
      })
    }
  
    const  onSignInSubmit = () =>{


    }
  

 
  
  const confirmCode = (code) =>{
    console.log("code");
    confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(result);
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }
  
    const signInWithPhone = async () =>{
        console.log("otp req");
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
              console.log("otpsent");
              setOtpsent(true);
              // ...
            }).catch((error) => {
              // Error; SMS not sent
              // ...
            });
        
          }

    return (
            <div >

             
                <h3>Log in</h3>
                <div className="form-group">
                   
                    <input type="email" className="form-control" placeholder="Enter email" value={email}
            onChange={(e) => setEmail(e.target.value)}/>
                </div>



                 <button className="btn" style={{ margin:2+"vw" ,borderRadius: 1+"vw", backgroundColor:CLR_HEAD,color:"white" ,borderWidth:1+"vw" }}  onClick={handleSubmit} >Continue</button>
               <>
                {/*
                
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" value={email}
            onChange={(e) => setEmail(e.target.value)}/>
                </div>

                 <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={password}
            onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div> */}
                 
                {/* <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={handleSubmit} disabled={!validateForm()}>Sign in</button> */}

                {/* <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>


                <p className="forgot-password text-right">
                    Not registered <a href="http://localhost:3000/signup">Register here</a>
                </p> */}</>

                
<p >
                  --- or ---
                </p>

               
               { otpsent && <><TextField  type='number' onChange={(e) => {console.log(e.target.value);setVcode(e.target.value)}} />
               <button className="btn" onClick={()=>{confirmCode(vcode)}}>confirm otp</button></>    }
            
               {!otpsent && <><input type="number" className="form-control" placeholder="Enter phone" value={phone}
            onChange={(e) => setPhone(e.target.value)}/>
                <button className="btn" onClick={signInWithPhone}>Get OTP</button><div id='sign-in-button' >
                </div></>}



                <p >
                  --- or ---
                </p>
                <p >
                   Sign in with
                </p>
            </div>


        );
    
}