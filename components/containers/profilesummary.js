
import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { getdata } from '../../networking/getdata';
import { Button } from '@material-ui/core';
import Taskcard from '../taskcard';
import { MapSharp } from '@material-ui/icons';
import Addresscard from '../addresscard';
import { callwithcache, geturlFormdata, setValue } from '../../constants';


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
		borderRadius:25+"vw",
		borderColor:"black"	,
		borderWidth:3,
		borderStyle:"solid"
	},
	proname:{
		fontSize:5+"vw",
		fontWeight:"bold"

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

	    
    var urlForm = geturlFormdata("customer","get",  {"user_id":63 }) //localStorage.getItem("customerid") }  )
    var url = urlForm.url

    
	useEffect (()=>{
		if (!loaded){
			refreshprofile();
		}
		
	 }); 

	 
const refreshprofile = async () =>{

	callwithcache(getdata, url, "customers" ).then((value) =>{

        
		console.log(value);
        setValue(value[0],refreshprofile ,setProfile )}).then((val)=>{
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
			<div><Button onClick={()=>{ console.log(edit); ;  setEdit(!edit)}}  >edit</Button> </div>
                <img src = {picurl} className={classes.profilepic}/>
                <div>
				
                    {edit?<div style={{width:100+"vw"   }}><span className={classes.proname} >{profile.firstName}</span></div>:<input inputMode="numeric"></input>}
                    
                    </div>
                   
                    {edit?<div style={{width:100+"vw"  }}><span className={classes.proname} >contact no. -{profile.phoneNumber}</span></div>:<input inputMode="numeric"></input>}
					{edit?<div style={{width:100+"vw"  }}><span className={classes.proname} >email - {profile.email}</span></div>:<input inputMode="numeric"></input>}
             <div>
  
             </div>
             </div>
	   }
	   </>
	);

}
 