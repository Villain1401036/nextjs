
import React, { useContext, useState } from 'react'
import ButtonAppBar from '../components/headbar'



import { Shopname } from '../constants'
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../context'
import Userinfo from '../components/containers/userinfo';
import { Button } from 'react-bootstrap';



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
		 
		  height:100+"100%"
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
  

export default function InfoPage(props){

  const authContext = useContext(AuthContext);
  const [isloaded,setIsLoaded] = React.useState(true);
  const classes = useStyles();


  const onselect = (data) => {
	 
  }
	
	return(

<>

	
		<div >

        
			<div className={classes.contentArea}>
			
              <ButtonAppBar  itemName={Shopname}/>
			
			<Userinfo />
			
			  {/* <Confirm /> */}
			</div>
			
        
			  {/* <ChooseAccType onselect={(e)=>onselect(e)} />
        */}
		</div>




</>
	);


}

function ChooseAccType(props){

	const [hide , setHide] = useState("visible");

	return(
		<>
		<div style={{textAlign:"center",  marginTop:20+"vh" , display:hide}} >

			<Button style={{margin:5+"vh"}}  onClick={()=>{props.onselect("work");setHide("none")}} >I am here for work</Button>

			<Button style={{margin:5+"vh"}}  onClick={()=>{props.onselect("user");setHide("none")}}>I am here for using the services</Button>

			<Button style={{margin:5+"vh"}} onClick={()=>{props.onselect("userwork");setHide("none")}}>I am here for both</Button>
			
			</div>

		</>
	);
}
