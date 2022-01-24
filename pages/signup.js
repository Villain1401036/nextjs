
import React from 'react'
import Infoput from '../components/containers/infoput';
import Signupcontainer from '../components/containers/signupcontainer'




export default function SignupPage(props){


  const [isloaded,setIsLoaded] = React.useState(true);

	return(
		<div>

  
			 <Signupcontainer />
			 <Infoput />
			 
		</div>
	);



}
