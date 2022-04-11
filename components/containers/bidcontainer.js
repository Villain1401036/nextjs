
import React, { useEffect, useState } from 'react'


import { getdata } from '../../networking/getdata';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Taskcard from '../taskcard';
import { callwithcache, geturlFormdata, setValuesfrommap } from '../../constants';
import Bidcard from '../bidcard';


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

export default function Bidcontainer(props){
  
  const [loaded,setLoaded] = React.useState(false); 

    const [bidlist,setBidlist] = React.useState([]);
    

  

    useEffect (()=>{
      if (!loaded){
      refreshongoing();
      }
   });


   const refreshongoing =  () =>{ 
    //call the function to update with the latest tasks
    var urlForm = geturlFormdata("bid" , "get" , {"task_key":props.taskKey , "gettype":"task"} , {}) //localStorage.getItem("customerid") }  )
    var url = urlForm.url

    callwithcache(getdata, url, "bids").then((value) =>{
      taskmap.clear();
      setLoaded(true);
      setValuesfrommap(value, refreshongoing ,setBidlist , taskmap ,"bidId" )}).catch((err) =>{
         
      }
      )
}

   


  //const ftest = () => taskmap.forEach( (value) => { tlist.push(value) } )

      const filllatest =  bidlist.map( (item) =>  <Bidcard key={item.bidKey} name={item.bidId} bidprice={item.bidprice} workerKey={item.workerKey} taskobj={props.taskobj} maplink="https://www.google.com/maps?q=23,88"></Bidcard>  )
   

    const classes = useStyles();

  const [isloaded,setIsLoaded] = React.useState(true);

	return(
		<div style={{ backgroundColor:'red'}}>
                
             <Button onClick={async()=>{refreshongoing()}} title="asdasd"  >refresh bids</Button> 
             <div style={{minWidth: 100+"%" , display: "grid"}}>
             {filllatest}
             </div>
             </div>
	);

}
