
import React from 'react'
import Welcomecontainer from '../components/containers/welcomecontainer'




export default function WelcomePage(props){
	
  const [isloaded,setIsLoaded] = React.useState(true);

	return(
		<div>


			 <Welcomecontainer />

       
		</div>
	);



}
