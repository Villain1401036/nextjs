
import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { getdata } from '../../networking/getdata';
import { Button } from '@material-ui/core';
import Taskcard from '../taskcard';
import { MapSharp } from '@material-ui/icons';
import Addresscard from '../addresscard';
import { useRouter } from 'next/router';


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
const tlist =[];
var count = 0;


//******************************************************************************************* */
//This will be for the information about all the data that is coming to here being processed 
//all statistics will be seen here
//******************************************************************************************* */

export default function Welcomecontainer(props){

    const [loaded,setLoaded] = React.useState(false); 
   
    const [addresslist,setAddresslist] = React.useState([]);
    const classes = useStyles();
    
    const [edit , setEdit] = React.useState(true);
    
    const router = useRouter();
    var url = "http://localhost:9082/task/get?taskid=t6~t8~t7"  //address links
 
    useEffect (()=>{
       if (!loaded){

       }
    });


	return(

		<div style={{textAlign:"center"}}>
      
             
              <Button onClick={()=>{router.push("/login")}}>Login</Button>
                    
            
             <Button onClick={()=>{router.push("/signup")}}>Sign Up</Button>
             </div>

	);

}
 