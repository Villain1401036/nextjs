
import React from 'react'
import Logincomponent from '../components/containers/logincomponent';
import Logincontainer from '../components/containers/logincontainer'
import Login from '../components/googlelogin';
import Logout from '../components/googlelogout';
import { CLR_HEAD, CLR_RCARD1, CLR_RCARD2, CLR_RCARD3 } from '../themes';




export default function LoginPage(props){
	
	

  const [isloaded,setIsLoaded] = React.useState(true);

  //if ( typeof window !== "undefined" ){ localStorage.clear() }

	return(
		<div style={{ display:"flex", flex:1 , flexDirection:"column", backgroundColor:CLR_HEAD   } }>
		
<img style={{margin:"25vw auto 12px auto" , width:20+"vw" , height:20+"vw"}} src={"/SMOR-192.png"} />

<div style={{width :100+"vw" , textAlign:"center" } } className="outer">
        <div  className="inner">
         
		<Logincomponent />
         <Login />
		 
			 {/* <Infoput /> */}

        </div>
      </div>
	 
		</div>	
	);



}
