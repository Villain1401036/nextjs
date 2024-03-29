import Head from 'next/head'
import React, { useContext, useEffect } from 'react'
import ButtonAppBar from '../components/headbar'
import Footer from '../components/footer'
import FilterTabbar from '../components/filtertabbar'
import { useRouter } from 'next/router'


import { Shopname } from '../constants'
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../context'
import LoginPage from './login'
import Bookingcontainer from '../components/containers/bookingreq'
// import { Itemform } from '../components/create'
import SimpleBottomNavigation from '../components/bottomnav'
import { Box, Paper } from '@material-ui/core'





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
		flexDirection:'column',
		height:100+'%',
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

const classes = useStyles();
const router = useRouter();

const authContext = useContext(AuthContext);

 

// if (typeof window !== "undefined") {

	
// 	localStorage.setItem("isLoggedIn",false)

// 	 

// 	}



if ( typeof window !== "undefined" ){ if ( localStorage.getItem("isLoggedIn") == "false") {   ;authContext.login() }}

  const [isloaded,setIsLoaded] = React.useState(false);
  //const [isloaded,setIsLoaded] = React.useState(true);
   

  if ( typeof window !== "undefined" ){ 
	  console.log(localStorage.getItem("refresh_token"))
	}

	if ( typeof window !== "undefined" ){ 
		if (localStorage.getItem("refresh_token") != undefined){
				authContext.login()
		}
	  }

	  useEffect(() => {

		if(!isloaded){
          setIsLoaded(true);
		  
		}
		 else{
			
		 }
    
 
		
		//Our draw come here
	  
	  })

    
  
	return(
   <>
		{ authContext.isLoggedIn && (
			<>
			<Head>
				<title>Spook</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="At SMOR you will find the best list of rented items to rent doesnot matter where you are..Choose from a wide variety and see yourself"/>
        <meta property="og:title" content="SMOR"/>
        <meta property="og:description" content="Complete description of the content showed in this sample page for Open Graph."/>
        <meta property="og:url" content="https://smorentel.com/"/>
        <meta property="og:type" content="website"></meta>
				<link rel="icon" href="/favicon.ico" />
				
			</Head>
			<ButtonAppBar itemName={Shopname}/>
				<FilterTabbar />
				 
				
				 <div  >
				 
				<Bookingcontainer />
				{/* <Bookingorders />
				<Itemform />
				  */}
				   <Footer />
				 </div >
				 
				
				 <SimpleBottomNavigation />
			   
				
				
			</>
		)

		}
		{ !authContext.isLoggedIn && (
 
				 <><Head>
				 <title>Spook</title>
				 <meta name="viewport" content="initial-scale=1.0, width=device-width" />
		 <meta name="description" content="At SMOR you will find the best list of rented items to rent doesnot matter where you are..Choose from a wide variety and see yourself"/>
		 <meta property="og:title" content="SMOR"/>
		 <meta property="og:description" content="Complete description of the content showed in this sample page for Open Graph."/>
		 <meta property="og:url" content="https://smorentel.com/"/>
		 <meta property="og:type" content="website"></meta>
				 <link rel="icon" href="/favicon.ico" />
				 
			 </Head>
				 <h1>You are not Signed in</h1>
				 <div style={{textAlign:"center"}}>
				   <LoginPage />
				 </div>
				 </>
		
		)

		}
		</>
	);
 
	

}
