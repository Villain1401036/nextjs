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
import { CLR_HEAD, CLR_RCARD1, CLR_RCARD2 } from '../../themes'
import { FaSearch, FaTruckLoading } from 'react-icons/fa'
import SimpleBottomNavigation from '../../components/bottomnav'





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
	},

	searchbut:{
		width:100+"vw",height:14+"vw",backgroundColor:CLR_HEAD,display:"flex",justifyContent:"center",alignItems:"center",

		'@media (min-width:600px)': { // eslint-disable-line no-useless-computed-key
		
          height:0,
		

		},
		'@media (max-width:360px)': { // eslint-disable-line no-useless-computed-key
			
		   
			//height:10+"vw",
	
		}
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
		authContext.checkType()
	  setIsLoaded(true);
	}
	onRefresh(authContext);
	
})  

  const [key,setKey] = useState();
  
  

  console.log(authContext);




if (isloaded){
//   if (authContext.isLoggedIn){
	return(

     <>
			
			<Head>
				<title>Spook</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<ButtonAppBar itemName={Shopname}/>
		     
			
			

			 <div style={{minHeight:(window.innerHeight - window.innerWidth*.13),backgroundColor:"red" ,display:"flex" , flexDirection:"column" ,flex:1}}>
             <div style={{  bottom:0}}>
			 <div className={classes.searchbut}>
			 
			 
			  <div style={{width:85+"vw",height:75+"%",backgroundColor:"white",borderRadius:"5vw", display:"flex" ,  alignItems:"center" }}  onClick={()=>router.push("/c/searchpage")}>
			 <FaSearch color={CLR_HEAD} overlineThickness={1}  style={{height:70+"%",width:15+"%"}} />
				 </div> 
			 </div>
				 <BannerComponent />
				 
			</div>
			 <div style={{ display:"flex" , flexDirection:"column-reverse" ,flex:1}}>
				<div style={{  bottom:0}}><Footer /></div>
				</div>
				</div>
			
			</>

	);
//   }
//   else{
// 	  return <><div onClick={()=> router.push("/login")}>Login</div></> 
//   }
}else{
	return (

	<div style={{display:"flex", flex:1,height: ( typeof window !== "undefined" ? window.screen.availHeight:100+"vh" ) , flexDirection:"column", justifyContent:"center" ,alignItems:"center",backgroundColor:CLR_HEAD  }}>
		 <img src="/images/SMOR-512.png" style={{height:"30vw",weight:"30vw"}}></img>

		 
		 <div className="spinner-container">
      <div className="loading-spinner">
      </div>
    </div>

		</div>)
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