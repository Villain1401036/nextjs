import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React , {useEffect} from 'react'
import ButtonAppBar from '../components/headbar'
import Footer from '../components/footer'
import FilterTabbar from '../components/filtertabbar'
import Sidebar from '../components/sidebar'

import { getdata } from '../networking/getdata'

import { Shopname, user } from '../constants'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import { Dashboard, Image } from '@material-ui/icons'
import Profilesummary from '../components/containers/profilesummary'
import Allordercontainer from '../components/containers/allordercontainer'
import Workdashboard from '../components/containers/workdashboard'
import { Router, useRouter } from 'next/router'

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






export default function HomePage(props){

const classes = useStyles();
const [profile , setProfile] = React.useState();
const [isloaded,setIsLoaded] = React.useState(false);


const router = new useRouter();

var url = "http://localhost:9082/customer/get?user_id=63"  //address links
 
useEffect (()=>{
	if (!isloaded){
	 getprofile();
	}
 }); 


 
 const getprofile = () =>{

   getdata(url,"customers").then((value) =>{
   
    console.log(value);
	
	setProfile(value[0]);
	setIsLoaded(true);
	console.log(profile);

	 
   }).catch((err) =>{
	 console.log(err);
   })

 }

	return(
		<div>
		<Head>
			<title>Spook</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<ButtonAppBar itemName={Shopname}/>
		
		{isloaded?<Profilesummary  profilepic={"https://upload.wikimedia.org/wikipedia/commons/d/df/Stamp_GB_1959_4%26half_pence_tagged_Wilding.jpg"} name={user.name} email={profile.email} contact ={profile.phoneNumber} description={profile.description} />:<div></div>}
		
		<Allordercontainer />

		<Workdashboard />

      
		</div>
	);

}


