
import React, { useEffect, useState } from 'react'


import { getdata } from '../../networking/getdata';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Taskcard from '../taskcard';
import { unix } from 'dayjs';
import { geturlFormdata } from '../../constants';
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


const taskmap = new Map();
const opentasklist = [];
const tlist =[]
var count = 0;
//this will be a container for all the recent work that is going om





//const cache = new NodeCache({  stdTTL: 5 , checkperiod:5 } );



export default function Allordercontainer(props){

 console.log( Date.now() );

  const [loaded,setLoaded] = React.useState(false); 

    const [tasklist,setTasklist] = React.useState([]);
    
    var urlForm = geturlFormdata("task","get",  {"customerid":63}  )

    var url = urlForm.url

    console.log( cache.get(url));
    //cache.del(url)


    useEffect (()=>{
      if (!loaded){
      refreshongoing(); 
      //setVal(opentasklist);
      }
   });

    const check = async (func, url) =>{
        if (cache.get(url) && cache.get(url).expire > Date.now() ){
          return cache.get(url).data
        }
        console.log("http--------------------------------------------------------------------------------------------------------------------");
        cache.del(url)
       return func(url)
    }

   const refreshongoing =  async () =>{ 
       //call the function to update with the latest tasks
       count = count + 1;
       console.log(count);
     
      //getdata(url)
      check(getdata, url).then((value) =>{
        
       // console.log( value ); 
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
  
      const filllatest =  tasklist.map( (item) =>  <Taskcard key={item.taskId} name={item.taskId} description={item.description} place={item.place} price={item.price} scheduled_at={item.scheduled_at} maplink="https://www.google.com/maps?q=23,88"></Taskcard>  )
   

    const classes = useStyles();

  const [isloaded,setIsLoaded] = React.useState(true);

	return(
		<div style={{ backgroundColor:'red'}}>
                
             <Button onClick={async()=>{refreshongoing()}} title="asdasd"  >All Work Container</Button> 
             <div>
             {filllatest}
             </div>
             </div>
	);

}
