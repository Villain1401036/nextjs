import Head from 'next/head'
import React , {useContext, useEffect, useState} from 'react'
import ButtonAppBar from '../../components/headbar'

import { onRefresh, Shopname, user } from '../../constants'
import { fade, makeStyles  } from '@material-ui/core/styles';
import Profilesummary from '../../components/containers/profilesummary'
import { useRouter } from 'next/router'
import { AuthContext } from '../../context'
import Logincontainer from '../../components/containers/logincontainer'
import { Button } from '@material-ui/core';
import { InputBase } from '@mui/material';
import { display } from '@mui/system';
import { CLR_HEAD, CLR_RCARD1 } from '../../themes';

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
    search: {
        position: 'relative',
        borderRadius: 4,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%' ,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
       searchIcon: {
       padding: theme.spacing(0, 2),
       height: '100%',
       
       pointerEvents: 'none',
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center' ,
     },
     inputRoot:{
         backgroundColor:"white",
         flex:1,
         display:"flex",
         flexDirection:"row",
         width:98+"vw",
         margin:1+"vw",
         borderRadius:1+"vw",
         borderColor:CLR_RCARD1,
         borderWidth:1,
         borderStyle:"solid",
         paddingLeft:10


     }
}));






export default function SearchPage(props){

const classes = useStyles();
const [profile , setProfile] = React.useState();
const [isloaded,setIsLoaded] = React.useState(false);
const [searchtags ,setSearchtags] = useState([]);


const router = new useRouter();



useEffect (()=>{
	if (!isloaded){
		
	}
	
 }); 

const authContext = useContext(AuthContext);
 const stagscomp = searchtags.map(item =><BigButton name={item}/>)

onRefresh(authContext);



	return(

<>
{ authContext.isLoggedIn && 
  (
	<div>
	<Head>
		<title>Spook</title>
		<link rel="icon" href="/favicon.ico" />
	</Head>



     <div className={classes.search}>
					
					 <InputBase
						 placeholder="Search items…"
						 classes={{
							 root: classes.inputRoot,
							 input: classes.inputInput,
						 }}
						 inputProps={{ 'aria-label': 'search' }}
					 />
           </div>

           
           {stagscomp}
	
     

  
	</div>
)
}

</>
	);

}



function BigButton(props){
	return(
<div style={{width:100+"vw",fontSize:5+"vw" , margin:2+"vw"  }} onClick={props.onClick} >{props.name}</div>
	);
} 


