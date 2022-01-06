import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'
import ButtonAppBar from './headbar'
import Footer from './footer'

import Ongoingwork from './containers/ongoingwork'
import { Taskform } from './create'




export  function TaskcreatePage(props){


  const [isloaded,setIsLoaded] = React.useState(true);

	return(<Taskform />
);



}



