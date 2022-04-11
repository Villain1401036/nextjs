import Head from 'next/head'
import React from 'react'
import ButtonAppBar from '../components/headbar'
import Footer from '../components/footer'

import { Shopname } from '../constants'
import { makeStyles } from '@material-ui/core/styles';
import { Taskform } from '../components/create'


const useStyles = makeStyles((theme) => ({
  root: {
		margin:"auto",
		textAlign:"center",
    
		gridTemplateColumns:"auto auto auto",

    '& > *': {
      margin: theme.spacing(1),
    },
	},
	contentArea:{
		
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
//const router = useRouter();
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
