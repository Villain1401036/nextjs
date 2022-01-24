
import React, { useEffect, useState } from 'react'


import { getdata } from '../../networking/getdata';
import { Button, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Taskcard from '../taskcard';
import { Refresh } from '@material-ui/icons';
import { callwithcache, geturlFormdata, ongoingwork, setValuesfrommap } from '../../constants';
import { CLR_RCARD2 } from '../../themes';
import Workcard from '../workcard';


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


export default function Ongoingwork(props){
  
  const [loaded,setLoaded] = React.useState(false); 

    const [worklist,setWorklist] = React.useState([]);
    
    const [worker , setWorker] = React.useState(1);

    useEffect (()=>{
      if (!loaded){
      refreshongoing();
      //setVal(openworklist);
      }
   });

   console.log("ongoing is updated");

   const refreshongoing =  () =>{ 
       //call the function to update with the latest tasks
       var urlForm = geturlFormdata("work" , "get" , {"worker_key":worker} , {}) //localStorage.getItem("customerid") }  )
       var url = urlForm.url

       callwithcache(getdata, url, "works").then((value) =>{
         setLoaded(true);
         setValuesfrommap(value,refreshongoing ,setWorklist , taskmap ,"workId" )}).catch((err) =>{
           console.log(err);
         }
         )
   }



  const filllatest =  worklist.map( (item) =>  <Workcard key={item.workId} name={item.workId} workKey={item.workKey} description={item.description}  maplink="https://www.google.com/maps?q=23,88"   workobj={item} ></Workcard>  )
   
  const classes = useStyles();

  const [isloaded,setIsLoaded] = React.useState(true);

	return(
		<div style={{backgroundColor:CLR_RCARD2 }} >
                
             <Button onClick={async()=>{refreshongoing()}} title="ongoingWork" style={{alignItems:"center"}} >
               <div > Ongoing Works</div>
               <Refresh />
             </Button> 
             <div style={{display: "grid" , gridTemplateColumns: "auto" , padding: 5+"vw" ,paddingTop:0}}>
             {filllatest}
             </div>
             </div>
	);

}


