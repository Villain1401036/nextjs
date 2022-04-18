import { TextField } from "@material-ui/core";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber ,signInWithEmailAndPassword ,isSignInWithEmailLink,sendSignInLinkToEmail ,signInWithEmailLink } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useState , useContext, Component } from "react";
import { geturlFormdata, siterooturl } from "../../constants";
import { AuthContext } from "../../context";
import { storelocal, storeobjlocal } from "../../localstore";
import { getdata, getTokens } from "../../networking/getdata";
import { CLR_FBAR, CLR_HEAD, CLR_RCARD1, CLR_RCARD2, CLR_RCARD3 } from "../../themes";
import { getuserdata } from "../../utils";
import Login from "../googlelogin";

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
    
    const [isloaded ,setIsloaded] = useState(false);
    const [emailselect ,setEmailselect ] = useState(false);
    
    
    React.useEffect(() => {

      // Update the document title using the browser API
      if ( !isloaded){
         
          setIsloaded(true)
      }
       
      
    });

    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
  



    async function handleSubmit(event) {
      event.preventDefault();
    
      var urlForm = geturlFormdata("user","login")
      console.log(email,password);
      await getTokens(urlForm.url, email , password ).then((value)=>{
      var idtype = null
      if  (email.includes("@")){
            idtype = "email"
      }else{
          idtype = "phone"
      }

    
      // getuserdata(idtype , email).then((value)=>{
      //   router.push(`${siterooturl}c/home`)
      // })
        
      })
    }
  
    const  onSignInSubmit = () =>{

      
    }
  
     const onEmailSubmit = () =>{
       setEmailselect(true);
     }

 /////////////////////////////
 //email link auth

 const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'http://localhost:3000/login',
  // // This must be true.
   handleCodeInApp: true,
  // iOS: {
  //   bundleId: 'com.example.ios'
  // },
  // android: {
  //   packageName: 'com.example.android',
  //   installApp: true,
  //   minimumVersion: '12'
  // },
//  dynamicLinkDomain: 'example.page.link'
};

const signinWithLink = async() =>{
  console.log(auth, email, actionCodeSettings);
  await sendSignInLinkToEmail(auth, email, actionCodeSettings)
  .then(() => {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);
    // ...
  })
  .catch((error) => {
    console.log(error);
    console.log("error sending link");
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });

}


if (isloaded && isSignInWithEmailLink(auth, window.location.href)) {
  // Additional state parameters can also be passed via URL.
  // This can be used to continue the user's intended action before triggering
  // the sign-in operation.
  // Get the email if available. This should be available if the user completes
  // the flow on the same device where they started it.
  let email = window.localStorage.getItem('emailForSignIn');
  if (!email) {
    // User opened the link on a different device. To prevent session fixation
    // attacks, ask the user to provide the associated email again. For example:
    
    email = window.prompt('Please provide your email for confirmation');
  }
  // The client SDK will parse the code from the link for you.
  signInWithEmailLink(auth, email, window.location.href)
    .then((result) => {
      // Clear email from storage.
      console.log("logged in");
      window.localStorage.removeItem('emailForSignIn');

      router.push('/c/home')
      // You can access the new user via result.user
      // Additional user info profile not available via:
      // result.additionalUserInfo.profile == null
      // You can check if the user is new or existing:
      // result.additionalUserInfo.isNewUser
    })
    .catch((error) => {
      console.log(error);
      // Some error occurred, you can inspect the code: error.code
      // Common errors could be invalid email and invalid or expired OTPs.
    });
}


  const confirmCode = (code) =>{
     
    confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
       
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
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


    if (emailselect){
     return(<>
      
       
     <text >{email}</text><text  style={{marginLeft:5+"vw", textDecoration:"underline"}} onClick={()=>{setEmailselect(false)}}>change</text>
      <input  type="password" className="form-control" style={{width:100+"%",marginTop:10+"px"}} placeholder="password" value={password}
            onChange={(e) => setPassword(e.target.value)}/>
       {
 type == "signup" && <><input  type="password" className="form-control" style={{width:100+"%",marginTop:10+"px"}} placeholder="confirm password" value={password}
 onChange={(e) => setPassword(e.target.value)}/>
            <div style={{display:"flex",flexDirection:"column"}}>
         <button className="btn" style={{ margin:2+"vw" ,borderRadius: 1+"vw", backgroundColor:CLR_HEAD,color:"white" ,borderWidth:1+"vw" }}  onClick={handleSubmit} >Sign Up</button>
          <div onClick={()=>{setType("login") }} style={{marginTop:10+"vw",fontWeight:"bold", textDecoration:"underline"}} >already a user</div>
          </div>
          </>   } 
         
               { type == "login" && <div style={{display:"flex",flexDirection:"column"}}>  <button className="btn" style={{ margin:2+"vw" ,borderRadius: 1+"vw", backgroundColor:CLR_HEAD,color:"white" ,borderWidth:1+"vw" }}  onClick={handleSubmit} >Sign In</button>
               <a onClick={()=>{setType("signup") }} style={{marginTop:10+"vw",fontWeight:"bold", textDecoration:"underline"}}>new user</a>
               </div>  } 

              
      
      
     
     </>);
    }
    else{

    
    return (
            <div >

             
                <h3>Log in</h3>
                <div className="form-group" >
                   
                    <input type="email" className="form-control" style={{width:100+"%"}} autoFocus placeholder="Enter email" value={email}
            onChange={(e) => setEmail(e.target.value)}/>

                  {/* <input  type="password" className="form-control" style={{width:100+"%",marginTop:10+"px"}} placeholder="Enter password" value={password}
            onChange={(e) => setPassword(e.target.value)}/> */}
                </div>



                 <button className="btn" style={{ margin:2+"vw" ,borderRadius: 1+"vw", backgroundColor:CLR_HEAD,color:"white" ,borderWidth:1+"vw" }}  onClick={signinWithLink} >Continue</button>
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

               
               {/* { otpsent && <><TextField  type='number' onChange={(e) => { setVcode(e.target.value)}} />
               <button className="btn" onClick={()=>{confirmCode(vcode)}}>confirm otp</button></>    }
            
               {!otpsent && <><input type="number" className="form-control" placeholder="Enter phone" value={phone}
            onChange={(e) => setPhone(e.target.value)}/>
                <button className="btn" onClick={signInWithPhone}>Get OTP</button><div id='sign-in-button' >
                </div></>}



                <p >
                  --- or ---
                </p> */}
                <p >
                   Sign in with
                </p>

                <Login />
            </div>


        );
              }
}