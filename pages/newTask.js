import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react'
import ButtonAppBar from '../components/headbar'
import Footer from '../components/footer'
import FilterTabbar from '../components/filtertabbar'
import Sidebar from '../components/sidebar'
import { Card ,Box} from '@material-ui/core'

import { Shopname } from '../constants'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Taskcard from '../components/taskcard'
import { Description } from '@material-ui/icons'


import { getdata } from '../networking/getdata'
import { Serviceform, Taskform } from '../components/create'
import Bid from '../components/containers/bidcontainer'
import TaskIndicator from '../components/taskindicator'
import { useRouter } from 'next/router'
import TaskcreatePage from '../components/task'

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

export default function NewTask(props){

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

		<ButtonAppBar itemName={Shopname}/>

			 <div className={classes.contentArea}>
			 <div className={classes.root} >
				 <Taskform />
			 </div>

			 </div>

       <Footer />
		</div>
	);



}
