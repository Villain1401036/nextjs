
import React, { useEffect, useState } from 'react'


import { getdata } from '../../networking/getdata';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Taskcard from '../taskcard';
import { geturlFormdata } from '../../constants';


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

export default function Histwork(props){
  
  const [loaded,setLoaded] = React.useState(false); 

    const [tasklist,setTasklist] = React.useState([]);
    
  

  

    useEffect (()=>{
      if (!loaded){
      refreshongoing();
      //setVal(opentasklist);
      }
   });


   const refreshongoing =  () =>{ 
       //call the function to update with the latest tasks
       count = count + 1;
        
       var urlForm = geturlFormdata("work", "get",{"workids":521} ,{})

    
      getdata(urlForm.url,"works").then((value) =>{ 
           
        setLoaded(true) ;
        setVal(value);}).catch((err) =>{
           
        }
        )
   }

   
   const maping =(list) =>{

    list.forEach(element => { taskmap.set(element.workId , element)});
    tlist = []
    //converting the map into a list 
    taskmap.forEach( (value) => { tlist.push(value) } )
    // ftest();
     
  }

  //const ftest = () => taskmap.forEach( (value) => { tlist.push(value) } )


   const setVal = (val) =>{ 
     try{
       opentasklist = opentasklist.concat(...val) ; maping(opentasklist); setTasklist(tlist);  
     }
     catch(e){
        
     }
      } 
  
      const filllatest =  tasklist.map( (item) =>  <Taskcard key={item.taskId} name={item.taskId} description={item.description} place={item.place} price={item.price} scheduled_at={item.scheduled_at} maplink="https://www.google.com/maps?q=23,88"></Taskcard>  )
   

    const classes = useStyles();

  const [isloaded,setIsLoaded] = React.useState(true);

	return(
		<div style={{ backgroundColor:'red'}}>
                
             <Button onClick={async()=>{refreshongoing()}} title="history"  >History work</Button> 
             <div style={{display: "grid"}}>
             {filllatest}
             </div>
             </div>
	);

}
