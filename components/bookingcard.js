//task card for a new task that has been posted
import {  Card, makeStyles } from '@material-ui/core';
import { CardMedia } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import {  s3rooturl } from '../constants';

import { CLR_HEAD, CLR_RCARD2 } from '../themes';


const useStyles = makeStyles((theme) => ({    
  root: 
{
   margin:1+"vw",
borderColor:CLR_HEAD,
 padding:2+"vw" ,
  borderRadius:1+"vw" ,
  '@media (min-width:600px)':{
   
  }
}

}))

export default function Bookingcard(props){

const classes = useStyles();

  const [isloaded,setIsLoaded] = React.useState(true);

   
  useEffect (()=>{
    if (!isloaded){
    
    setIsLoaded(true);
    }
 });


  const getStatus = (num) =>{
    switch (num){
      case -1:
            return <div style={{display:"flex",flex:1,alignItems:"center",color:"red",fontWeight:"bold"}}>Booking Cancelled</div>
        case 1:
            return (
            <div style={{display:"flex",flex:1,alignItems:"center",justifyContent:"flex-start"}}>
              <div style={{display:"flex",flex:1,alignItems:"center",color:"lightgreen",fontWeight:"bold"}}>Booking Requested</div>
              <div style={{display:"flex",justifyContent:"flex-end" , alignItems:"center" , backgroundColor:"red" ,color:"white" , fontWeight:"bold"}} className='btn' onClick={() =>{ props.Cancelbooking("cancel", props.bookingobj) }}>cancel</div>
              </div>)
        case 2:
            return (<div style={{display:"flex",flex:1,alignItems:"center",justifyContent:"flex-start"}}>
              <div style={{display:"flex",flex:1,alignItems:"center",color:"green",fontWeight:"bold"}}>Booking Confirmed</div>
              <div style={{display:"flex",justifyContent:"flex-end" , alignItems:"center", backgroundColor:"orange" ,color:"white" , fontWeight:"bold"}} className='btn' onClick={() =>{ props.Verifypickup("pickup", props.bookingobj) }}>pickup</div>
              </div>) 
        case 3:
              return (
              <div style={{display:"flex",flex:1,alignItems:"center",justifyContent:"flex-start"}}>
                <div style={{display:"flex",flex:1,alignItems:"center",color:"orange",fontWeight:"bold"}}>Picked up from lender</div>
                <div style={{display:"flex",justifyContent:"flex-end" , alignItems:"center", backgroundColor:"blue" ,color:"white" , fontWeight:"bold"}} className='btn' onClick={() =>{ props.Verifypickup("return", props.bookingobj) }}>return</div>
                </div>)
        case 4:
              return <div style={{display:"flex",flex:1,alignItems:"center",color:"blue",fontWeight:"bold"}}>Returned to Lender</div>
        default :
              return <>Something wrong  </>
    }
  }


   
  const router = useRouter();

  var rooturl = s3rooturl



  const statuscolor = (status) =>{
      return "white"
      switch (status) {
        case -1:
          return "#f04a37"
          case 1:
            return "lightblue"
            case 2:
          return "yellow"
          case 3:
          return "green"
          case 4:
            return "grey"
        default:

          return "white"
      }
  }
   

	return(
		
            <Card variant='outlined'   className={classes.root} style={{backgroundColor:statuscolor(props.bookingobj.status), borderColor:"white"}} >
                {/*<div name="name">{props.name}</div>*/}
                <div style={{display:"flex"}}>
                <CardMedia
        component="img"
        style={{  display:"-ms-flexbox" ,  objectFit:"cover" , backgroundColor: "lightgrey", width:"40%",borderRadius:"2vw" ,  }}
        image={rooturl+props.image}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src="/images/no-image.png";
          currentTarget.alt="no image"
          
        }}
        alt="green iguana"
      />
                <div style={{padding:2+"vw"}}>
                <div name="description"  >{props.description}</div>
                
                <div name="price"  >{props.itemname}saas</div>
                {/* <div name="price"  >Item Key: {props.bookingobj.itemKey}</div> */}
          
                <div name="price"  >Amount : {props.price}</div>
                <div name="booking" >{props.book_from.toUTCString().substring(8,11)} {props.book_from.getUTCDate()}-{props.book_to.toUTCString().substring(8,11)} {props.book_to.getUTCDate()}</div>
                </div>
                </div>


                <div name="status" style={{}} >{getStatus(props.bookingobj.status)}</div>
               


            </Card> 

        
	);



}

