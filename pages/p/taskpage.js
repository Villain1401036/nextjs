import Head from 'next/head'
import React, { useState } from 'react'
import ButtonAppBar from '../../components/headbar'


import { convertToJson, gettaskonpage, s3rooturl, Shopname } from '../../constants'
import { makeStyles } from '@material-ui/core/styles';


import { useRouter } from 'next/router'
import Bidcontainer from '../../components/containers/bidcontainer';


const useStyles = makeStyles((theme) => ({
  root: {
		margin:"auto",
		

    '& > *': {
      margin: theme.spacing(1),
    },
	},
	contentArea:{
		
	
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




export default function Taskpage(props){

const [taskdata , setTaskdata] = useState({});
const classes = useStyles();
const router = useRouter();
  const [isloaded,setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    // Update the document title using the browser API
	if (!isloaded){
		setTaskdata(gettaskonpage());
		setIsLoaded(true);
	}
    

  });
   
   
   
	return(
<>
		{isloaded?
		<div>
		<Head>
			<title>Spook</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<ButtonAppBar itemName={Shopname}/>

			 <div className={classes.contentArea}>
			 <div className={classes.root} >
				<div style={{ minHeight:40+"vh" }}>
					<img style={{width:90+"vw"}} src={s3rooturl + convertToJson(taskdata.metadata).images[0]}></img>
					<div>{taskdata.description}</div>
				</div>
				 
				 
				{ isloaded && <Bidcontainer taskKey={taskdata.taskKey} taskobj={taskdata}/> }
			 </div>

			 </div>

        
		</div>
		:<></>}</>
	);



}
