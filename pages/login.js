
import React from 'react'
import Logincontainer from '../components/containers/logincontainer'




export default function LoginPage(props){
	
	

  const [isloaded,setIsLoaded] = React.useState(true);

  //if ( typeof window !== "undefined" ){ localStorage.clear() }

	return(
		<div>

       
              
			
			 <Logincontainer />

       
		</div>
	);



}
