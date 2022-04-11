
import React, { useEffect, useState } from 'react'


import { getdata } from '../../networking/getdata';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Taskcard from '../taskcard';
import { unix } from 'dayjs';
import { cachexpire, callwithcache, geturlFormdata, setValuesfrommap } from '../../constants';
import { cache } from '../../cache';




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






//this will be a container for all the recent work that is going om

//const cache = new NodeCache({  stdTTL: 5 , checkperiod:5 } );



export default function Allordercontainer(props){

    const taskmap = new Map();

    const classes = useStyles();

    const [loaded,setLoaded] = React.useState(false);

    const [tasklist,setTasklist] = React.useState([]);
    
    var urlForm = geturlFormdata("task","get",  {"customerid":63 }) //localStorage.getItem("customerid") }  )
    var url = urlForm.url

   
    useEffect (()=>{
      if (!loaded){
      refreshongoing(); 
      }
   });




   const refreshongoing =  async () =>{
       //call the function to update with the latest tasks

      callwithcache(getdata, url, "tasks").then((value) =>{

        setLoaded(true);
        setValuesfrommap(value,refreshongoing ,setTasklist , taskmap ,"taskId")}).catch((err) =>{
           
        }
        )
      
   }

  
  const filllatest =  tasklist.map( (item) =>  <Taskcard key={item.taskId} name={item.taskId} description={item.description} place={item.place} price={item.price} scheduled_at={item.scheduled_at} maplink="https://www.google.com/maps?q=23,88"></Taskcard>  )
   


	return(
		<div style={{ backgroundColor:'red'}}>
                
             <Button onClick={async()=>{refreshongoing()}} title="asdasd"  >All Work Container</Button> 
             <div>
             {filllatest}
             </div>
             </div>
	);

}
