import { useRouter } from "next/router";
import React, { useState , useContext, Component } from "react";
import { geturlFormdata } from "../../constants";
import { AuthContext } from "../../context";
import { getdata, getTokens } from "../../networking/getdata";

export default function Logincomponent(props){
    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const authContext = useContext(AuthContext)
    const router = useRouter();
    
    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
  
    async function getuserdata(idtype,user_id) {
        try {

        
       var k =  await getdata( geturlFormdata("customer","get", {"idtype":idtype , "user_id":user_id } ,{} ),"customers" )
        console.log(k)
        }
        catch (e) {
            console.log(k)
        }
    }

    async function handleSubmit(event) {
      event.preventDefault();
    
      await getTokens("http://localhost:9082/user/login", email , password ).then((value)=>{
      var idtype = null
      if  (email.includes("@")){
            idtype = "email"
      }else{
          idtype = "phone"
      }

      getuserdata(idtype , email).then((value)=>{
        router.push("http://localhost:3000/home")
      })
        
       
      })
    }
  
        return (
            <form onSubmit={handleSubmit}>

                <h3>Log in</h3>

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
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={handleSubmit} disabled={!validateForm()}>Sign in</button>

                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>

                <p className="forgot-password text-right">
                    Not registered <a href="http://localhost:3000/signup">Register here</a>
                </p>
            
            </form>


        );
    
}