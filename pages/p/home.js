import Head from 'next/head'
import React, { useContext, useEffect, useState } from 'react'
import ButtonAppBar from '../../components/headbar'
import Footer from '../../components/footer'

import { useRouter } from 'next/router'

import { onRefresh, Shopname, user } from '../../constants'
import { makeStyles } from '@material-ui/core/styles';


import { AuthContext } from '../../context'
import LoginPage from '../login'
import BannerComponent from '../../components/containers/banner'





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
	appbar:{
		
		backgroundColor:"white",

		top: 12+"vw",
		position:'sticky',
		
	
	
	

	},
	container:{
		minHeight:100+"vh"
	}
}));


export default function HomePage(props){

	//////

 


const classes = useStyles();
const router = useRouter();

const authContext = useContext(AuthContext);

 useEffect(()=>{
	onRefresh(authContext);
 })

// if (typeof window !== "undefined") {

	
// 	localStorage.setItem("isLoggedIn",false)

// 	 

// 	}

//<button onClick={()=>{ localStorage.removeItem("refresh_token");localStorage.removeItem("access_token");  authContext.logout() }}>logout</button>

if(typeof window === 'undefined'){
	//put("C:/Users/kr716/OneDrive/Pictures/RAHUL.jpeg")
}

  const [isloaded,setIsLoaded] = React.useState(true);
  //const [isloaded,setIsLoaded] = React.useState(true);
   


  const [key,setKey] = useState();
  
   if (authContext.isLoggedIn ){

	return(

     <>
			<Head>
				<title>Spook</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ButtonAppBar itemName={Shopname}/>
             { !authContext.premium && <Upgradetopremium /> }
				<Footer />
                 
			</>
				 
				 
			
		)
		}

	else{
      return(
		  <>
		  <div style={{display:"flex",flex:1,justifyContent:"center" , alignItems:"center" ,height:100+"vh" }}>
		  <div >Please <span style={{color:"blue"}} onClick={()=>{router.push('/login')}}>sign in</span> to continue</div>
		 
		  </div>
		  </>
	  );
	}
}

// HomePage.getInitialProps = () => {
// 	//...
// 	  // Fetch data from external API
// 	  const fs = require('fs')
// 	  // Pass data to the page via props

// 	 
// 	  put()
// 	  return { props}
//   }

  function Upgradetopremium(props){

	return (
		<>
		<div style={{height:12+"vw" , backgroundColor:"orange" , display:"flex",flex:1,justifyContent:"center",alignItems:"center",flexDirection:"column"}} onClick={()=>{console.log("asduaskhdl");}}>
			<div style={{fontSize:5+"vw"}} >UPGRADE TO PREMIUM</div>
			<div style={{fontSize:4+"vw"}}>Know More</div>
		</div>
		</>
	);


  }
  
   
