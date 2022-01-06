import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getTokens } from "../../networking/getdata";
import { AuthContext } from "../../context";
import { useRouter } from "next/router";


export default function Logincontainer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const authContext = useContext(AuthContext)
  const router = useRouter();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await getTokens("http://localhost:9082/user/login", email , password ).then((value)=>{
      authContext.login()
      router.push("http://localhost:3000/home")
    })
  }

  
  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>

      <div style={ {textAlign:"center", padding:30 }}>
          <div> Not a user </div>
          <button onClick={()=> router.push("http://localhost:3000/signup")} >Sign up</button>

      </div>
    </div>


  );
}