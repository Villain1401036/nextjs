
import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { getdata } from '../../networking/getdata';
import { Button } from '@material-ui/core';
import Taskcard from '../taskcard';
import { MapSharp } from '@material-ui/icons';
import Addresscard from '../addresscard';
import { geturl } from '../../constants';


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
const openaddresslist = [];
const tlist =[]
var count = 0;
//this will be a container for all the recent work that is going om
export default function Addresses(props){

    const [loaded,setLoaded] = React.useState(false); 
   
    const [addresslist,setAddresslist] = React.useState([]);
    const classes = useStyles();
    
    var url = geturl("address","get", {"customerid":"63"}) //address links
 
    useEffect (()=>{
       if (!loaded){
       refreshlatest();
       //setVal(openaddresslist);
       }
    });


    const refreshlatest =  () =>{
        //call the function to update with the latest tasks 
        count = count + 1;
        console.log(count);
       getdata(url).then((value) =>{ console.log( value );  setLoaded(true) ;setVal(value);})
       
    }

    
    const maping =(list) =>{

      list.forEach(element => {
        taskmap.set(element.taskId , element)
      });
      tlist = []
      ftest();
      console.log(tlist);
    }
       

    const setVal = (val) =>{ openaddresslist = openaddresslist.concat(...val) ; console.log(openaddresslist); ; maping(openaddresslist); setAddresslist(tlist);console.log(addresslist);} 

   
   const ftest = () => taskmap.forEach( (value) => { tlist.push(value) })
   
  const filllatest =  addresslist.map( (item) =>  <Addresscard key={item.taskId} address={item.taskId} ></Addresscard> )
  const [isloaded,setIsLoaded] = React.useState(true);

	return(
		<div style={{ backgroundColor:'red'}}>
                <Button onClick={async()=>{refreshlatest()}} title="asdasd" >ASFADS</Button>
             <div>
             {filllatest}
             </div>
             </div>
	);
}
 