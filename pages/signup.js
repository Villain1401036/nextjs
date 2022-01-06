import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'
import ButtonAppBar from '../components/headbar'
import Footer from '../components/footer'

import Ongoingwork from '../components/containers/ongoingwork'
import Signupcontainer from '../components/containers/signupcontainer'




export default function SignupPage(props){


  const [isloaded,setIsLoaded] = React.useState(true);

	return(
		<div>

  
			 <Signupcontainer />
  
		</div>
	);



}
