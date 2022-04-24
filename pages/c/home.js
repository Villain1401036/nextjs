import Head from 'next/head'
import React, { useContext, useEffect, useState } from 'react'
import ButtonAppBar from '../../components/headbar'
import Footer from '../../components/footer'

import  {useRouter}  from 'next/router'

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

const classes = useStyles();
const router = useRouter();

const authContext = useContext(AuthContext);

 
  const [isloaded,setIsLoaded] = React.useState(false);
   

console.log(authContext.isLoggedIn);

useEffect(()=>{
	if(!isloaded){
		console.log("isloaded called");
		
	  setIsLoaded(true);
	}
	onRefresh(authContext);
	
})  

  const [key,setKey] = useState();
  



if (isloaded){
  if (authContext.isLoggedIn){
	return(

     <>
			
			<Head>
				<title>Spook</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ButtonAppBar itemName={Shopname}/>
		
			{/* <FilterTabbar /> */}
			<BannerComponent />
		

				<Footer />
                 
			</>

	);
  }
  else{
	  return <><div onClick={()=> router.push("/login")}>Login</div></> 
  }
}else{
	return <>isnotload</>
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

  export function getStaticProps() {
	
	return { props: { msg: 'hello world' } }

  }


  function Sections(props){

	  const children = props.sections.map((item) => <div style={{display:"flex",flexDirection:"row" , flex:1 }} onClick={()=>{

	  }}>{item}</div>)

	  return (
		  <>
			<div id="sec-container" style={{display:"flex",flexDirection:"row" , flex:1 }} >{children}</div>
			
		  </>
	  );
  }