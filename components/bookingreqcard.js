//task card for a new task that has been posted
import { Button, Card, CardMedia, divField, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { convertToJson, geturlFormdata, pushtask, s3rooturl } from '../constants';
import {  postdata } from '../networking/postdata';



const useStyles = makeStyles((theme) => ({    
   returnbutt:{
     fontSize:60+"%",
     borderRadius:1+"vw",
     borderStyle: "solid",
     borderColor:"green",
     borderWidth:2+"px",
     margin:1+"vw",
     backgroundColor:"white",
     color:"Black"

   }
}));


export default function Bookingreqcard(props){

const classes = useStyles();

  const [isloaded,setIsLoaded] = React.useState(false);
  const [status,setStatus] = React.useState(props.status);

const bidhandler = () =>{

   
  open(props.maplink)

}

   
  const router = useRouter();


  var rooturl = s3rooturl

   useEffect(()=>{
       if(!isloaded){
           setIsLoaded(true)
       }
   })


  const catchbooking = async (updatetype , status , booking_id ) =>{


    var formdatas = new FormData();

     formdatas.append("status", status)

    var urlform = geturlFormdata("booking", "update" , {"updatetype":updatetype , "booking_id": booking_id }) 
   await  postdata( urlform.url , "booking" , formdatas ).then(()=>{ }).then(()=>{
       if(props.status == 1 && status == 2){
        setStatus(2)
       }else{
         setStatus(-1)
       }

     
   })

  
    
    
  }


	return(
		
            <Card variant='outlined'  style={{ margin:1+"vw"}} >
                {/*<div name="name">{props.name}</div>*/}
                <div style={{display:"flex"}} onClick={() =>{ console.log(props.bookingobj) }}>
                <CardMedia
        component="img"
        style={{ margin:1+"vw" , maxHeight:70+"vw" , minHeight:40+"vw", maxWidth:50+"%", objectFit:"contain" , backgroundColor: "lightgrey" }}
        image={rooturl+ convertToJson(props.bookingobj.metadata).images[1]}
        
        alt="green iguana"
      />
      <div style={{padding:2+"vw"}}>
                <div name="name"  style={{fontSize:5+"vw"}}>{props.name}</div>
                <div name="description"  style={{fontSize:3+"vw"}}>{props.description}</div>
                
                <div name="price"  style={{fontSize:4+"vw"}}>Booking Price: <span style={{ fontWeight:"bold"}}>{props.price}</span></div>
                
                <div name="book_from" style={{fontSize:4+"vw"}}>Booking from: <span>{props.book_from.getUTCFullYear()} {props.book_from.toUTCString().substring(8,11)} {props.book_from.getUTCDate()}</span></div>
                <div name="book_to" style={{fontSize:4+"vw"}}>Booking to: {props.book_to.getUTCFullYear()} {props.book_to.toUTCString().substring(8,11)} {props.book_to.getUTCDate()}</div>
              </div>  
                
                </div>
                <div style={{display:"flex" , flexDirection:"row" }}>
                    
              {/* {status < 2? 
                <button onClick={()=>{
                    catchbooking("status",2,props.name)
                }}>confirm booking</button>
                : <><button disabled onClick={()=>{
                    
                }}>confirmed</button><button onClick={() => props.Verifypickup(props.booking_id, props.bookingobj)}>Verify Pickup</button> </>} */}


{status == "-1" && <><Button disabled  style={{color:"white",backgroundColor:"red", opacity:20+"%"}} onClick={()=>{ catchbooking("status",-1,props.bookingobj.bookingKey)}}>rejected</Button></> }
                

                {status == "1" && <><Button className={classes.returnbutt} onClick={()=>{ catchbooking("status",2,props.bookingobj.bookingKey)}}>confirm booking</Button> <Button className={classes.returnbutt} onClick={()=>{ catchbooking("status",-1,props.bookingobj.bookingKey)}}>reject</Button></> }
                {status == "2" && <><Button className={classes.returnbutt}  style={{color:"white",backgroundColor:"green", opacity:20+"%"}} disabled onClick={()=>{ }}>confirmed</Button><Button className={classes.returnbutt} style={{borderColor:"orange"}} onClick={() => { console.log(props.bookingobj.bookingKey); props.Verifypickup(props.bookingobj.bookingKey, props.bookingobj) ; }}>Verify Pickup</Button> </>}
                {status == "3" && <><Button disabled className={classes.returnbutt} style={{color:"white",backgroundColor:"green", opacity:20+"%"}} onClick={()=>{ }}>confirmed</Button><Button className={classes.returnbutt} style={{borderColor:"orange", backgroundColor:"orange" , color:"white" , opacity:20+"%"}} disabled  onClick={() => props.Verifypickup(props.bookingobj.bookingKey, props.bookingobj)}>Picked up</Button> <Button className={classes.returnbutt} style={{borderColor:"purple"}} onClick={() => props.Verifyreturn(props.bookingobj.bookingKey, props.bookingobj)}>Verify Return</Button> </>}
                {status == "4" && <><Button disabled className={classes.returnbutt} style={{color:"white",backgroundColor:"green", opacity:20+"%"}} onClick={()=>{ }}>confirmed</Button><Button className={classes.returnbutt} style={{borderColor:"orange", backgroundColor:"orange" , color:"white" , opacity:20+"%"}} disabled  onClick={() => props.Verifypickup(props.bookingobj.bookingKey, props.bookingobj)}>Picked up</Button> <Button className={classes.returnbutt} style={{borderColor:"purple"  , backgroundColor:"purple",color:"white" , opacity:20+"%" }} onClick={() => props.Verifyreturn(props.bookingobj.bookingKey, props.bookingobj)} disabled>Returned</Button> </>}
                </div>
            </Card>

        
	);



}

