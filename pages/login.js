import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'
import ButtonAppBar from '../components/headbar'
import Footer from '../components/footer'

import Ongoingwork from '../components/containers/ongoingwork'
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
