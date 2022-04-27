
import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { getdata } from '../../networking/getdata';
import { Button } from '@material-ui/core';
import Taskcard from '../taskcard';
import { MapSharp } from '@material-ui/icons';
import Addresscard from '../addresscard';
import { callwithcache, geturlFormdata, setValuesfrommap } from '../../constants';
import { CLR_RCARD1 } from '../../themes';
import { FaMapMarked, FaMapMarkedAlt, FaMapMarker, FaMapMarkerAlt, FaMapPin } from 'react-icons/fa';
import { Navigate, useLocation } from 'react-router-dom';




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

const taskmap = new Map();
const openaddresslist = [];
const tlist =[]
var count = 0;
//this will be a container for all the recent work that is going om
export default function Addresses(props){


    const [loaded,setLoaded] = React.useState(false); 
   
    
    const [addresslist,setAddresslist] = React.useState([]);
    const classes = useStyles();
    

    useEffect (()=>{
       if (!loaded){
       refreshlatest();
       setLoaded(true);
       //setVal(openaddresslist);
       }
    });


    const refreshlatest =  () =>{
        //call the function to update with the latest tasks 
        var urlForm = geturlFormdata("address","get", {"customer_key":0}) //address links
        var url = urlForm.url
     
        callwithcache(getdata, url, "address").then((value) =>{

          
          setValuesfrommap(value,refreshlatest ,setAddresslist , taskmap ,"addressId")}).catch((err) =>{
             
          }
          )
    }



   
   
  const filllatest =  addresslist.map( (item) =>  <Addresscard key={item.addressId} address={item.addressId} addressobj={item} onEditClick={(data)=>props.onEditClick(data)} ></Addresscard> )


  // const loc = new Geolocation()



	return(
		<div style={{ flex:1,display:"flex",flexDirection:"column",width:"100%",flexGrow:1  }}>
               
             
             {filllatest}
             
            
             <div style={{ flex:1,display:"flex",flexDirection:"column-reverse",width:"100%",flexGrow:1}}>
              
              </div>
              </div>
             
	);
  
}
 


