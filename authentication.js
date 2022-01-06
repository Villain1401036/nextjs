import react, { useContext } from "react"
import { AuthContext } from "./context";


export default function Authentication(){
   const authContext = useContext(AuthContext);
   const loginHandler = () => {
       authContext.login();
   };
   const logoutHandler = () => {
       authContext.logout();
   };
return (
       <>
          {!authContext.isLoggedIn && <button className="login" onClick={loginHandler}>Login</button>}
          {authContext.isLoggedIn && <button className="login" onClick={logoutHandler}>Logout</button>}
       </>
   )
}