
import React from 'react'
import Infoput from '../components/containers/infoput';
import Signupcomponent from '../components/containers/signupcomponent';
import Signupcontainer from '../components/containers/signupcontainer'




export default function SignupPage(props){


  const [isloaded,setIsLoaded] = React.useState(true);

	return(
		<div>
<div style={{width :100+"vw" , textAlign:"center"} } className="outer">
        <div style={{marginTop:20+"vh"}} className="inner">
      
  
		  <Signupcomponent />
			 {/* <Infoput /> */}
		
        </div>
      </div>
			
		</div>
	);



}
