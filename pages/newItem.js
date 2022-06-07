import Head from 'next/head'
import React, { useState } from 'react'
import ButtonAppBar, { NameHead } from '../components/headbar'

import { Shopname } from '../constants'
import { makeStyles } from '@material-ui/core/styles';


import { Itemform } from '../components/create'
import { useRouter } from 'next/router'

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
		display:'flex',
		flexDirection:'row',
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


var tasksdata = []

export default function NewItem(props){

const classes = useStyles();
const router = useRouter();
  const [isloaded,setIsLoaded] = React.useState(true);
  React.useEffect(() => {
    // Update the document title using the browser API

  });
   
 	

	
  
	return(
		<div>
		<Head>
			<title>Spook</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<NameHead label="Post Item" onClick={()=> router.back() } onHomeClick={()=>{router.push('/home')}} /> 

			 <div className={classes.contentArea}>
			 <div className={classes.root} >
				 <Itemform />
				 
			 </div>

			 </div>

       
		</div>
	);



}

// NewService.getServerSideProps = () => {
// 	// Fetch data from external API
// 	const fs = require('fs')
	
// 	const crypto = require('crypto')
// 	 
// 	// Pass data to the page via props
	
//   }