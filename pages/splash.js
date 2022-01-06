import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'
import ButtonAppBar from '../components/headbar'
import Footer from '../components/footer'

import Ongoingwork from '../components/containers/ongoingwork'




export default function SplashPage(props){


  const [isloaded,setIsLoaded] = React.useState(true);

	return(
		<div>

			        <img  src={"https://upload.wikimedia.org/wikipedia/commons/d/df/Stamp_GB_1959_4%26half_pence_tagged_Wilding.jpg"} />

		</div>
	);



}
