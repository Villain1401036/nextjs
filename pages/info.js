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
import Ongoingwork from '../components/containers/ongoingwork';
import Histwork from '../components/containers/histwork'
import Notifications from '../components/containers/notifications'



const useStyles = makeStyles((theme) => ({
	root: {
		  margin:"auto",
	  display: 'grid',
		  gridTemplateColumns:"auto auto auto",
  
	  '& > *': {
		margin: theme.spacing(1),
	  },
	  },
	  contentArea:{
		 
		  height:100+"100%"
	  },
		  cover: {
			  marginTop: 0,
			  height:70,
			  margin:'auto',
	},
	  appsidebar:{
		  position:"sticky",
		  top:100,
		  right:0,
		  height:600+"px",
		  width:250+"px",
		  backgroundColor:'pink',
  
  
	  },
  }));
  

export default function HomePage(props){


  const [isloaded,setIsLoaded] = React.useState(true);
  const classes = useStyles();
	
	return(
		<div >

        
			<div className={classes.contentArea}>
              <ButtonAppBar  itemName={Shopname}/>
			 

			  <Notifications />
			  <Histwork />
			  <Ongoingwork />
			  
			</div>
			
        

       
		</div>
	);



}
