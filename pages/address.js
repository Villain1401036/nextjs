import Head from 'next/head'
import React, { useContext, useEffect } from 'react'
import  { NameHead } from '../components/headbar'


import { EditText } from '../pages/settings';

import { convertToJson, geturlFormdata, onRefresh, Shopname } from '../constants'
import { makeStyles } from '@material-ui/core/styles';
import Addresses from '../components/containers/addresses'
import { AuthContext } from '../context'

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



import router, { useRouter } from 'next/router'
import { Button, ButtonBase } from '@material-ui/core';
import { CLR_HEAD } from '../themes';
import { FaDumpster, FaMapMarkedAlt, FaMapMarkerAlt, FaReact, FaRecycle, FaSave, FaTrash } from 'react-icons/fa';
import { postdata } from '../networking/postdata';
import { getobjlocal } from '../localstore';
import Loginpush from '../components/containers/loginpush';
import LoginPage from './login';

function Addresspage(props){

const router = useRouter();

const classes = useStyles();
const authContext = useContext(AuthContext);
  const [isloaded,setIsLoaded] = React.useState(true);
   
  const [currentloc ,setCurrentloc] = React.useState(null)

  const [editing , setEditing ] = React.useState(false);
 const [editaddress, setEditaddress] = React.useState(null);

 const [location , setLocation] = React.useState(null);
 var loc = null;
  useEffect(()=>{
	  onRefresh(authContext);
	  
	  if (currentloc == null && editing){
		  
		 if (!("addressLine1" in editaddress)){
	        navigator.geolocation.getCurrentPosition((d)=>{console.log(d); setCurrentloc([d.coords.latitude , d.coords.longitude]);setLocation([d.coords.lat , d.coords.lng])},(e)=>{console.log(e); } ,{maximumAge:1000, timeout:5000, enableHighAccuracy: true} ) 
				    
		 }else{
			setCurrentloc([convertToJson(editaddress.metadata)["lat"] ,convertToJson(editaddress.metadata)["lon"]])
		 }
	//   navigator.geolocation.getCurrentPosition((d)=>{console.log(d); setCurrentloc([d.coords.latitude , d.coords.longitude]);setLocation([d.coords.lat , d.coords.lng])},(e)=>{console.log(e); } ,{maximumAge:1000, timeout:5000, enableHighAccuracy: true} ) 
	  }
	})

  
  
 

  const postaddress =async () =>{
	  const urlForm = geturlFormdata("address","create",{},{})

	  const formData = new FormData();
	  formData.append("address_line_1", editaddress.addressLine1)
	  formData.append("address_line_2", editaddress.addressLine2)
	  formData.append("city",editaddress.city)
	  formData.append("state",editaddress.state)
	  formData.append("country",editaddress.country)
	  formData.append("pincode",editaddress.pincode)
	  formData.append("metadata",'{}')
	//   console.log(location);
	//   formData.append("location",`POINT(${location[0]} ${location[1]})`)
	  console.log(loc);
	  formData.append("location",`POINT(${loc[0]} ${loc[1]})`)
	  formData.append("landmark",editaddress.addressLine1)
      console.log(getobjlocal("userdata")[0]);
	  formData.append("customer_key", getobjlocal("userdata")[0]["userkey"])
	  
	//   formData.append("metadata",editaddress.metadata)

	 await postdata(urlForm.url , "address",formData , {}).then(()=>{
		 console.log("address added");
	 }).catch((e)=>{
		 console.log("something went wrong");
		 console.log(e);
	 })
  }


  const deleteaddress = () =>{
	const urlForm = geturlFormdata("address","create",{},{"address_line1":"Asdas"})
}

	 
	const onSet =(val,attrib) => {
		var tempobj = editaddress; tempobj[attrib] = val ;setEditaddress(tempobj) 
	}


     if ( !authContext.isLoggedIn){
		return (<LoginPage /> );
	 } 
	 else{
	return(
		<div >
		<Head>
			<title>Spook</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		
        <NameHead label="Addresses" onClick={()=>router.back()} onHomeClick={()=>{router.push('/home')}}  />

{/***here we will have a the addresses for the  */}
<div style={{flex:1,display:"flex",flexDirection:"column",flexGrow:1}} ></div>
                   
{ !editing && <div style={{flex:1,display:"flex",flexDirection:"row-reverse" , bottom:0 ,minHeight:10+"vw",width:"100%",backgroundColor:"white",position:"sticky",top:13+"vw",zIndex:1500}}> 
<Button style={{margin:2+"vw",backgroundColor:CLR_HEAD ,color:"white" }} onClick={()=>{setEditing(true); setEditaddress({});setCurrentloc(null)}} >Add new Address</Button>
</div> }

{!editing ? <Addresses onEditClick={(Editdata)=> {setEditaddress(Editdata); setEditing(true);setCurrentloc(null)}} /> :

<div style={{display:"flex",flex:1,justifyContent:"center" , alignItems:"center",flexDirection:"column",width:"100%" }}>

<div style={{flex:1,display:"flex",flexDirection:"row" , bottom:0 ,minHeight:10+"vw",width:"100%",backgroundColor:"white",zIndex:1500,justifyContent:"center"}}> 
<Button style={{margin:2+"vw" }} onClick={()=>{setEditing(false); setEditaddress({});setCurrentloc(null)}} ><FaTrash color={CLR_HEAD} style={{marginRight:"2vw"}} size={20}  /> Discard</Button>
			
 </div>

 <EditText label="addressLine1" value={editaddress.addressLine1} onSet={(val)=>{onSet(val,"addressLine1")}} placeholder={"enter address here.."} />
 <EditText label="addressLine2" value={editaddress.addressLine2} onSet={(val)=>{onSet(val,"addressLine2")}} placeholder={"enter address here.."}/>
 <EditText label="city" value={editaddress.city} onSet={(val)=>{onSet(val,"city")}} placeholder={"enter city here.."}/>
 <EditText label="state" value={editaddress.state} onSet={(val)=>{onSet(val,"state")}} placeholder={"enter state here.."}/>
 <EditText label="Country" value={editaddress.country} onSet={(val)=>{onSet(val,"country")}} placeholder={"enter Country here.."}/>
 <EditText label="Pin Code" value={editaddress.pincode} onSet={(val)=>{onSet(val,"pincode")}} placeholder={"enter pincode here.."}/>
 <EditText label="Phone" value={editaddress.state} disabled onSet={(val)=>{onSet(val,"phone")}} placeholder={"enter Phone here.."}/>

 <div style={{fontSize:8+"vw"}} onClick={()=> navigator.geolocation.getCurrentPosition((d)=>{console.log(d); setCurrentloc([d.coords.latitude , d.coords.longitude]);setLocation([d.coords.lat , d.coords.lng])},(e)=>{console.log(e); } ,{maximumAge:100, timeout:5000, enableHighAccuracy: true} )  }  >Set L<FaMapMarkerAlt />cation</div>
 
 {currentloc != null && <div style={{width:"90%",height:"30vh",borderRadius:10+"px",overflow:"hidden"}}><MapPage currentloc={currentloc} getcoords={(e) => { loc =  e;console.log(e) }}/></div>}
 <Button style={{margin:2+"vw" , borderRadius:2+"vw" , backgroundColor:CLR_HEAD , color:"white"}} onClick={()=>{setEditing(false);postaddress(); console.log(editaddress); setEditaddress({});setCurrentloc(null)}} > SAVE Address<FaSave color={"white"} size={20} style={{marginLeft:"2vw"}} /></Button>

  </div>

	}

<div style={{flex:1,display:"flex",flexDirection:"column",flexGrow:1}} ></div>

</div>

	);

	}


}


export default React.memo(Addresspage)