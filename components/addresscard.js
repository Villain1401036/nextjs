//task card for a new task that has been posted

import { ButtonBase } from '@mui/material';
import React from 'react'
import { FaEdit, FaGoogle, FaMap, FaMapSigns, FaPen, FaRegEdit } from 'react-icons/fa';
import { convertToJson } from '../constants';
import { CLR_HEAD } from '../themes';


export default function Addresscard(props){

//const classes = useStyles();

  const [isloaded,setIsLoaded] = React.useState(true);
  console.log(props);
  console.log(convertToJson(props.addressobj.metadata));

	return(
		<div>
            <div  onClick={() =>{console.log("selected");}} style={{margin:2+"vw" , padding:2+"vw", border:"1px solid "+CLR_HEAD , borderRadius:2+"vw"}} >

               <div style={{flex:1 ,width:"100%",display:"flex"}} >
                    <div style={{fontWeight:"bold"}}>{props.address}</div>
                    <div style={{flex:1 ,width:"100%",display:"flex" , flexDirection:"row-reverse"}} ><FaPen name="editaddress" onClick={() => { props.onEditClick(props.addressobj) ;}} style={{}}/></div>
               </div>
               
                <div name="locality" style={{fontWeight:"bold"}}>{props.addressobj.name}</div>

                <div style={{fontWeight:"bold"}}>
                <span name="city">{props.addressobj.city}, {props.addressobj.state}, {props.addressobj.country}</span>
               
                </div>
                
                <div name="pincode">{props.addressobj.pincode}</div>
                
                <div  name="maplink" onClick={() => open(`https://www.google.com/maps?q=${convertToJson(props.addressobj.metadata)['lat']},${convertToJson(props.addressobj.metadata)['lon']}`)}  style={{color:"blue"}}>open location in Google Maps </div>
                
                
            </div>

            

		</div>
	);



}

