
import React, { useEffect, useState } from 'react'


import { getdata } from '../../networking/getdata';
import { Button, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Taskcard from '../taskcard';
import { callwithcache, convertToJson, geturlFormdata, setValuesfrommap } from '../../constants';
import Bidcard from '../bidcard';
import Bookingcard from '../bookingcard';

import  Confirm  from './confirmation';
import { Dialog } from '@mui/material';
import { checkQrCode } from '../../utils';
import { postdata } from '../../networking/postdata';
import { CLR_HEAD, CLR_HEAD1, CLR_RCARD1 } from '../../themes';
import { getlocal, storelocal } from '../../localstore';

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
const opentasklist = [];
const tlist =[]
var count = 0;
//this will be a container for all the recent work that is going om

export default function Bookingorders(props){
  
  const [loaded,setLoaded] = React.useState(false); 

    const [bookinglist,setBookinglist] = React.useState([]);

    const [bookobj,setBookobj] = React.useState();
    
    const [open, setOpen] = React.useState(false);

    const [code, setCode] = React.useState();


  

    useEffect (()=>{
      if (!loaded){
      refreshongoing();
      }
   });


   const refreshongoing =  () =>{ 
    //call the function to update with the latest tasks
    storelocal("user_key" , 63)
    var urlForm = geturlFormdata("booking" , "get" , {"customer_key":getlocal("user_key") , "gettype":"customer"} , {}) //localStorage.getItem("customerid") }  )
    var url = urlForm.url

    callwithcache(getdata, url, "bookings").then((value) =>{
      taskmap.clear();
      setLoaded(true);
      setValuesfrommap(value, refreshongoing ,setBookinglist , taskmap ,"bookingId" )}).catch((err) =>{
       
      }
      )
}

   


  //const ftest = () => taskmap.forEach( (value) => { tlist.push(value) } )
    const tolocaltime = (epoch) =>{
        var date = new Date(0);
        date.setUTCMilliseconds(epoch)
         
        return date
    }

    const Verifypickup = async(gettype,bookingobj) =>{
      try{
        var data = checkQrCode( gettype ,bookingobj.bookingId).then(data=>{setCode(data);console.log(data, "fromveri"); ;setBookobj(bookingobj)})
       
          
      }catch{

      }
    }

     
 const onPickup = async (updatetype , status , booking_id ) =>{



  var formdatas = new FormData();

   formdatas.append("status", status)

  var urlform = geturlFormdata("booking", "update" , {"updatetype":updatetype , "booking_id": booking_id }) 
 await  postdata( urlform.url , "booking" , formdatas ).then(()=>{}).then(()=>{
     if(props.status == 2){
      setStatus(3)
     }
   
 })
}

const onReturn = async (updatetype , status , booking_id ) =>{



  var formdatas = new FormData();

   formdatas.append("status", status)

  var urlform = geturlFormdata("booking", "update" , {"updatetype":updatetype , "booking_id": booking_id }) 
 await  postdata( urlform.url , "booking" , formdatas ).then(()=>{}).then(()=>{
     if(props.status == 3){
      setStatus(4)
     }
   
 })
}

      const filllatest =  bookinglist.map( (item) =>  <Bookingcard key={item.bookingId} name={item.bookingId} image={convertToJson(item.metadata).images[0]}
       Verifypickup={( gettype , bookingobj)=> {   Verifypickup(gettype, bookingobj).then(()=>{  setOpen(true) })} } 
       status={item.status} book_from={ tolocaltime(item.bookFrom)} book_to={   tolocaltime(item.bookTo   )} price={item.bookingPrice} customerKey={item.customerKey} bookingobj={item} maplink="https://www.google.com/maps?q=23,88"></Bookingcard>  )
   

    const classes = useStyles();

  const [isloaded,setIsLoaded] = React.useState(true);



  const handleClose = () => {
   
  };
  

  const processQR = (scandata , code) =>{
    
      console.log(code);
      console.log(scandata);
      if (code === scandata){
          
          if(bookobj.status == "2" ){
            onPickup("status",3,bookobj.bookingId)
          }else if(bookobj.status == "3"){
            onReturn("status",4,bookobj.bookingId)
          }
          
          setOpen(false);
          return
      }
     
  }

  

	return(
		<div style={{ backgroundColor:CLR_RCARD1}}>
                 <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
        PaperProps={{style:{minWidth:95+"vw", minHeight:85+"vh" , alignContent:"center", textAlign:"center", justifyContent:"center"}}}
      >
        
        <DialogTitle id="alert-dialog-title">
          
        </DialogTitle>
        
        <Confirm passcode={(data)=> { processQR(data, code ); console.log(data,code) }} />
        
        <Button onClick={()=>{ }} autoFocus>
          
          </Button>
      </Dialog>
      
             <Button onClick={async()=>{refreshongoing()}} title="asdasd"  >refresh bookings</Button> 
             <div style={{minWidth: 100+"%" , display: "grid"}}>
             {filllatest}
             </div>
             
             </div>
	);

}
