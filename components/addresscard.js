//task card for a new task that has been posted

import { ButtonBase } from '@mui/material';
import React from 'react'
import { FaEdit, FaGoogle, FaMap, FaPen, FaRegEdit } from 'react-icons/fa';
import { CLR_HEAD } from '../themes';


export default function Addresscard(props){

//const classes = useStyles();

  const [isloaded,setIsLoaded] = React.useState(true);
  console.log(props);
	return(
		<div>
            <div  onClick={() =>{console.log("selected");}} style={{margin:2+"vw" , padding:2+"vw", border:"1px solid "+CLR_HEAD , borderRadius:2+"vw"}} >

               <div style={{flex:1 ,width:"100%",display:"flex"}} >
                    <div >{props.address}</div>
                    <div style={{flex:1 ,width:"100%",display:"flex" , flexDirection:"row-reverse"}} ><FaPen name="editaddress" onClick={() => { props.onEditClick(props.addressobj) ;}} style={{}}/></div>
               </div>
               
                <div name="locality">{props.addressobj.locality}</div>

                <div>
                <span name="city">{props.addressobj.city}</span>
                <span name="state">{props.addressobj.state}</span>,
                <span name="country">{props.addressobj.country}</span>
                </div>
                
                <div name="pincode">{props.addressobj.pincode}</div>
                <div name="phone">{props.addressobj.phone}</div>
                <ButtonBase name="maplink" onClick={() => open(props.addressobj.maplink)}>open location in <FaMap /> </ButtonBase>
                
                
            </div>

            

		</div>
	);



}

