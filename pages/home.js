import Head from 'next/head'
import React, { useContext } from 'react'
import ButtonAppBar from '../components/headbar'
import Footer from '../components/footer'
import FilterTabbar from '../components/filtertabbar'

import { useRouter } from 'next/router'

import { onRefresh, Shopname, user } from '../constants'
import { makeStyles } from '@material-ui/core/styles';

import Latestwork from '../components/containers/lastestwork'
import Ongoingwork from '../components/containers/ongoingwork'

import { AuthContext } from '../context'
import LoginPage from './login'
import Latestitem from '../components/containers/latestitem'





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

	//////

console.log(props.msg);

const classes = useStyles();
const router = useRouter();

const authContext = useContext(AuthContext);

console.log(typeof window);

// if (typeof window !== "undefined") {

	
// 	localStorage.setItem("isLoggedIn",false)

// 	console.log(localStorage.getItem("isLoggedIn"));

// 	}

//<button onClick={()=>{ localStorage.removeItem("refresh_token");localStorage.removeItem("access_token");  authContext.logout() }}>logout</button>

if(typeof window === 'undefined'){
	//put("C:/Users/kr716/OneDrive/Pictures/RAHUL.jpeg")
}

  const [isloaded,setIsLoaded] = React.useState(true);
  //const [isloaded,setIsLoaded] = React.useState(true);
  console.log("refresh");


  onRefresh(authContext)
  
  
	return(
   <>
		{ authContext.isLoggedIn && (

  

			<div style={{minHeight:100+"vh" ,display:"flex", flex:1 , flexDirection:"column"}}>
			<Head>
				<title>Spook</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ButtonAppBar itemName={Shopname}/>
				<FilterTabbar />
				 
    <div style={{overflowY:"hidden" , display:'flex' ,flex:1, flexDirection:'row'   }}>
       

				 <div style={{width:100+"vw", overflowY:"hidden"}} >
				 
				<Latestwork />
				<Ongoingwork />
				<Latestitem />
				 
				 </div >
				 </div>
                 
				 <Footer />
				 
				
			</div>
		)

		}
		{ !authContext.isLoggedIn && (
 
				 <>
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

// HomePage.getInitialProps = () => {
// 	//...
// 	  // Fetch data from external API
// 	  const fs = require('fs')
// 	  // Pass data to the page via props

// 	console.log("=======================)==========================");
// 	  put()
// 	  return { props}
//   }

  export function getStaticProps() {
	
	return { props: { msg: 'hello world' } }

  }