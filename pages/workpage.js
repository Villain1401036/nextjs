import Head from 'next/head'
import React, { useState } from 'react'
import ButtonAppBar from '../components/headbar'


import { convertToJson, getworkonpage, s3rooturl, Shopname, workstatus_dict } from '../constants'
import { makeStyles } from '@material-ui/core/styles';


import { useRouter } from 'next/router'


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

//this page will contain info if there is some issue with the work 
// button for updating the status 
// button for changing the time 
//rasing the ticket for the work 
//all things that is done 
//all chats will be here only 
//progress of the work 
//any pictures related to the work 



export default function Workpage(props){

const [workdata , setWorkdata] = useState({});
const classes = useStyles();
const router = useRouter();
  const [isloaded,setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    // Update the document title using the browser API
	if (!isloaded){
    setWorkdata(getworkonpage());
	setIsLoaded(true)
}
  });
   
   
   
   const handleChangestatus = (status) =>{
		//confirm to change the status to done  with a popup
		 

	}

	return(
		<div>
		<Head>
			<title>Spook</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<ButtonAppBar itemName={Shopname}/>

			
			 
				 {isloaded && <img src={s3rooturl + convertToJson(workdata.metadata).images[0]} style={{width:100+"vw", objectFit:"contain"}}></img> }
				 <div>{workdata.description}</div>

		     <button onClick={() => {handleChangestatus()} } >{workstatus_dict[workdata.workStatus]}</button>

		</div>
	);



}
