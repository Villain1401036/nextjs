import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { CLR_FBAR, CLR_HEAD, CLR_RCARD2,  CLR_RCARD3 } from '../themes';
import { Facebook, Instagram, Twitter, YouTube } from '@material-ui/icons';
//import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  foot: {
    
	flexDirection:"column-reverse",
	display:"flex",
	//position:'sticky',
	width:100+"%",
	// bottom:0,
	// zIndex:10
  },
  sweep: {
	flex:1,
  flexGrow: 1,
  flexDirection:"column-reverse",
  display:"flex",
  //position:'sticky',
  bottom:0,
  zIndex:10
},
	 infoblocks: {
		 width:30+"vw",
	    flexGrow: 1,
			display:'flex',
			flexDirection:'column',
			
			backgroundColor:CLR_HEAD,
	  },

	link:{
   fontSize:120+"%", 
	 color:"lightgrey" ,

	},
	appbar:{
		paddingLeft:5+"vw",
		paddingTop:10+"vw",
		  maxWidth:100+"vw",
			display:'flex',
			flexDirection:'row',
		backgroundColor:CLR_HEAD,
	},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  content:{color:CLR_RCARD2 , fontSize:70+"%" , width:40+"vw" },
  contentHead:{color:CLR_RCARD2 , fontSize:110+"%" , width:25+"vw" },
  contentSubHead:{color:CLR_RCARD3 , fontSize:95+"%" , width:25+"vw" }
}));

export default function Footer(props) {
  const classes = useStyles();

  return (
    <div className={classes.foot}>
		<div style={{height:20+"vw",backgroundColor:CLR_HEAD}}></div>
		
		<Followblocks />
		<div className={classes.appbar}>
      		
			
			
			
			
			<Aboutblocks />
			<Locationblocks />
			<HSblocks />
		</div>
		<div className={classes.sweep}></div>
		<div style={{height:40+"vw",backgroundImage:'url("freebessimagelight.png")',backgroundSize:"100vw"}}>
		<div style={{height:40+"vw",backgroundColor:CLR_HEAD,borderTopLeftRadius:50+"vw",borderTopRightRadius:50+"vw",display:"flex",justifyContent:"center"}}>
			<img src='/images/SMOR-192.png' style={{ height:80+"%" ,objectFit:"cover",position:"relative",top:-50}} onClick={()=> {router.push('/home')}}></img>
		</div>
		</div>
		<div style={{height:40+"vw",backgroundColor:"white",backgroundImage:'url("freebessimagelight.png")',backgroundSize:"100vw"}}></div>
    </div>
  );
}


function Link(props) {
  const classes = useStyles();

	return (
		<a href={props.url} className={classes.link}>
       {props.name}
    </a>

	);

}


function Locationblocks(props) {
  const classes = useStyles();

	return (
		<div className={classes.infoblocks}>
        <div className={classes.contentHead}>Locations</div>
		<div  className={classes.contentSubHead} >Pune</div>
		<div  className={classes.contentSubHead} >Banglore</div>
		<div  className={classes.contentSubHead} >Delhi</div>
		<div  className={classes.contentSubHead} >Mumbai</div>
    </div>

	);

}

function HSblocks(props) {
	const classes = useStyles();
  
	  return (
		  <div className={classes.infoblocks}>
		  <div className={classes.contentHead}>Help and Support</div>
		  <div  className={classes.contentSubHead} >Blogs</div>
			 <div  className={classes.contentSubHead} >Security</div>
			 <div   className={classes.contentSubHead} >Terms and Conditions</div>
			 <div    className={classes.contentSubHead} >Privacy Policy</div>
	  </div>
  
	  );
  
  }

function Aboutblocks(props) {
  const classes = useStyles();

	return (
		<div className={classes.infoblocks} style={{width:50+"vw"}}>
       <div className={classes.contentHead}>About Us</div>
	   <div className={classes.contentSubHead}>Who we are</div>
	   <div className={classes.content}>We are one of the best who saves your money by making you choose to rent with top class services and best money value </div>
       
	   <div className={classes.contentSubHead}>Contact us at:</div>
	   <div className={classes.content}>Mobile: +91 8405905399 , +91 9934548144</div>
	   <div className={classes.content}>email: info@smorentel.com, customercare@smorentel.com</div>
       
    </div>

	);

}

function Followblocks(props) {
  const classes = useStyles();

	return (
		

		

       

	   <div style={{ display:"flex",  flex:1 , flexDirection:"row" , paddingLeft:5+"vw",paddingTop:2+"vw", backgroundColor:CLR_HEAD }}>
		   
	   <div className={classes.contentHead} tyle={{ display:"flex", flex:1 , flexDirection:"row" ,  justifyContent:"center" , alignItems:"center"}} >Follow Us On:</div>
	   <span><Facebook fontSize='large' htmlColor={CLR_RCARD2} style={{margin:1+"vw"}} />
       <Instagram fontSize='large' htmlColor={CLR_RCARD2} style={{margin:1+"vw"}}/>
       <Twitter fontSize='large' htmlColor={CLR_RCARD2} style={{margin:1+"vw"}}/>
		<YouTube fontSize='large' htmlColor={CLR_RCARD2} style={{margin:1+"vw"}}/>
		</span>
	   
		</div>
   

	);

}
