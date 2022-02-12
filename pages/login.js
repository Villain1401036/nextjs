
import React from 'react'
import Logincomponent from '../components/containers/logincomponent';
import Logincontainer from '../components/containers/logincontainer'




export default function LoginPage(props){
	
	

  const [isloaded,setIsLoaded] = React.useState(true);

  //if ( typeof window !== "undefined" ){ localStorage.clear() }

	return(
		<div>

<div style={{width :100+"vw" , textAlign:"center"} } className="outer">
        <div style={{marginTop:20+"vh"}} className="inner">

		<Logincomponent />

			 {/* <Infoput /> */}

        </div>
      </div>

		</div>	
	);



}
