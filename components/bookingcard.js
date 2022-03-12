//task card for a new task that has been posted
import { Button, Card, CardMedia, divField } from '@material-ui/core';
import { divFormat, PinDrop, PinDropOutlined, PinDropRounded, PinDropSharp, PinDropTwoTone } from '@material-ui/icons';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { convertToJson, pushtask } from '../constants';
import { bidtask, postdata } from '../networking/postdata';
import { CLR_HEAD, CLR_RCARD2 } from '../themes';



export default function Bookingcard(props){

//const classes = useStyles();

  const [isloaded,setIsLoaded] = React.useState(true);

   
  useEffect (()=>{
    if (!isloaded){
    
    setIsLoaded(true);
    }
 });


  const getStatus = (num) =>{
    switch (num){
        case 1:
            return "Booking Requested"
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


  console.log(props.location);
  const router = useRouter();

  var rooturl = "http://localhost:9000"


  console.log(props.bookingobj);

	return(
		
            <Card variant='normal'  style={{ margin:1+"vw",borderColor:CLR_HEAD, padding:1+"vw" , borderRadius:1+"vw" }} >
                {/*<div name="name">{props.name}</div>*/}
                <div style={{}}>
                <CardMedia
        component="img"
        style={{ maxHeight:70+"vw" , display:"-ms-flexbox" ,minHeight:40+"vw",  objectFit:"contain" , backgroundColor: "lightgrey"  }}
        image={rooturl+props.image}
        alt="green iguana"
      />
                <div>
                <div name="description"  style={{fontSize:3+"vw"}}>{props.description}</div>
                
                <div name="price"  style={{fontSize:4+"vw"}}>Booking Price: {props.price}</div>
                <div name="price"  style={{fontSize:4+"vw"}}>Item Key: {props.bookingobj.itemKey}</div>
                <a href=''>go to item</a> 
                <div name="book_from" style={{fontSize:5+"vw"}}>FROM :{props.book_from.getUTCFullYear()} {props.book_from.toUTCString().substring(8,11)} {props.book_from.getUTCDate()}</div>
                <div name="book_to" style={{fontSize:5+"vw"}}>TO : {props.book_to.getUTCFullYear()} {props.book_to.toUTCString().substring(8,11)} {props.book_to.getUTCDate()}</div>
                </div>
                </div>


                <div name="status"  style={{fontSize:4+"vw"}}>{getStatus(props.bookingobj.status)}</div>
               


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

