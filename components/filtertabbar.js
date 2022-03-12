import React from 'react'
import { Shopname } from '../constants'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { CLR_FBAR, CLR_HEAD, CLR_RCARD2 } from '../themes';
import router, { useRouter } from 'next/router';
//import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position:'sticky'
  }, 
	appbar:{
		flexGrow: 1,
		backgroundColor:CLR_RCARD2,
		// /justifyContent:'center',
		top: 10+"vw",
		position:'sticky',
		opacity: 1.0,
		zIndex:10,
		overflowX: 'hidden',
		//height:5+"vw",
		maxWidth:100+"vw",
		scrollbarWidth:"none",
		
		overflowX: 'scroll',

	
    '@media (min-width:845px)': { // eslint-disable-line no-useless-computed-key
		top: 5+"vw",
		scrollbarWidth:"thin",
		overflowX: 'hidden',
		//height:3+"vw",
		
	

    },
    '@media (max-width:360px)': { // eslint-disable-line no-useless-computed-key
		top: 15+"vw",
		scrollbarWidth:"thin",
		overflowX: 'scroll',
		
		//height:10+"vw",

    }
	},
	link:{
		padding:.5+"vw",
		margin:.5+"vw",
		fontWeight: "bold" ,
		fontSize:120+"%",
		
		borderWidth:0,
		borderRadius:1+"vw",
		"&:hover, &:focus": {
			
			backgroundColor:CLR_HEAD,
			color:CLR_RCARD2,
			transition: "backgroundColor "+2+"s"
		  },
		

	},
	ops:{
		alignItems:'center' ,
		display:'flex',
		flexDirection:'row',
		//top: 7+'vw',
		position:'sticky',
		
		'& > *': {
      margin: theme.spacing(1),
    },
	},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function FilterTabbar(props) {
  const classes = useStyles();

  return (
    
		<div className={classes.appbar}>
	             <div className={classes.ops}>
							  <Link name={"Repair"} url={"http://localhost:3000"}/>
							   <Link name={"Chores"} url={"http://localhost:3000"}/>
								 <Link name={"Party"} url={"http://localhost:3000"}/>
								  <Link name={"exchange"} url={"http://localhost:3000"}/>
								  <Link name={"dones"} url={"http://localhost:3000"}/>
								  <Link name={"owler"} url={"http://localhost:3000"}/>
								  <Link name={"Repair"} url={"http://localhost:3000"}/>
							   <Link name={"Chores"} url={"http://localhost:3000"}/>
								 <Link name={"Party"} url={"http://localhost:3000"}/>
								  <Link name={"exchange"} url={"http://localhost:3000"}/>
								  <Link name={"dones"} url={"http://localhost:3000"}/>
								  <Link name={"owler"} url={"http://localhost:3000"}/>
	            	</div>
		</div>
   
  );
}

function Link(props) {
  const classes = useStyles();
  const router = useRouter(); 
	return (
		<div  className={classes.link} >
		<div  onClick={() => router.push("/")} >
       {props.name}
    </div>
    </div>
	);

}
