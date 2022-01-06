
import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { getdata } from '../../networking/getdata';
import { Button } from '@material-ui/core';
import Taskcard from '../taskcard';
import { MapSharp } from '@material-ui/icons';
import Addresscard from '../addresscard';


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
	profilepic:{
		height:50+"vw",
		width:50+"vw",
		objectFit:"cover",
		borderRadius:25+"vw",
		borderColor:"black"	,
		borderWidth:3,
		borderStyle:"solid"
	},
	proname:{
		fontSize:5+"vw",
		fontWeight:"bold"

	}
}));

const taskmap = new Map();
const openaddresslist = [];
const tlist =[];
var count = 0;
//this will be a container for all the recent work that is going om
export default function Profilesummary(props){

    const [loaded,setLoaded] = React.useState(false); 
    
    const [addresslist,setAddresslist] = React.useState([]);
    const classes = useStyles();

    const [edit , setEdit] = React.useState(true);
    
  

	return(

		<div style={{alignSelf:"center" , textAlign:"center" }}>
			<div><Button onClick={()=>{ console.log(edit); ;  setEdit(!edit)}}  >edit</Button> </div>
                <img src = {props.profilepic} className={classes.profilepic}/>
                <div>
				
                    {edit?<div style={{width:100+"vw"   }}><span className={classes.proname} >{props.name}</span></div>:<input inputMode="numeric"></input>}
                    
                    </div>
                   
                    {edit?<div style={{width:100+"vw"  }}><span className={classes.proname} >contact no. -{props.contact}</span></div>:<input inputMode="numeric"></input>}
					{edit?<div style={{width:100+"vw" , backgroundColor:"green"  }}><span className={classes.proname} >{props.description}</span></div>:<input inputMode="numeric"></input>}
             <div>
  
             </div>
             </div>

	);

}
 