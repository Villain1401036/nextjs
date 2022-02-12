
import React, { useEffect, useState } from 'react'


import { getdata } from '../../networking/getdata';
import { Button, DialogContent, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Taskcard from '../taskcard';
import { callwithcache, geturlFormdata, setValuesfrommap } from '../../constants';
import Bidcard from '../bidcard';
import Bookingreqcard from '../bookingreqcard';
import { CLR_RCARD1 } from '../../themes';
import { Dialog } from '@mui/material';
import { getQrCode } from '../../utils';


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

export default function Bookingcontainer(props){
  
  const [loaded,setLoaded] = React.useState(false); 

    const [bookinglist,setBookinglist] = React.useState([]);
    
    const [bookingtrgt , setBookingtrgt ] =  React.useState({}); 

  

    useEffect (()=>{
      if (!loaded){
      refreshongoing();
      }
   });


   const refreshongoing =  () =>{ 
    //call the function to update with the latest tasks
    var urlForm = geturlFormdata("booking" , "get" , {"lender":63 , "gettype":"lender"} , {}) //localStorage.getItem("customerid") }  )
    var url = urlForm.url

    callwithcache(getdata, url, "bookings").then((value) =>{
      taskmap.clear();
      setLoaded(true);
      setValuesfrommap(value, refreshongoing ,setBookinglist , taskmap ,"bookingId" )}).catch((err) =>{
        console.log(err);
      }
      )
}


const Verifypickup = async (bookid,bookingtrgt) => {

  try{
    setOpen(true)
    setBookingtrgt(bookingtrgt)
    
  }
  catch{
  
  }
 
  
}



const tolocaltime = (epoch) =>{
  var date = new Date(0);
  date.setUTCSeconds(epoch)
  
  return date
} 



   

      const filllatest =  bookinglist.map( (item) =>  <Bookingreqcard key={item.bookingId}  booking_id={item.bookingId} Verifypickup={(bookid, bookingobj)=> {  console.log(bookingobj); Verifypickup(bookid, bookingobj).then(()=>{  getQrCode("canvas" , "pickup" ,63634)})} } name={item.bookingId}  status={item.status} book_from={ tolocaltime(item.bookFrom)} book_to={   tolocaltime(item.bookTo   )} price={item.bookingPrice} customerKey={item.customerKey} bookingobj={item} maplink="https://www.google.com/maps?q=23,88"></Bookingreqcard>  )
   

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    
    const handleClose = () => {
      setOpen(false);
    };
    
  const [isloaded,setIsLoaded] = React.useState(true);

	return(
		<div style={{ backgroundColor:CLR_RCARD1 }}>

                <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
        PaperProps={{style:{minWidth:95+"vw", minHeight:85+"vh" , alignContent:"center", textAlign:"center", justifyContent:"center"}}}
      >
        
        <DialogTitle id="alert-dialog-title">
          
        </DialogTitle>
        <h1>Scan this QR code to verify </h1>
        <div id="canvas"></div>
        <div style={{textAlign:"center"}}>{ bookingtrgt != {} ? bookingtrgt.bookingId :<></>}</div>
        <Button onClick={()=>{ }} autoFocus>
          
          </Button>
      </Dialog>

         
             <Button onClick={async()=>{refreshongoing()}} title="asdasd"  >all booking reqs</Button> 
             <div style={{minWidth: 100+"%" , display: "grid"}}>
             {filllatest}
             </div>
             </div>
	);

}
