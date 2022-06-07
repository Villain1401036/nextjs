import { TextField } from "@material-ui/core";
import { fade, makeStyles  } from '@material-ui/core/styles';
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber ,signInWithEmailAndPassword ,isSignInWithEmailLink,sendSignInLinkToEmail ,signInWithEmailLink } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useState , useContext, Component } from "react";
import { geturlFormdata, siterooturl } from "../../constants";
import { AuthContext } from "../../context";
import { getlocal, storelocal, storeobjlocal } from "../../localstore";
import { getdata, getTokens } from "../../networking/getdata";
import { CLR_FBAR, CLR_HEAD, CLR_RCARD1, CLR_RCARD2, CLR_RCARD3 } from "../../themes";
import { getuserdata } from "../../utils";
import { verifyonServer } from "../../utils/signinUtils";
import Login from "../googlelogin";


const useStyles = makeStyles((theme) => ({    

  contentArea:{ 
    
    marginTop:10+"vw",
    
  
    '@media (min-width:845px)': { // eslint-disable-line no-useless-computed-key
    marginTop: 5+"vw"
    },
    '@media (max-width:360px)': { // eslint-disable-line no-useless-computed-key
      marginTop: 15+"vw"
    }
    },
icon:{
  margin:"25vw auto 12px auto" , width:20+"vw" , height:20+"vw",
  '@media (min-width:845px)': { // eslint-disable-line no-useless-computed-key
    width:15+"vw" , height:15+"vw",margin:"2vw auto 12px auto" ,
    },
},
  appbar:{
    
    backgroundColor:"white",

    top: 12+"vw",
    position:'sticky',
    
  
  
  

  },
  container:{
    minHeight:100+"vh"
  },
  innerExtend:{
  margin: "auto",
  background: "#ffffff",
  boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
  padding: "40px 30px 45px 30px",
  borderRadius: "15px",
  transition: "all .3s",
  width: "80vw",
  '@media (min-width:750px)':{
    width: "30vw"
    }
  }
}));


export default function Loginpush(props){
    
    const classes = useStyles();

    const auth = getAuth();

    //for emaillink auth  
    const [email, setEmail] = useState("");
    const [linksent, setLinksent] = useState(false);

    //for email password auth 
    const [password, setPassword] = useState("");

    //for phone auth 
    const [otpsent , setOtpsent] = useState(false)
    const [phone, setPhone] = React.useState("");
    const [vcode , setVcode ] = useState(null);

    //type of login 
    const [type, setType] = useState("login");
    
    
    const authContext = useContext(AuthContext)
    const router = useRouter();
    

    const [isloaded ,setIsloaded] = useState(false);
    const [emailselect ,setEmailselect ] = useState(false);
    
    
    React.useEffect(() => {

      if ( !isloaded){
          setIsloaded(true)
      }
       
      
    });

    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
  
    //for email password authentication 
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
      //   router.push(`/home`)
      // })
        
      })
    }
  
    const onSignInSubmit = () =>{

    }
  
     const onEmailSubmit = () =>{
       setEmailselect(true);
     }



 /////////////////////////////
 //email link auth

 const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  // url: `${siterooturl}login`,

  url: `http://localhost:3000/login`,


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
    storelocal('emailForSignIn', email);
    setLinksent(true);
    
    
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
  let email = getlocal('emailForSignIn');
  console.log(email);
  if (!email) {
    // User opened the link on a different device. To prevent session fixation
    // attacks, ask the user to provide the associated email again. For example:
    
    // email = window.prompt('Please provide your email for confirmation');
  }
  // The client SDK will parse the code from the link for you.
  signInWithEmailLink(auth, email, window.location.href)
    .then((result) => {
      // Clear email from storage.
      console.log("logged in");
      
      //  result.user.providerData
      onSuccess(result)
      // window.localStorage.removeItem('emailForSignIn');
      
      //router.push('/home')
      // You can access the new user via result.user

      // Additional user info profile not available via:
      // result.additionalUserInfo.profile == null
      // You can check if the user is new or existing:
      // result.additionalUserInfo.isNewUser
    })
    .catch((error) => {
      console.log(error);
      onFailure()
      // Some error occurred, you can inspect the code: error.code
      // Common errors could be invalid email and invalid or expired OTPs.
    });
}


const onSuccess = (res) => {
 
    console.log(res);
  verifyonServer(res._tokenResponse.idToken, "email" ,res.user.email , res)

};

const onFailure = () => {
     
  alert(
    `Something went Wrong. Try again `
  );

};
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

     

    return (
      <div style={{ display:"flex", flex:1 , height:100+"vh", flexDirection:"column", justifyContent:"center", alignItems:"center", backgroundColor:CLR_HEAD   } }>
		


      <div style={{width :100+"vw" , textAlign:"center" } } className="outer">
      <img className={classes.icon } src={"/SMOR-192.png"} />
              <div  className={classes.innerExtend} >
               
       
           
             {/* <Infoput /> */}
      
              </div>
            </div>
         
          </div>	


        );
              
}