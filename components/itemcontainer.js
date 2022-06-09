import Head from 'next/head'
import React, { useContext, useEffect, useState } from 'react'
import ButtonAppBar from './headbar'
import Image from 'next/image'

import { callwithcache, convertToJson, getitemonpage, geturlFormdata, s3rooturl, Shopname ,setValuesfrommap} from '../constants'
import { makeStyles } from '@material-ui/core/styles';


import router, { useRouter } from 'next/router'
import { Dialog } from '@mui/material';
import { DialogActions, DialogContent, DialogContentText, DialogTitle, Input, TextField ,Button, Box} from '@material-ui/core';
import {  Carousel } from 'react-bootstrap';
import { LocalizationProvider, MobileDatePicker, MobileDateRangePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { postdata } from '../networking/postdata';
import { style } from '@mui/system';
import { getdata, getdata_post } from '../networking/getdata';
import Footer from './footer';
import { getlocal, getobjlocal, storelocal } from '../localstore';
import { AuthContext } from '../context';
import Login from './googlelogin';
import LoginPage from '../pages/login';
import { CLR_HEAD, CLR_RCARD1, CLR_RCARD2 } from '../themes'
import { FaMapMarkedAlt, FaMapMarkerAlt } from 'react-icons/fa'
import MapPage from '../pages/mappage'
import Latestitem from './containers/latestitem'
import { sortmap } from '../utils'
import Itemcard from './itemcard'
import { getuserdata } from '../utils/signinUtils'


const useStyles = makeStyles((theme) => ({
  itemsbucket:{
    zIndex:0,
    height:window.innerHeight - window.innerWidth*(.15 + .15),
    
    // height:window.outerHeight - window.outerWidth*.15,
    // marginTop:window.innerHeight*.15,
    width:100+"vw",
    overflowY : "scroll" ,
    
    // flex:1,
    display:"grid" , 
    gridTemplateColumns: "50vw 50vw" ,
      // gridRowGap: 1+"vw",
      // gridColumnGap:1+"vw" ,
    // gridTemplateColumns: "100vw" ,
    // gridColumnGap:1+"vw" ,
    //  gridRowGap: 1+"vw",
    
    // marginBottom:1+"vw",
    // margin: 1+"vw",
    '@media (min-width:600px)': { // eslint-disable-line no-useless-computed-key
      

      // overflow:"scroll",
      height:window.innerHeight - window.innerWidth*(.05+.05),
    
    },
    
    '@media (min-width:800px)': { // eslint-disable-line no-useless-computed-key
      
      // overflow:"scroll",
      // height:window.innerHeight - window.innerWidth*(.1+.05),
      
      
      "*":{
        "-ms-overflow-style": "none"
    },
      "::-webkit-scrollbar": {
        display: "none"
    },
    justifyContent:"center",
    display:"grid",
      gridTemplateColumns: "20vw 20vw 20vw 20vw" ,
      gridRowGap: 1+"vw",
      gridColumnGap:1+"vw" ,
      
    },
    '@media (max-width:360px)': { // eslint-disable-line no-useless-computed-key
      
    }
  },
  root: {
		margin:"auto",
		
    display: 'grid',
		gridTemplateColumns:"auto auto auto",

    '& > *': {
      margin: theme.spacing(0),
    },
	},
  itemcontainer:{ 
        
    display:"flex",
    flex:1,
    flexDirection:"column",
    

    '@media (min-width:845px)': { // eslint-disable-line no-useless-computed-key
      flexDirection:"row",
      
    },
    '@media (max-width:360px)': { // eslint-disable-line no-useless-computed-key
       
    }
    },

		cover: {
			marginTop: 0,
			height:70,
			margin:'auto',
  },
  carousel:{
         
    '@media (min-width:845px)': { // eslint-disable-line no-useless-computed-key
      
      
      margin:2+"vw",
      // width:window.innerWidth*.5
    },
    '@media (max-width:360px)': { // eslint-disable-line no-useless-computed-key
       
    }
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

const [ordered , setOrdered] = useState(false);

const [currentloc ,setCurrentloc] = React.useState(null)

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

const [request , setRequest] = useState(false);

const authContext = useContext(AuthContext);

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const [isloaded,setIsloaded] = React.useState(false);

  React.useEffect(() => {

    // Update the document title using the browser API
    if ( !isloaded){
      var itemdata = getobjlocal("itemonPage")
      console.log(itemdata);
      setItemdata(itemdata);
      setIsloaded(true);
      //getreqd()
      
    }
     
    
  });

  const getreqd =async ()=>{

    var val = await getbooking(63)
    var boooo = checkbooking(val,itemdata.itemKey)
     

  }
   
  const getbooking = async (customer_key) =>{

    var urlForm =geturlFormdata("booking","get",{"gettype":"customer",customer_key})
    var data 
   await getdata(urlForm.url , "bookings" , {}).then((val)=> {
       
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
  setValue([null,null]);
  setRequest(false);
  };


  const heightimage = () =>{
    console.log(window.innerWidth);
      if ( window.innerWidth < 600){
        return window.innerWidth
      }else{
        return window.innerWidth/3
      }
   }
  
   const widthtimage = () =>{
    console.log(window.innerWidth);
    if ( window.innerWidth < 600){
      return window.innerWidth
    }else{
      return window.innerWidth/2.5
    }
   }


//
//var images = null


const images = (list) =>  { 
	return list.map((item)=> <Carousel.Item style={{ height: heightimage()*.9  , width:widthtimage()*.9 , borderRadius: widthtimage()*.05, backgroundColor:"lightgrey",overflow:"hidden" }}>
    <Image 
    
    objectFit="cover"
    
    height={heightimage()}
    width={widthtimage()}

    
    src={s3rooturl+"/images-prod-a"+item.split(".")[0]+"x800.webp"}
  onError={({ currentTarget }) => {
    currentTarget.onerror = !null; // prevents looping
    currentTarget.srcset="/images/no-image.png";
    currentTarget.alt="no image"
    
  }}
  
  className="d-block w-100"

 ></Image></Carousel.Item>

)
}

const tolocaltime = (d) =>{
  var date = new Date(0);
  console.log(Date.parse(d));
  date.setUTCMilliseconds(Date.parse(d) - (date.getTimezoneOffset()*60*1000 ))
  console.log(date);
  return date
}


const biditem = (item_key,customer_key,bidprice,bid_message) =>{

   

  var formdatas = new FormData();
  formdatas.append("item_key",item_key)
   formdatas.append("customer_key", customer_key)

  formdatas.append("bidprice", bidprice)
  formdatas.append("bid_message", bid_message)
  var urlForm = geturlFormdata("biditem", "create")
  postdata( urlForm.url , "item" , formdatas )
   

  
}

const bookitem = async(item_key,customer_key,lender,bookprice,place,bookfrom,bookto) =>{

   

  var formdatas = new FormData();
  formdatas.append("item_key",item_key)
   formdatas.append("customer_key", customer_key)
   formdatas.append("lender", lender)
  formdatas.append("booking_price", bookprice)
  formdatas.append("place", place)
  formdatas.append("book_to", value[1].getTime())
  formdatas.append("book_from", value[0].getTime())
   
  
  formdatas.append("metadata" , JSON.stringify(convertToJson(itemdata.metadata)) )
   setFetching(true);
  
  var urlForm = geturlFormdata("booking","create",{},{})
  await postdata( urlForm.url , "booking" , formdatas )
  .then((val)=>{ 
    document.getElementById("booking_title").replaceChildren("booking requested");setValue([null,null]);setRequest(false) ;setFetching(false);setOrdered(true)  })
    .catch((e)=>{   
   

  
}
  )

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
      //  
      //  
      //  
        if (mind < dateInterditesRaw[i]){
            //  
            //  
            break
        }
      }
    
    
  const dateInterdites = dateInterditesRaw.map((arrVal) => {
      return arrVal.getTime();});
  
      /*exclude all sunday and use the includes array method to check if the 
      date.getTime() value is 
      in the array dateInterdites */
      // 
      // 
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
      
    const [ login , setLogin ] = useState(false);
  
 console.log(isloaded);
 

 console.log(router.pathname);
 console.log(router.asPath);

return(
    <>
		{isloaded?
 
		<div >
		
    <Dialog
        open={ordered}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
		style={{textAlign:"center"}}
    PaperProps={{style:{minWidth:80+"vw", minHeight:40+"vh"}}}
      >
        <h2>Order Successfully Placed</h2>
      <div className='btn' onClick={()=>{router.push("/orders")}}>go to orders</div>

      <div className='btn' onClick={()=>{router.push("/home")}} >Home</div>

      <div className='btn' onClick={()=> {setOrdered(false)}} >Close</div>
			
      </Dialog>

    <Dialog
        open={false}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
		style={{textAlign:"center"}}
    PaperProps={{style:{minWidth:80+"vw", minHeight:40+"vh"}}}
      >
		  { authContext.isLoggedIn ?
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

    </> }
        </DialogActions>
		</>
           :
           <>
           <div><span onClick={()=>{ storelocal('currentpath',router.asPath) ;router.push('/login')}}>Login</span> to continue </div>
           
           </>

			}
      </Dialog>

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
		<input  type='number' placeholder='your price' onChange={(val)=>{  setBidPrice(val.target.value)}}></input>
        </DialogContent>
        <DialogActions>
          
          <Button  onClick={()=>{
             
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
        <Button onClick={()=>{ }} autoFocus>
           press
          </Button>
		  </>
			}
      </Dialog>

<Dialog
        open={false}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
		style={{textAlign:"center"}}
    PaperProps={{style:{minWidth:80+"vw", minHeight:40+"vh"}}}
      >
		  { authContext.isLoggedIn ?
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

    </> }
        </DialogActions>
		</>
           :
           <>
           <div><span onClick={()=>{ storelocal('currentpath',router.asPath) ;router.push('/login')}}>Login</span> to continue </div>
           
           </>

			}
      </Dialog>
      
<div className={classes.itemcontainer}>


<LocalizationProvider dateAdapter={AdapterDateFns}>
       
       <MobileDateRangePicker
       
       onAccept={()=>{console.log("ok request"); setRequest(true)}}
       allowSameDateSelection={false}
         disablePast
         //disableCloseOnSelect
         startText="Book from"
         endText="Book to"
         value={value}
         onChange={(newValue) => {
      
            
            
             console.log(newValue);
             
             console.log(newValue[0].getTimezoneOffset());
 
             setValue(newValue)
           
         }}
       
         shouldDisableDate={ddate}
         renderInput={(startProps, endProps) => (
 
           <React.Fragment>
             
             { 
             <>
              
              
              <Dialog

              cancel
        open={request}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
		style={{textAlign:"center"}}
    PaperProps={{style:{minWidth:90+"vw", minHeight:40+"vh"}}}
      >
		  { authContext.isLoggedIn ?
		  <>
        <DialogTitle id="alert-dialog-title">
          {itemdata.description}
        </DialogTitle>
		
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{borderBottom:"1px solid lightgray"}}>
           <>{ `${(value[1] != null? (value[1].getDate() - value[0].getDate()):"" )} Days   `  }</>
              { `${(value[0] != null? tolocaltime(value[0]).getDate():"")} ${(value[0] != null?months[value[0].getMonth()]:"")} - ${(value[1] != null?value[1].getDate():"")} ${(value[1] != null?months[value[1].getMonth()]:"")}`  }
              <DialogContentText style={{width:"100%", color:"blue"}} onClick={()=>{ startProps.inputProps.onClick()}} >Change</DialogContentText>
          </DialogContentText >

		<div style={{display:"flex" , flex:1 , padding:10 }} ><div style={{display:"flex", flex:1}}>{itemdata.deno} {itemdata.price} X {`${(value[1] != null? (value[1].getDate() - value[0].getDate()):"" )} Days   `  }</div>
    <div style={{display:"flex", flex:1 , justifyContent:"end"}}>{itemdata.deno} {itemdata.price *(value[1] != null? (value[1].getDate() - value[0].getDate()):0) }</div></div>

    	<div style={{display:"flex" , flex:1 , padding:10 }} ><div style={{display:"flex", flex:1}}>{itemdata.deno} {itemdata.price} X {`${(value[1] != null? (value[1].getDate() - value[0].getDate()):"" )} Days   `  }</div>
    <div style={{display:"flex", flex:1 , justifyContent:"end"}}>{itemdata.deno} {itemdata.price *(value[1] != null? (value[1].getDate() - value[0].getDate()):0) }</div></div>

    	<div style={{display:"flex" , flex:1 , padding:10 }} ><div style={{display:"flex", flex:1}}>{itemdata.deno} {itemdata.price} X {`${(value[1] != null? (value[1].getDate() - value[0].getDate()):"" )} Days   `  }</div>
    <div style={{display:"flex", flex:1 , justifyContent:"end"}}>{itemdata.deno} {itemdata.price *(value[1] != null? (value[1].getDate() - value[0].getDate()):0) }</div></div>
       
    <div style={{display:"flex" , flex:1 , padding:10 }} ><div style={{display:"flex", flex:1}}>{itemdata.deno} {itemdata.price} X {`${(value[1] != null? (value[1].getDate() - value[0].getDate()):"" )} Days   `  }</div>
    <div style={{display:"flex", flex:1 , justifyContent:"end"}}>{itemdata.deno} {itemdata.price *(value[1] != null? (value[1].getDate() - value[0].getDate()):0) }</div></div>
       
    <div style={{display:"flex" , flex:1 , padding:10 }} ><div style={{display:"flex", flex:1}}>{itemdata.deno} {itemdata.price} X {`${(value[1] != null? (value[1].getDate() - value[0].getDate()):"" )} Days   `  }</div>
    <div style={{display:"flex", flex:1 , justifyContent:"end"}}>{itemdata.deno} {itemdata.price *(value[1] != null? (value[1].getDate() - value[0].getDate()):0) }</div></div>
       
    <div style={{display:"flex" , flex:1 , padding:10 }} ><div style={{display:"flex", flex:1}}>{itemdata.deno} {itemdata.price} X {`${(value[1] != null? (value[1].getDate() - value[0].getDate()):"" )} Days   `  }</div>
    <div style={{display:"flex", flex:1 , justifyContent:"end"}}>{itemdata.deno} {itemdata.price *(value[1] != null? (value[1].getDate() - value[0].getDate()):0) }</div></div>
       

        </DialogContent>
        <DialogActions> 

  {fetching?<><div id="booking_title">Booking in Progress</div></>:
    < >
            <Button style={{width:"100%"}} onClick={()=>{  bookitem(itemdata.itemKey,getobjlocal("userdata")[0].userkey,itemdata.customerKey,itemdata.price,itemdata.place, Date.parse(startdate), Date.parse(enddate)) }} autoFocus>Request to Book</Button>
            
              
    </> }
        </DialogActions>
		</>
           :
           <>
           <div><span onClick={()=>{ storelocal('currentpath',router.asPath) ;router.push('/login')}}>Login</span> to continue </div>
           
           </>

			}
      </Dialog>
              </>
              }
            {!request  && <div style={{ zIndex:100000, position:"fixed" , height:15+"vw", bottom:0 , backgroundColor:"white", width:"100vw", display:"flex" , flex:1 , justifyContent:"center", alignItems:"center"}}><div className='btn' style={{backgroundColor:CLR_HEAD , color:"white" , width:"80%" , borderRadius:"15px" }} onClick={()=>{startProps.inputProps.onClick()}}>        Check Availablity         </div></div>
         }
           </React.Fragment>
         
         )}
       />
 
     </LocalizationProvider>

{ isloaded && <Carousel className={classes.carousel} style={{ padding:widthtimage()*.05 ,borderRadius:3+"vw" }} onClick={()=>{}}  wrap={false}>
  
{images(convertToJson(itemdata.metadata).images)}

</Carousel>}

       <div style={{margin:3+"vw" }}>
         
        <div style={{fontSize:10+"vw"}}>{(itemdata.name != undefined ?itemdata.name:"ITEM Name")}</div>

        <div style={{marginTop:3+"vw" , display:"flex", flex:1 , width:"100%" , marginBlock:"2vh"}}>

          
          <div style={{fontWeight:"bold", textAlign:"center",display:"flex",flexDirection:"column" ,border:"1px solid grey" , borderRadius:"3px",marginInline:10+"Vw",padding:1+"vw" , justifyContent:"center" , flex:1}}>
          <div >Daily</div>
          <div style={{fontWeight:"bold",display:"flex",justifyContent:"center" ,flex:1}}>
          <div>{itemdata.deno}</div>
          <div>{itemdata.price}</div>
          </div>
          </div>

          <div style={{fontWeight:"bold", textAlign:"center",display:"flex",flexDirection:"column" ,border:"1px solid grey" , borderRadius:"3px",marginInline:10+"Vw",padding:1+"vw" , justifyContent:"center" , flex:1}}>
          <div >7+ days</div>
          <div style={{fontWeight:"bold",display:"flex",justifyContent:"center" ,flex:1}}>
          <div>{itemdata.deno}</div>
          <div>{itemdata.price}</div>
          </div>
          </div>


        </div>
				 
        <div style={{fontWeight:"bold"}}>Description</div>
         <div>{itemdata.categoryList[0]}</div>
				 <div>{itemdata.description}</div>
				 
         <div style={{fontWeight:"bold"}}>Location</div>
         <div style={{fontSize:8+"vw"}} onClick={()=> navigator.geolocation.getCurrentPosition((d)=>{console.log(d); setCurrentloc([d.coords.latitude,d.coords.longitude])},(e)=>{console.log(e); } ,{frequency:5000,  enableHighAccuracy: true  ,timeout:10000,} )  }  >Set L<FaMapMarkerAlt />cation</div>
 
 {currentloc != null &&  <div style={{width:100+"%" , height:"20vh"}}><MapPage currentloc={currentloc} /></div>}

       <div id="ownerbox" style={{display:"flex" , flexDirection:"column" ,flex:1 }} >
       <div style={{fontWeight:"bold"}}>Owned By</div>
         <div style={{display:"flex" , flex:1 , height:20+"vh"}}>
         <div style={{display:"flex" , flex:1 , height:20+"vh"}}>
         <img src='/images/SMOR-512.png' style={{ height:80+"%" ,objectFit:"contain"}} onClick={()=> {router.reload()}}></img>
         </div>
           <div>
         <div className='btn' style={{display:"flex" , flex:1 }}>ownerName</div>
         <div className='btn'>Typically replies in <span>x time</span></div> 
         </div>
         </div>
         <div  style={{display:"flex" ,  justifyContent:"center" , height:"14vw" ,alignItems:"center" ,border:"1px solid"+CLR_RCARD1 , borderRadius:"10px" }}>Contact</div>
         
         </div>
        
        </div>

        
         

        </div>
         

        <SimilarItems />
        <ItemsbyOwner itemownerkey={itemdata.customerKey}/>
        <Footer />

      	
		</div>
    :<></>}

    </>
	);



}

const taskmap = new Map();

function SimilarItems(props){

    const [loaded,setLoaded] = React.useState(false); 
    
    const [filter, setFilter] = useState([]);
  const [filteropen , setFilteropen] = useState(false);
  

    const [tasklist,setTasklist] = React.useState([]);
    const classes = useStyles();
    const [hidden, setHidden] = React.useState();


      const [xtime , setXtime] = useState(999999999999);

    // before call the request check if there is some filters or not in the 
       useEffect (()=>{
      //   const handleRouteChange = () => {
      //     console.log("router event");
      //     setTasklist([])
          
      // }
      // router.events.on('routeChangeStart', handleRouteChange)
     
       if (!loaded){
        // console.log(getlocal("userdata"));
        // console.log(getlocal("access_token"));
        // console.log(getlocal("refresh_token"));
         if(getlocal("userdata") != undefined){
          //  console.log(getlocal("userdata"));
          //  console.log(getlocal("access_token"));
          //  console.log(getlocal("refresh_token"));
      
           getuserdata("email",getobjlocal("userdata")[0]["email"]) 
       }else{
        console.log("no user LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
       }
      
        loadmore(filter);
       setLoaded(true)
       taskmap.clear()

       }

       window.onpopstate = ()=> {
       
          // console.log("fuck me 2 times");
        //   router.push()
        
      
        }
     
    });

    const listInnerRef = React.useRef();

    const loadmore =  (f , applyfill ) =>{
      //call the function to update with the latest tasks
   /// sorts - price ++ , price -- , 
      var urlForm = geturlFormdata("item", "getform" ,{ "gettype": "cp" , "category":( getlocal("category") != null ? getlocal("category").split(",")[0] : "clothes" ) , "place" : ( getlocal("place") != null ? getlocal("place").split(",")[0] : "jharkhand" ) , "xtime": xtime} , {} )
      var url = urlForm.url + (getlocal("sortorder") != null ? `&sortby=${sortmap[getlocal("sortorder")]}`:"")
       //var url = `http://127.0.0.1:8082/item/getform?place=bokaro&xtime=${xtime}&item=${getlocal("category")}`
      var formdata = new FormData();
      //  var formdata = makeformdata(navsdataclothes)
      formdata.append("category|array|&&", getlocal("category") )

      if ( applyfill != undefined ){
        console.log(")))))))))))))))))))))))))))))))))))))))))))))))))))))))))))");
        formdata.set("created_at|bigint|<",xtime)
        // formdata.set("price")
      }
      
      
      

      callwithcache(getdata_post, url, "items",formdata).then((value) =>{
        // setLoaded(true);
         
        //taskmap.clear() //for clearing every thing
        console.log(xtime,tasklist , taskmap);
        setXtime(getXtime(value))
        setValuesfrommap(value,loadmore ,setTasklist , taskmap , "itemId")}).catch((err) =>{
           console.log(err);
        }
        )
        
  }

  const getXtime = (list) =>{

    var xtimes = 999999999999
    if (list.length == 0){
      return 0
    }
    list.forEach(element => {
      if  ( element['createdAt'] < xtimes){
          xtimes = element['createdAt']
      } 
    
    });
    return xtimes

  }
      const wishdata = (getlocal("userdata") != null ? convertToJson(getobjlocal("userdata")[0]["metadata"] )["wishdata"]: [] )
      console.log(wishdata);
     
      

      const filllatest =  tasklist.map( (item) => <Itemcard key={item.itemId} fav={(wishdata.includes(item.itemKey))} name={item.itemId} itemobj={item} description={item.description} place={item.place} price={item.price} scheduled_at={item.scheduled_at} maplink="https://www.google.com/maps?q=23,88" ></Itemcard> )

         
	return(
    <>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center", fontSizeAdjust:"auto" , fontSize:"8vw", paddingBlock:2+"vh"}}>Similar Items</div>
             { tasklist.length > 0 ?
                 <div ref={listInnerRef} style={{width:"100vw",display:"flex", overflow:"scroll"}}  id="itemswin" onScroll={() => {}} >  {filllatest} {xtime == 0 && <></> }</div> :<div style={{position:"fixed",bottom:0}}></div>}
      
             </>
	);


}

export function ItemsbyOwner(props){

  const [loaded,setLoaded] = React.useState(false); 
  
  const [filter, setFilter] = useState([]);
const [filteropen , setFilteropen] = useState(false);


  const [tasklist,setTasklist] = React.useState([]);
  const classes = useStyles();
  const [hidden, setHidden] = React.useState();


    const [xtime , setXtime] = useState(999999999999);

  // before call the request check if there is some filters or not in the 
     useEffect (()=>{
    //   const handleRouteChange = () => {
    //     console.log("router event");
    //     setTasklist([])
        
    // }
    // router.events.on('routeChangeStart', handleRouteChange)
   
     if (!loaded){
      // console.log(getlocal("userdata"));
      // console.log(getlocal("access_token"));
      // console.log(getlocal("refresh_token"));
       if(getlocal("userdata") != undefined){
        //  console.log(getlocal("userdata"));
        //  console.log(getlocal("access_token"));
        //  console.log(getlocal("refresh_token"));
    
         getuserdata("email",getobjlocal("userdata")[0]["email"]) 
     }else{
      console.log("no user LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
     }
    
      loadmore(filter);
     setLoaded(true)
     taskmap.clear()

     }

     window.onpopstate = ()=> {
     
        // console.log("fuck me 2 times");
      //   router.push()
      
    
      }
   
  });

  const listInnerRef = React.useRef();

  const loadmore =  (f , applyfill ) =>{
    //call the function to update with the latest tasks
 /// sorts - price ++ , price -- , 
    var urlForm = geturlFormdata("item", "getform" ,{ "gettype": "cp" , "category":( getlocal("category") != null ? getlocal("category").split(",")[0] : "clothes" ) , "place" : ( getlocal("place") != null ? getlocal("place").split(",")[0] : "jharkhand" ) , "xtime": xtime} , {} )
    var url = urlForm.url + (getlocal("sortorder") != null ? `&sortby=${sortmap[getlocal("sortorder")]}`:"")
     //var url = `http://127.0.0.1:8082/item/getform?place=bokaro&xtime=${xtime}&item=${getlocal("category")}`
    var formdata = new FormData();
    //  var formdata = makeformdata(navsdataclothes)
    // formdata.append("category|array|&&", getlocal("category") )
    formdata.append("customer_key|bigint|=",props.itemownerkey)

    if ( applyfill != undefined ){
      console.log(")))))))))))))))))))))))))))))))))))))))))))))))))))))))))))");
      formdata.set("created_at|bigint|<",xtime)
      // formdata.set("price")
    }
    
    
    

    callwithcache(getdata_post, url, "items",formdata).then((value) =>{
      // setLoaded(true);
       
      //taskmap.clear() //for clearing every thing
      console.log(xtime,tasklist , taskmap);
      setXtime(getXtime(value))
      setValuesfrommap(value,loadmore ,setTasklist , taskmap , "itemId")}).catch((err) =>{
         console.log(err);
      }
      )
      
}

const getXtime = (list) =>{

  var xtimes = 999999999999
  if (list.length == 0){
    return 0
  }
  list.forEach(element => {
    if  ( element['createdAt'] < xtimes){
        xtimes = element['createdAt']
    } 
  
  });
  return xtimes

}
    const wishdata = (getlocal("userdata") != null ? convertToJson(getobjlocal("userdata")[0]["metadata"] )["wishdata"]: [] )
    console.log(wishdata);
   
    

    const filllatest =  tasklist.map( (item) => <Itemcard key={item.itemId} fav={(wishdata.includes(item.itemKey))} name={item.itemId} itemobj={item} description={item.description} place={item.place} price={item.price} scheduled_at={item.scheduled_at} maplink="https://www.google.com/maps?q=23,88" ></Itemcard> )

       
return(
  <>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center", fontSizeAdjust:"3", fontSize:"7vw",paddingBlock:2+"vh"}}>More By Same Owner</div>
           { tasklist.length > 0 ?
             <>{ !props.percustomer ? <div ref={listInnerRef} style={{width:"100vw",display:"flex", overflow:"scroll"}}  id="itemswin" onScroll={() => {}} >  {filllatest} {xtime == 0 && <></> }</div>
             :  <div ref={listInnerRef} className={classes.itemsbucket} id="itemswin" onScroll={() => {}} >  {filllatest} </div>  }</> :<div style={{position:"fixed",bottom:0}}></div>} 
    
           </>
);


}









