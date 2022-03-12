
import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { getdata } from '../../networking/getdata';
import { Button } from '@material-ui/core';
import Taskcard from '../taskcard';
import { Edit, EditAttributesOutlined, EditOutlined, MapSharp } from '@material-ui/icons';
import Addresscard from '../addresscard';
import { callwithcache, geturlFormdata, setValue } from '../../constants';
import { CLR_HEAD, CLR_RCARD2 } from '../../themes';
import { getlocal } from '../../localstore';


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
	profilepic:{
		height:50+"vw",
		width:50+"vw",
		objectFit:"cover",
		borderRadius:2+"vw",
		// borderColor:"black"	,
		// borderWidth:3,
		// borderStyle:"solid"
	},
	proname:{
		fontSize:5+"vw",
		fontWeight:"bold"

	},

	nbuttonroot:
     
	{
	  display:"flex",
	  backgroundColor:CLR_HEAD,
	  color:CLR_RCARD2 ,
	   margin:2+"vw" ,
	   height:10+"vw",
	   
	   borderRadius:2+"vw",
	   borderColor:CLR_RCARD2,
	   borderStyle:"solid",
	   borderWidth:1+"px",
	   
	   justifyContent:"center",
	   alignItems: "center",
	  
	  },
	  divMode:{
		
	  },
	  inputmode:{

	  }
	  
}));

const taskmap = new Map();
const openaddresslist = [];
const tlist =[];
var count = 0;
//this will be a container for all the recent work that is going om
export default function Profilesummary(props){

    const [loaded,setLoaded] = React.useState(false); 
    
    const classes = useStyles();
	const [profile , setProfile] = React.useState({});
    const [edit , setEdit] = React.useState(true);

	    
    

    
	useEffect (()=>{
		if (!loaded){
			refreshprofile();
		}
		
	 }); 

	 
const refreshprofile = async () =>{
	var urlForm = geturlFormdata("customer","get",  {"user_id":getlocal("temp_id") , idtype:"email" }) //localStorage.getItem("customerid") }  )
    var url = urlForm.url
	callwithcache(getdata, url, "customers" ).then((value) =>{

        
		console.log(value);
        setValue(value[0],refreshprofile , setProfile )}).then((val)=>{
			setLoaded(true);
		}).catch((err) =>{
          console.log(err);
        }
        )

}



   var  picurl = "https://images.pexels.com/photos/53141/rose-red-blossom-bloom-53141.jpeg?cs=srgb&dl=pexels-pixabay-53141.jpg&fm=jpg"

	return(
		<>

       { loaded && 
		<div style={{alignSelf:"center" , textAlign:"center" }}>
			<h1 style={{color:CLR_HEAD}}>User Profile</h1>

			
                <img src = {picurl} className={classes.profilepic}></img>
				<div onClick={()=>{ console.log("edit profile picture"); }}><a>Change picture</a></div>


                <div style={{margin:10+"vw"}} >
				
                    {edit?<div><span className={classes.proname} >{profile.firstName} {profile.lastName}</span></div>:<input inputMode="numeric"></input>}
                    
					<div ><span className={classes.proname} >{"Email :"} {profile.email}</span><span style={{fontSize:50+"%"}}>change Email</span></div> 
					
					<div ><span className={classes.proname} >{"Phone :"} {profile.phoneNumber}</span><span style={{fontSize:50+"%"}}>change Phone</span></div>


                    </div>
                      
					
					 <div>
  
             </div>
             </div>
	   }
	   </>
	);

}


function InputDiv(props){
	const classes = useStyles();
	 
    return(
		
		
        <input className={classes.divMode} value="akysgdkasj" disabled onClick={props.onClick} />
  
	);
}
 