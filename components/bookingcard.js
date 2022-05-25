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
 padding:1+"vw" ,
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
            return "Booking cancelled"
        case 1:
            return <>Booking Requested<button onClick={() =>{ props.Cancelbooking("cancel", props.bookingobj) }}>cancel</button></>
        case 2:
            return <>Booking Confirmed<button onClick={() =>{ props.Verifypickup("pickup", props.bookingobj) }}>pickup</button></> 
        case 3:
              return <>Picked up from lender<button onClick={() =>{ props.Verifypickup("return", props.bookingobj) }}>return</button></>
        case 4:
              return <>returned to lender</>
        default :
              return <>Something wrong  </>
    }
  }


   
  const router = useRouter();

  var rooturl = s3rooturl



  const statuscolor = (status) =>{
 
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
		
            <Card variant='normal'  className={classes.root} style={{backgroundColor:statuscolor(props.bookingobj.status)}} >
                {/*<div name="name">{props.name}</div>*/}
                <div style={{}}>
                <CardMedia
        component="img"
        style={{  display:"-ms-flexbox" ,  objectFit:"contain" , backgroundColor: "lightgrey"  }}
        image={rooturl+props.image}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src="/images/no-image.png";
          currentTarget.alt="no image"
          
        }}
        alt="green iguana"
      />
                <div>
                <div name="description"  >{props.description}</div>
                
                <div name="price"  >Booking Price: {props.price}</div>
                <div name="price"  >Item Key: {props.bookingobj.itemKey}</div>
                <a href=''>go to item</a> 
                <div name="book_from" >FROM :{props.book_from.getUTCFullYear()} {props.book_from.toUTCString().substring(8,11)} {props.book_from.getUTCDate()}</div>
                <div name="book_to" >TO : {props.book_to.getUTCFullYear()} {props.book_to.toUTCString().substring(8,11)} {props.book_to.getUTCDate()}</div>
                </div>
                </div>


                <div name="status" >{getStatus(props.bookingobj.status)}</div>
               


{/* 
               {  true?
                  <div>{convertToJson(props.bookingobj.metadata)["images"]}</div>:<></>
               } */}
               <div id="contact">{props.contact}</div>
               
               

                <div style={{display:"flex" , flexDirection:"row-reverse" }}>
                
            <div style={{display:"flex" , flex:1, flexDirection:"row" }}></div>
               
                </div>
            </Card> 

        
	);



}

