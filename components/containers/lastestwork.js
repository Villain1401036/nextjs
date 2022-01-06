
import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { getdata } from '../../networking/getdata';
import { Button } from '@material-ui/core';
import Taskcard from '../taskcard';
import { MapSharp, Refresh } from '@material-ui/icons';
import { latestworkobj } from '../../constants';


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
export default function Latestwork(props){

    const [loaded,setLoaded] = React.useState(false); 
   
    const [tasklist,setTasklist] = React.useState([]);
    const classes = useStyles();
   //parameters to be passed in to get things filtered  
    var place = latestworkobj.place
    var lat = latestworkobj.lat
    var lon = latestworkobj.lon
    var distance = latestworkobj.distance
    var tags = latestworkobj.tags
    var category = latestworkobj.category
    var price = latestworkobj.price
    
    var url = `http://localhost:9082/task/get?place=${place}&lat=${lat}&lon=${lon}&distance=${distance}&tags=${tags}&category=${category}&price=${price}`
 
    useEffect (()=>{
       if (!loaded){
       refreshlatest();
       //setVal(opentasklist);
       }
    });
    
    console.log("latestwork is updated");


    const refreshlatest =  () =>{ 
        //call the function to update with the latest tasks


        count = count + 1;
        console.log(count);
       getdata(url,"tasks").then((value) =>{
          
        console.log(  "then" );
        setLoaded(true) ;
        setVal(value,refreshlatest);
      
      }).catch((err) =>{
        console.log(err);
      })
       
    }

    
    const maping =(list) =>{

      list.forEach(element => {
        taskmap.set(element.taskId , element)
      });
      tlist = []
      ftest();
      console.log(tlist);
    }
       

    const setVal = (val, func) =>{
      try{
       opentasklist = opentasklist.concat(...val) ; console.log("opentasklist");  maping(opentasklist); setTasklist(tlist);console.log(tasklist);
      }
      catch (e){
        console.log(e);
       func();

      }
      } 

   
   const ftest = () => taskmap.forEach( (value) => { tlist.push(value) })
   
  const filllatest =  tasklist.map( (item) =>  <Taskcard key={item.taskId} name={item.taskId} description={item.description} place={item.place} price={item.price} scheduled_at={item.scheduled_at} maplink="https://www.google.com/maps?q=23,88"></Taskcard>  )
    

  const [isloaded,setIsLoaded] = React.useState(true);

	return(
		<div style={{ backgroundColor:'lightpink'}}>
                
                <Button onClick={async()=>{refreshlatest()}} title="latesttask" style={{alignItems:"center"}} >
               <div >LATEST TASKS</div>
               <Refresh  />
             </Button>              <div>
             {filllatest}
             </div>
             </div>
	);

}
 