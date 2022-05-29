
import { makeStyles } from '@material-ui/core';
import React from 'react'
import Logincomponent from '../components/containers/logincomponent';
import Login from '../components/googlelogin';
import { CLR_HEAD, CLR_RCARD1, CLR_RCARD2, CLR_RCARD3 } from '../themes';

const useStyles = makeStyles((theme) => ({    

	  contentArea:{ 
		  
		  marginTop:10+"vw",
		  
	  
		  '@media (min-width:845px)': { // eslint-disable-line no-useless-computed-key
			marginTop: 5+"vw"
		  },
		  '@media (max-width:360px)': { // eslint-disable-line no-useless-computed-key
			  marginTop: 15+"vw"
		  }
		  },
	icon:{
		margin:"25vw auto 12px auto" , width:20+"vw" , height:20+"vw",
		'@media (min-width:845px)': { // eslint-disable-line no-useless-computed-key
			width:15+"vw" , height:15+"vw",margin:"2vw auto 12px auto" ,
		  },
	},
	  appbar:{
		  
		  backgroundColor:"white",
  
		  top: 12+"vw",
		  position:'sticky',
		  
	  
	  
	  
  
	  },
	  container:{
		  minHeight:100+"vh"
	  },
	  innerExtend:{
		margin: "auto",
		background: "#ffffff",
		boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
		padding: "40px 30px 45px 30px",
		borderRadius: "15px",
		transition: "all .3s",
		width: "80vw",
		'@media (min-width:750px)':{
			width: "30vw"
		  }
	  }
  }));
  


export default function LoginPage(props){
	
	const classes = useStyles();

  const [isloaded,setIsLoaded] = React.useState(true);

  //if ( typeof window !== "undefined" ){ localStorage.clear() }

	return(
		<div style={{ display:"flex", flex:1 , height:100+"vh", flexDirection:"column", justifyContent:"center", alignItems:"center", backgroundColor:CLR_HEAD   } }>
		


<div style={{width :100+"vw" , textAlign:"center" } } className="outer">
<img className={classes.icon } src={"/SMOR-192.png"} />
        <div  className={classes.innerExtend} >
         
		<Logincomponent />
         
		 
			 {/* <Infoput /> */}

        </div>
      </div>
	 
		</div>	
	);



}
