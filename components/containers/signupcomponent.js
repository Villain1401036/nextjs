import { useRouter } from "next/router";
import React, { Component, useState } from "react";
import { geturlFormdata } from "../../constants";
import { postsignup } from "../../networking/getdata";
import Alert from 'react-bootstrap/Alert'

export default function  Signupcomponent(props) {
    
    
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm_password, setConfirmPassword] = React.useState("");
const router = useRouter();

const [show, setShow] = useState(true);


  const  validateForm = () => {

    return ( email.length > 0 )  && ( phone.length >= 10 || phone.length == 0) && password.length > 0;

  }

  
  const handleSubmit = (event) => {
    if (phone.length > 0 &&  phone.length < 10 ){
      //popup 
      console.log("enter phone number correctly");
      
    }
    event.preventDefault();
    var urlForm 
    if (email.length == 0){

      urlForm  = geturlFormdata("user","signup", {} , {"phone":phone , "password":password} )
    } 
    else if(phone.length == 0){
      urlForm  = geturlFormdata("user","signup", {} , {"mail":email , "password":password} )
    }
    else{
      urlForm  = geturlFormdata("user","signup", {} , {"mail":email , "phone":phone , "password":password} )
    }
    
    if (password !== confirm_password){
      console.log("passwords not match");
      setShow(true)
      return
    }
    try {
      postsignup( urlForm.url , urlForm.formdata ).then(()=>{
        
        router.push("/info")
      })
    }
    catch(e){

    }
    


  }

        return (

          <>
          
            <form onSubmit={handleSubmit}>
                <h3>Register</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="abc@xyz.uvw" required value={email}
            onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Phone</label>
                    <input type="number" className="form-control" placeholder="XXXXXXXXXX"  value={phone}
            onChange={(e) => setPhone(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="... type a good password"  value={password}
            onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" placeholder="... confirm your password"  value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block"  disabled={!validateForm()}  >Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="http://localhost:3000/login">log in?</a>
                </p>
                
                
            </form>
            <Alert style={{position:"absolute"}} show={show} variant="danger"dismissible onClose={()=>setShow(false)} >
              <>passwords don't match</>
            </Alert>
            </>
        );
    
}

