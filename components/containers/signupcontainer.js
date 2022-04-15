import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import { TextField } from "@material-ui/core";
import { geturlFormdata, postwitherror, siterooturl } from "../../constants";
import { postdata } from "../../networking/postdata";
import { postsignup } from "../../networking/getdata";


export default function Signupcontainer() {



  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
const router = useRouter();

  function validateForm() {

    return ( email.length > 0 )  && ( phone.length >= 10 || phone.length == 0) && password.length > 0;

  }

  function handleSubmit(event) {
    if (phone.length > 0 &&  phone.length < 10 ){
      //popup 
       
      
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
    
    try {
      postsignup( urlForm.url , urlForm.formdata ).then(()=>{
        router.push("/c/home")
      })
    }
    catch(e){

    }
    


  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit} style={{textAlign:"center"}}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            autoFocus
            type="number"
            value={phone}
            inputMode="numeric"
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="confirm password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Signup
        </Button>
      </Form>

      <div style={ {textAlign:"center", padding:30 }}>
          <div> Already a user </div>
          <button onClick={()=> router.push(`${siterooturl}c/login`)} >Login</button>

      </div>
    </div>
  );
}