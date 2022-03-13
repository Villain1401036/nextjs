import Head from 'next/head'
import React, { useState } from 'react'
import ButtonAppBar from './headbar'


import { convertToJson, getitemonpage, geturlFormdata, s3rooturl, Shopname } from '../constants'
import { makeStyles } from '@material-ui/core/styles';


import { useRouter } from 'next/router'
import { Dialog } from '@mui/material';
import { DialogActions, DialogContent, DialogContentText, DialogTitle, Input, TextField ,Button, Box} from '@material-ui/core';
import {  Carousel } from 'react-bootstrap';
import { LocalizationProvider, MobileDatePicker, MobileDateRangePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { postdata } from '../networking/postdata';
import { style } from '@mui/system';
import { getdata } from '../networking/getdata';
import Footer from './footer';

const useStyles = makeStyles((theme) => ({
  root: {
		margin:"auto",
		
    display: 'grid',
		gridTemplateColumns:"auto auto auto",

    '& > *': {
      margin: theme.spacing(0),
    },
	},
  contentArea:{ 
        
    marginTop:10+"vw",
    

    '@media (min-width:845px)': { // eslint-disable-line no-useless-computed-key
      marginTop: 5+"vw"
    },
    '@media (max-width:360px)': { // eslint-disable-line no-useless-computed-key
        marginTop: 15+"vw"
    }
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
  butt:{
    backgroundColor:"lightgreen"
  }
}));

//this page will contain info if there is some issue with the work 
// button for updating the status 
// button for changing the time 
//rasing the ticket for the work 
//all things that is done 
//all chats will be here only 
//progress of the work 
//any pictures related to the work 


export default function Itemcontainer(props){

const [openbid , setOpenbid] = useState(false); 
const [openbook , setOpenbook] = useState(false); 

const [startdate, setStartdate] = React.useState(Date());
const [enddate, setEnddate] = React.useState(Date());

const [value, setValue] = React.useState([null,null]);

const [fetching , setFetching] = React.useState(false);

const [bid_message, setBidMessage] = React.useState(null);
const [bid_price, setBidPrice] = React.useState(0);

const [itemdata , setItemdata] = useState({});
const [isbooked , setIsbooked] = useState();

const [bookings,setBookings] = useState();
const classes = useStyles();
const router = useRouter();


  const [isloaded,setIsloaded] = React.useState(false);
  React.useEffect(() => {

    // Update the document title using the browser API
    if ( !isloaded){
      var itemdata = getitemonpage()
      setItemdata(itemdata);
      setIsloaded(true);
      getreqd()
      
    }
     
    
  });

  const getreqd =async ()=>{

    var val = await getbooking(63)
    var boooo = checkbooking(val,itemdata.itemKey)
    console.log(boooo);

  }
   
  const getbooking = async (customer_key) =>{

    var urlForm =geturlFormdata("booking","get",{"gettype":"customer",customer_key})
    var data 
   await getdata(urlForm.url , "bookings" , {}).then((val)=> {
      console.log(val);
      setBookings(val);
     data = val
    })
    return data
  }

  const checkbooking = (values,item_key) => {
    var present = false
      values.forEach(item => {
        if (item.itemKey == item_key ){
          present = true
        }
      });
      return present
  } 
   
//

const handleClickOpen = () => {
	setOpen(true);
  };
  
  const handleClose = () => {
    
	setOpenbook(false);
	setOpenbid(false);
  setFetching(false);
  };




//
//var images = null


const images = (list) =>  { 
	return list.map((item)=> <Carousel.Item style={{height:60+"vw"}}><img style={{ backgroundColor:"lightgray" ,height: 100+"%" ,objectFit:"cover"}}  className="d-block w-100"
src={s3rooturl+item}
alt="slide" ></img></Carousel.Item>

)
}


const biditem = (item_key,customer_key,bidprice,bid_message) =>{

  console.log("create a work with the data of a task");

  var formdatas = new FormData();
  formdatas.append("item_key",item_key)
   formdatas.append("customer_key", customer_key)

  formdatas.append("bidprice", bidprice)
  formdatas.append("bid_message", bid_message)
  var urlForm = geturlFormdata("biditem", "create")
  postdata( urlForm.url , "item" , formdatas )
  console.log(formdatas.getAll('place'));

  
}

const bookitem = async(item_key,customer_key,lender,bookprice,place,bookfrom,bookto) =>{

  console.log("create a work with the data of a task");

  var formdatas = new FormData();
  formdatas.append("item_key",item_key)
   formdatas.append("customer_key", customer_key)
   formdatas.append("lender", lender)
  formdatas.append("booking_price", bookprice)
  formdatas.append("place", place)
  formdatas.append("book_to", value[1].getTime())
  formdatas.append("book_from", value[0].getTime())
  console.log( JSON.stringify(convertToJson(itemdata.metadata)));
  formdatas.append("metadata" , JSON.stringify(convertToJson(itemdata.metadata)) )
   setFetching(true);
  
  var urlForm = geturlFormdata("booking","create",{},{})
  await postdata( urlForm.url , "booking" , formdatas ).then((val)=>{ document.getElementById("booking_title").replaceChildren("booking requested") }).catch((e)=>{  console.log(e); document.getElementById("booking_title").replaceChildren("some error occered") });
  console.log(formdatas.getAll('place'));

  
}

  const ddate =(date) =>{
    
    const dateInterditesRaw = [
      new Date(date.getFullYear(),2,8),
      new Date(date.getFullYear(),2,9),
      new Date(date.getFullYear(),2,10),
      new Date(date.getFullYear(),2,16),
      new Date(date.getFullYear(),2,17),
      new Date(date.getFullYear(),2,18)
  
    ];
    
    //get the minimum date from the dates
    const mind = value[0];
    
    var i = 0;
    for ( i = 0 ; i < dateInterditesRaw.length ; i++  ) {
      // console.log("=========================");
      // console.log(mind > dateInterditesRaw[i]);
      // console.log("=========================");
        if (mind < dateInterditesRaw[i]){
            // console.log("break------------------------------------------------");
            // console.log(dateInterditesRaw[i]);
            break
        }
    }
    
    const dateInterdites = dateInterditesRaw.map((arrVal) => {
      return arrVal.getTime()});
  
      /*exclude all sunday and use the includes array method to check if the 
      date.getTime() value is 
      in the array dateInterdites */
      //console.log( dateInterdites.includes(date.getTime()));
      //console.log(date.getDate());
      if (value[1] != null){
        return  dateInterdites.includes(date.getTime())  ;
      }
      if (value[0] == null){
        return  dateInterdites.includes(date.getTime())
      }
      if (value[0] != null){
        return  dateInterdites.includes(date.getTime()) || date.getTime() > dateInterditesRaw[i]  ;
      }
      
     
  
  
  }


	return(
    <>
		{isloaded?
 
		<div >
		
<Dialog
        open={openbid}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
		style={{textAlign:"center"}}
      >
		  {true?
		  <>
        <DialogTitle id="alert-dialog-title">
          PLACE YOUR BID
        </DialogTitle>
		
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
          </DialogContentText>
		<input inputMode='text' placeholder='anything to say ...'   onInput={(val)=>{setBidMessage(val.target.value)}}></input>
		<input  type='number' placeholder='your price' onChange={(val)=>{console.log(val.target.value); setBidPrice(val.target.value)}}></input>
        </DialogContent>
        <DialogActions>
          
          <Button  onClick={()=>{
            console.log(bid_price );
            biditem(itemdata.itemKey,63, bid_price,bid_message)
          }} autoFocus>Place BID</Button>
        </DialogActions>
		</>
           :
<>
        <DialogTitle id="alert-dialog-title">
          {"Something went wrong"}
        </DialogTitle>
        <DialogContent style={{textAlign:"center"}}>Task not Created</DialogContent>
        <Button onClick={()=>{console.log("pressed");}} autoFocus>
           press
          </Button>
		  </>
			}
      </Dialog>

<Dialog
        open={openbook}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
		style={{textAlign:"center"}}
    PaperProps={{style:{minWidth:80+"vw", minHeight:40+"vh"}}}
      >
		  {true?
		  <>
        <DialogTitle id="alert-dialog-title">
          BOOK ITEM
        </DialogTitle>
		
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
          </DialogContentText>
		<div  >AT price : INR {itemdata.price}</div>
        </DialogContent>
        <DialogActions> 

  {fetching?<><div id="booking_title">Booking in Progress</div></>:
    < >
      {/* <Button onClick={()=>{ console.log( Date.parse(enddate));console.log( Date.parse(enddate)) ;bookitem(itemdata.itemKey,63,itemdata.customerKey,itemdata.price,itemdata.place, Date.parse(startdate), Date.parse(enddate)) }} autoFocus>Request to Book</Button> */}
		  
      <LocalizationProvider dateAdapter={AdapterDateFns}>
       
      <MobileDateRangePicker
      
      allowSameDateSelection={false}
        disablePast
        //disableCloseOnSelect
        startText="Book from"
        endText="Book to"
        value={value}
        onChange={(newValue) => {
          //setValue(newValue);
          console.log("++++++++++++++++++++++++++++++++++++++");
          console.log(value);
          
            setValue(newValue)
          
        }}
      
        shouldDisableDate={ddate}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <div>{startProps.inputProps.value}</div>
            <div>{endProps.inputProps.value}</div>
            <Button onClick={()=>{ startProps.inputProps.onClick() }}>Check Availablity</Button>
            
            {/* <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} /> */}
          </React.Fragment>
        )}
      />
		  {/* <MobileDatePicker
          label="fromdate"
          value={startdate}
          onChange={(newValue) => {
            setStartdate(newValue);
            
          }}
          renderInput={(params) => <TextField {...params} />}
        />

      <MobileDatePicker
          label="tilldate"
          value={enddate}
          onChange={(newValue) => {  
            setEnddate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        /> */}
		</LocalizationProvider>
    </> }
        </DialogActions>
		</>
           :
<>
        <DialogTitle id="alert-dialog-title">
          {"Something went wrong"}
        </DialogTitle>
        <DialogContent style={{textAlign:"center"}}>Task not Created</DialogContent>
        <Button onClick={()=>{console.log("pressed");}} autoFocus>
           press
          </Button>
		  </>
			}
      </Dialog>

                 {/* { isloaded && <img src={ s3rooturl+convertToJson(itemdata.metadata).images[0]} style={{width:100+"vw" , objectFit:"contain" }} ></img>}
 */}

{ isloaded && <Carousel  onClick={()=>{}}  wrap={false}>

{images(convertToJson(itemdata.metadata).images)}
</Carousel>}

       <div style={{margin:3+"vw"}}> 
        <div>{"name:"}{itemdata.name}</div>
        <div style={{fontWeight:"bold"}}>Description</div>
				 <div>{itemdata.description}</div>
				 
				 <div style={{marginTop:5+"vw" ,}}><span style={{fontWeight:"bold"}}>Price : </span><span>{itemdata.price}</span> <span>{itemdata.deno}</span></div>
				 <div>{itemdata.negotiable?<>it's negotiable , Place your bid</>:<>(Sorry the price is not negotiable)</>}</div>
        {

        }
				 <Button className={classes.butt} onClick={()=>{console.log("place bid");setOpenbook(true)}}  >Request to book </Button>
				 <div>{itemdata.negotiable?<Button onClick={()=>{console.log("place bid");setOpenbid(true)}} >place bid</Button>:<></>}</div>

				{/* <div><button onClick={()=>{ open(convertToJson(itemdata.metadata).buylink) }}  >buy here</button></div> */}
        </div>
        <Footer />
				
		</div>
    :<></>}</>
	);



}






