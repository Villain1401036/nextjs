
import React, { useEffect, useState } from 'react'


import { getdata } from '../../networking/getdata';
import { Button, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Taskcard from '../taskcard';
import { Refresh } from '@material-ui/icons';
import { ongoingwork } from '../../constants';


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

export default function Ongoingwork(props){
  
  const [loaded,setLoaded] = React.useState(false); 

    const [tasklist,setTasklist] = React.useState([]);
    
    var url = "http://localhost:9082/task/get?taskid="+ ongoingwork   //64bokar7~64bokar7s~64bokar7sxzc";

  

    useEffect (()=>{
      if (!loaded){
      refreshongoing();
      //setVal(opentasklist);
      }
   });


   const refreshongoing =  () =>{ 
       //call the function to update with the latest tasks
       count = count + 1;
       console.log(count);
      getdata(url).then((value) =>{ 
        console.log( value );  
        setLoaded(true) ;
        setVal(value);}).catch((err) =>{
          console.log(err);
        }
        )
      
   }

   
   const maping =(list) =>{

    list.forEach(element => { taskmap.set(element.taskId , element)});
    tlist = []
    //converting the map into a list 
    taskmap.forEach( (value) => { tlist.push(value) } )
    // ftest();
    console.log(tlist);
  }

  //const ftest = () => taskmap.forEach( (value) => { tlist.push(value) } )


   const setVal = (val) =>{ 
     try{
       opentasklist = opentasklist.concat(...val) ; maping(opentasklist); setTasklist(tlist); console.log(tasklist);
     }
     catch(e){
       console.log(e);
     }
      } 
  
      const filllatest =  tasklist.map( (item) =>  <Taskcard key={item.taskId} name={item.taskId} taskKey={item.taskKey} description={item.description} place={item.place} price={item.price} scheduled_at={item.scheduled_at} maplink="https://www.google.com/maps?q=23,88"></Taskcard>  )
   

    const classes = useStyles();

  const [isloaded,setIsLoaded] = React.useState(true);

	return(
		<div style={{backgroundColor:"lightgrey" , alignItems:"center"}} >
                
             <Button onClick={async()=>{refreshongoing()}} title="ongoingTask" style={{alignItems:"center"}} >
               <div > Ongoing Tasks</div>
               <Refresh />
             </Button> 
             <div style={{display: "grid" , gridTemplateColumns: "auto" , padding: 5+"vw" ,paddingTop:0}}>
             {filllatest}
             </div>
             </div>
	);

}
