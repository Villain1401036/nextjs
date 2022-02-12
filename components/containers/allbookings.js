
import React, { useEffect, useState } from 'react'


import { getdata } from '../../networking/getdata';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Taskcard from '../taskcard';
import { callwithcache, geturlFormdata, setValuesfrommap } from '../../constants';
import Bidcard from '../bidcard';
import Bookingcard from '../bookingcard';


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
    

  

    useEffect (()=>{
      if (!loaded){
      refreshongoing();
      }
   });


   const refreshongoing =  () =>{ 
    //call the function to update with the latest tasks
    var urlForm = geturlFormdata("booking" , "get" , {"customer_key":63 , "gettype":"customer"} , {}) //localStorage.getItem("customerid") }  )
    var url = urlForm.url

    callwithcache(getdata, url, "bookings").then((value) =>{
      taskmap.clear();
      setLoaded(true);
      setValuesfrommap(value, refreshongoing ,setBookinglist , taskmap ,"bookingId" )}).catch((err) =>{
        console.log(err);
      }
      )
}

   


  //const ftest = () => taskmap.forEach( (value) => { tlist.push(value) } )
    const tolocaltime = (epoch) =>{
        var date = new Date(0);
        date.setUTCMilliseconds(epoch)
         console.log();
        return date
    }

      const filllatest =  bookinglist.map( (item) =>  <Bookingcard key={item.bookingId} name={item.bookingId} status={item.status} book_from={ tolocaltime(item.bookFrom)} book_to={   tolocaltime(item.bookTo   )} price={item.bookingPrice} customerKey={item.customerKey} bookingobj={item} maplink="https://www.google.com/maps?q=23,88"></Bookingcard>  )
   

    const classes = useStyles();

  const [isloaded,setIsLoaded] = React.useState(true);

	return(
		<div style={{ backgroundColor:'red'}}>
                
             <Button onClick={async()=>{refreshongoing()}} title="asdasd"  >refresh bookings</Button> 
             <div style={{minWidth: 100+"%" , display: "grid"}}>
             {filllatest}
             </div>
             </div>
	);

}
