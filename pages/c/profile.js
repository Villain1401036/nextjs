import Head from 'next/head'
import React , {useContext, useEffect} from 'react'
import ButtonAppBar from '../../components/headbar'

import { onRefresh, Shopname, user } from '../../constants'
import { makeStyles } from '@material-ui/core/styles';
import Profilesummary from '../../components/containers/profilesummary'
import { useRouter } from 'next/router'
import { AuthContext } from '../../context'
import Logincontainer from '../../components/containers/logincontainer'
import { Button } from '@material-ui/core';

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
		flexDirection:'row',
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






export default function ProfilePage(props){

const classes = useStyles();
const [profile , setProfile] = React.useState();
const [isloaded,setIsLoaded] = React.useState(false);


const router = new useRouter();


useEffect (()=>{
	if (!isloaded){
		
	}
	
 }); 

const authContext = useContext(AuthContext);
 

onRefresh(authContext);



	return(

<>
{ authContext.isLoggedIn && 
  (
	<div>
	<Head>
		<title>Spook</title>
		<link rel="icon" href="/favicon.ico" />
	</Head>

	<ButtonAppBar itemName={Shopname}/>
	<div className={classes.cover}></div>
	<Profilesummary />
	
	
     

  
	</div>
)
}
{
  !authContext.isLoggedIn && (<Logincontainer />)
}

</>
	);

}

function BigButton(props){
	return(
<Button style={{width:100+"vw",fontSize:5+"vw" , borderTop:".1vw solid black"   }} onClick={props.onClick} >{props.name}</Button>
	);
} 


