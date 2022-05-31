import Head from 'next/head'
import React, { useContext, useEffect } from 'react'
import  { NameHead } from '../components/headbar'


import { EditText } from '../pages/settings';

import { onRefresh, Shopname } from '../constants'
import { makeStyles } from '@material-ui/core/styles';
import Addresses from '../components/containers/addresses'
import { AuthContext } from '../context'
import Logincontainer from '../components/containers/logincontainer'
import MapPage from './mappage';



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
		justifyContent:"center",
		flexDirection:"column",
		alignItems:"center",
	
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



import router from 'next/router'
import { Button, ButtonBase } from '@material-ui/core';
import { CLR_HEAD } from '../themes';
import { FaDumpster, FaMapMarkedAlt, FaMapMarkerAlt, FaReact, FaRecycle, FaSave, FaTrash } from 'react-icons/fa';

export default function Addresspage(props){


const classes = useStyles();
const authContext = useContext(AuthContext);
  const [isloaded,setIsLoaded] = React.useState(true);
   
  const [currentloc ,setCurrentloc] = React.useState(null)
  const [editing , setEditing ] = React.useState(false);
 const [editaddress, setEditaddress] = React.useState(null);
  useEffect(()=>{
	  onRefresh(authContext);
  })

  


	 
	



	return(
    <>
		{ authContext.isLoggedIn && 
			(
		<div >
		<Head>
			<title>Spook</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		
        <NameHead label="Addresses" onClick={()=>router.back()} onHomeClick={()=>{router.push('/home')}}  />
		
		
		 
			 
				{/***here we will have a the addresses for the  */}
				
				<div style={{flex:1,display:"flex",flexDirection:"column",flexGrow:1}} ></div>
                   
			{ !editing && <div style={{flex:1,display:"flex",flexDirection:"row-reverse" , bottom:0 ,minHeight:10+"vw",width:"100%",backgroundColor:"white",position:"sticky",top:13+"vw",zIndex:1500}}> 
			   <Button style={{margin:2+"vw",backgroundColor:CLR_HEAD ,color:"white" }} onClick={()=>{setEditing(true); setEditaddress({})}} >Add new Address</Button>
			 </div> }

			 {!editing ? <Addresses onEditClick={(Editdata)=> {setEditaddress(Editdata); setEditing(true)}} /> :

<div style={{display:"flex",flex:1,justifyContent:"center" , alignItems:"center",flexDirection:"column",width:"100%" }}>

<div style={{flex:1,display:"flex",flexDirection:"row" , bottom:0 ,minHeight:10+"vw",width:"100%",backgroundColor:"white",zIndex:1500,justifyContent:"center"}}> 
<Button style={{margin:2+"vw" }} onClick={()=>{setEditing(false); setEditaddress({})}} ><FaTrash color={CLR_HEAD} style={{marginRight:"2vw"}} size={20}  /> Discard</Button>
			
 </div>
 <EditText label="Address line1" value={editaddress.addressLine1} placeholder={"enter address here.."} />
 <EditText label="Address line2" value={editaddress.addressLine2} placeholder={"enter address here.."}/>


 <EditText label="city" value={editaddress.city} placeholder={"enter city here.."}/>
 <EditText label="state" value={editaddress.state} placeholder={"enter state here.."}/>
 <EditText label="Country" value={editaddress.country} placeholder={"enter Country here.."}/>
 <EditText label="Pin Code" value={editaddress.pincode} placeholder={"enter pincode here.."}/>
 <EditText label="Phone" value={editaddress.state} disabled placeholder={"enter Phone here.."}/>

 <div style={{fontSize:8+"vw"}} onClick={()=> navigator.geolocation.getCurrentPosition((d)=>{console.log(d); setCurrentloc(d.coords)},(e)=>{console.log(e); } ,{frequency:5000,  enableHighAccuracy: true  ,timeout:10000,} )  }  >Set L<FaMapMarkerAlt />cation</div>
 
 {currentloc != null &&  <MapPage currentloc={currentloc} />}
 <Button style={{margin:2+"vw" , borderRadius:2+"vw" , backgroundColor:CLR_HEAD , color:"white"}} onClick={()=>{setEditing(false); setEditaddress({})}} > SAVE Address<FaSave color={"white"} size={20} style={{marginLeft:"2vw"}} /></Button>
  
  
  </div>


			}


			 <div style={{flex:1,display:"flex",flexDirection:"column",flexGrow:1}} ></div>

       
		
		
		</div>
		
		)
		}
	

</>
	);



}
