import React from 'react'
import { Shopname } from '../constants'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { CLR_FBAR, CLR_HEAD } from '../themes';
import router, { useRouter } from 'next/router';
//import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position:'sticky'
  }, 
	appbar:{
		flexGrow: 1,
		backgroundColor:CLR_FBAR,
		justifyContent:'center',
		top: 12+"vw",
		position:'sticky',
		opacity: 1.0,
		zIndex:10,
		overflowX: 'scroll',
		maxHeight:8+"vw"

	},
	Linkbutt:{
     margin:1+"vh",
	 padding:0+"vh",
	 overflowX: "scroll",
	 borderColor:'grey',
	 top: 60+'px',
	 position:'sticky',
	 textAlign:"center",
	 
	},
	link:{

		fontSize:100+"%",
		paddingRight:10,
		borderWidth:0,
		borderRightWidth:1,
		borderStyle:'solid',

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
		<div   >
		<div  onClick={() => router.push("/")} className={classes.link}>
       {props.name}
    </div>
    </div>
	);

}
