import Head from 'next/head'
import React, { useState } from 'react'
import ButtonAppBar from './headbar'


import { convertToJson, getitemonpage, s3rooturl, Shopname } from '../constants'
import { makeStyles } from '@material-ui/core/styles';


import { useRouter } from 'next/router'


const useStyles = makeStyles((theme) => ({
  root: {
		margin:"auto",
		
    display: 'grid',
		gridTemplateColumns:"auto auto auto",

    '& > *': {
      margin: theme.spacing(0),
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

//this page will contain info if there is some issue with the work 
// button for updating the status 
// button for changing the time 
//rasing the ticket for the work 
//all things that is done 
//all chats will be here only 
//progress of the work 
//any pictures related to the work 



export default function Itemcontainer(props){

const [itemdata , setItemdata] = useState({});
const classes = useStyles();
const router = useRouter();
  const [isloaded,setIsloaded] = React.useState(false);
  React.useEffect(() => {
    // Update the document title using the browser API
    if ( !isloaded){
		console.log(getitemonpage());
        setItemdata(getitemonpage());
		
        setIsloaded(true);

    }
     
    
  });
   
  
   
   

	return(
		
		<div>

                 { isloaded && <img src={ s3rooturl+convertToJson(itemdata.metadata).images[0]} style={{width:100+"vw" , objectFit:"contain" }} ></img>}
				 <div>{itemdata.description}</div>
				 <button onClick={()=>{ open(convertToJson(itemdata.metadata).buylink) }} >buy here</button>
				 <div>{itemdata.price}</div>
				 <div>{itemdata.negotiable?<>it's negotiable , Place your bid</>:<>Sorry the price is not negotiable</>}</div>

				 

		</div>
	);



}






