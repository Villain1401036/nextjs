//task card for a new task that has been posted
import { Button, Card, CardMedia, divField } from '@material-ui/core';
import { divFormat, PinDrop, PinDropOutlined, PinDropRounded, PinDropSharp, PinDropTwoTone } from '@material-ui/icons';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { geturlFormdata, pushtask } from '../constants';
import { bidtask, postdata } from '../networking/postdata';
import { getQrCode } from '../utils';



export default function Bookingreqcard(props){

//const classes = useStyles();

  const [isloaded,setIsLoaded] = React.useState(false);
  const [status,setStatus] = React.useState(props.status);

const bidhandler = () =>{

  console.log("post request for opening a bid");
  open(props.maplink)

}






  console.log(props.location);
  const router = useRouter();


  var rooturl = "http://localhost:9000"

   useEffect(()=>{
       if(!isloaded){
           setIsLoaded(true)
       }
   })


  const catchbooking = async (updatetype , status , booking_id ) =>{

    console.log("create a work with the data of a task");
  
    var formdatas = new FormData();

     formdatas.append("status", status)

    var urlform = geturlFormdata("booking", "update" , {"updatetype":updatetype , "booking_id": booking_id }) 
   await  postdata( urlform.url , "booking" , formdatas ).then(()=>{console.log("done");}).then(()=>{
       if(props.status == 1){
        setStatus(2)
       }
     
   })

  
    
    
  }


	return(
		
            <Card variant='outlined'  style={{ margin:0.4+"vw"}} >
                {/*<div name="name">{props.name}</div>*/}
                <div onClick={() =>{ console.log(props.bookingobj) }}>
                <CardMedia
        component="img"
        style={{ maxHeight:70+"vw" , minHeight:40+"vw",  objectFit:"contain" , backgroundColor: "lightgrey" }}
        image={rooturl+props.image}
        
        alt="green iguana"
      />
                
                <div name="description"  style={{fontSize:3+"vw"}}>{props.description}</div>
                
                <div name="price"  style={{fontSize:4+"vw"}}>Price: {props.price}</div>
                
                <div name="book_from" style={{fontSize:5+"vw"}}>FROM : {props.book_from.getUTCDate()}-{props.book_from.getUTCMonth()}-{props.book_from.getUTCFullYear()}</div>
                <div name="book_to" style={{fontSize:5+"vw"}}>TO : {props.book_to.toUTCString()}</div>
                
                
                </div>
                <div style={{display:"flex" , flexDirection:"row-reverse" }}>
                    
              {status < 2? 
                <button onClick={()=>{
                    catchbooking("status",2,props.name)
                }}>confirm booking</button>
                : <><button disabled onClick={()=>{
                    
                }}>confirmed</button><button onClick={() => props.Verifypickup(props.booking_id, props.bookingobj)}>Verify Pickup</button> </>}

               
                </div>
            </Card>

        
	);



}

