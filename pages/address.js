import Head from 'next/head'
import React from 'react'
import ButtonAppBar from '../components/headbar'
import Footer from '../components/footer'
import FilterTabbar from '../components/filtertabbar'




import { Shopname } from '../constants'
import { makeStyles } from '@material-ui/core/styles';
import Addresses from '../components/containers/addresses'


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




export default function Addresspage(props){



const classes = useStyles();

  const [isloaded,setIsLoaded] = React.useState(true);

	return(
		<div>
		<Head>
			<title>Spook</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<ButtonAppBar itemName={Shopname}/>
        
			
           
			 <div className={classes.contentArea}>
				{/***here we will have a the addresses for the  */}
			  

			 <Addresses />

			 

			 </div>

       
		</div>
	);



}
