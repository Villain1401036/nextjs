import Head from 'next/head'
import React, { useContext, useState } from 'react'
import ButtonAppBar from '../../components/headbar'
import Footer from '../../components/footer'

import { useRouter } from 'next/router'

import { onRefresh, Shopname } from '../../constants'
import { makeStyles } from '@material-ui/core/styles';


import { AccountContext, AuthContext } from '../../context'
import LoginPage from '../login'
import Latestitem from '../../components/containers/latestitem'





const useStyles = makeStyles((theme) => ({    
  root: {
		margin:"auto",
    display: 'grid',
		gridTemplateColumns:"auto auto auto",

    '& > *': {
      margin: theme.spacing(1),
    },
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
    contentArea:{ 
        
        marginTop:10+"vw",
        
    
        '@media (min-width:845px)': { // eslint-disable-line no-useless-computed-key
          marginTop: 5+"vw"
        },
        '@media (max-width:360px)': { // eslint-disable-line no-useless-computed-key
            marginTop: 15+"vw"
        }
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


export default function ItemswindowPage(props){

	//////

 

const classes = useStyles();


const authContext = useContext(AuthContext);
 
React.useEffect(()=>{
	if(!isloaded){
		console.log("isloaded called");
		

	}
	onRefresh(authContext);
	
})  

if(typeof window === 'undefined'){
	//put("C:/Users/kr716/OneDrive/Pictures/RAHUL.jpeg")
}

  const [isloaded,setIsLoaded] = React.useState(true);
  //const [isloaded,setIsLoaded] = React.useState(true);
   
  
  

  
  const [key,setKey] = useState();
  
	return(
   <>
		{ authContext.isLoggedIn && (

            <Latestitem />

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