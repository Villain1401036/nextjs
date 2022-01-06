import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'
import ButtonAppBar from '../components/headbar'
import Footer from '../components/footer'
import FilterTabbar from '../components/filtertabbar'
import Sidebar from '../components/sidebar'



import { Shopname } from '../constants'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Ongoingwork from '../components/containers/ongoingwork'
import Allordercontainer from '../components/containers/allordercontainer'




export default function Orderpage(props){


  const [isloaded,setIsLoaded] = React.useState(true);

	return(
		<div>

        <ButtonAppBar  itemName={Shopname}/>
			
        <Allordercontainer />
        

       <Footer />
		</div>
	);



}
