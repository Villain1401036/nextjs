import Head from 'next/head'
import React , {useContext, useEffect} from 'react'
import ButtonAppBar, { NameHead } from '../../components/headbar'

import { onRefresh, Shopname, user } from '../../constants'
import { makeStyles } from '@material-ui/core/styles';
import Profilesummary from '../../components/containers/profilesummary'
import { router, useRouter } from 'next/router'
import { AuthContext } from '../../context'
import Logincontainer from '../../components/containers/logincontainer'
import { Button } from '@material-ui/core';
import { Headerbar } from '../../components/containers/latestitem';
import { ItemsbyOwner } from '../../components/itemcontainer';

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
			height:0,
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

const [user_key , setUserkey] = React.useState(null);



const router = useRouter();
const authContext = useContext(AuthContext);


useEffect(()=>{
	if(!isloaded){
		console.log("isloaded called");
	   
	  setIsLoaded(true);
	}
	onRefresh(authContext);
	
	setUserkey(router.query['user_lender']); 
})



if  ( isloaded ){


   console.log(router.query,user_key);
	return(

	<div>
	<Head>
		<title>Spook</title>
		<link rel="icon" href="/favicon.ico" />
	</Head>

	<Headerbar />
	
	<Profilesummary />


	{user_key != null && <ItemsbyOwner percustomer itemownerkey={user_key}/>}

	</div>

	)
}
else{
   return <></>
}





}

function BigButton(props){
	return(
<Button style={{width:100+"vw",fontSize:5+"vw" , borderTop:".1vw solid black"   }} onClick={props.onClick} >{props.name}</Button>
	);
} 


