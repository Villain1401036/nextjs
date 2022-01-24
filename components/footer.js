import React from 'react'
import { Shopname } from '../constants'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { CLR_FBAR } from '../themes';
//import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  foot: {
    flexGrow: 1,
	//position:'sticky',
	bottom:0,
	zIndex:10
  },
	 infoblocks: {
	    flexGrow: 1,
			display:'flex',
			flexDirection:'column',
			margin:10,
	  },

	link:{
   fontSize:11, 
	 color:'grey' ,

	},
	appbar:{
		  flexGrow: 1,
			display:'flex',
			flexDirection:'row',
		backgroundColor:CLR_FBAR,
	},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Footer(props) {
  const classes = useStyles();

  return (
    <div className={classes.foot}>
		<div className={classes.appbar}>
      		<Locationblocks />
			<Aboutblocks />
			<Followblocks />
		</div>
    </div>
  );
}


function Link(props) {
  const classes = useStyles();

	return (
		<a href={props.url} className={classes.link}>
       {props.name}
    </a>

	);

}


function Locationblocks(props) {
  const classes = useStyles();

	return (
		<div className={classes.infoblocks}>
       <div>Locations</div>
       <Link name={"Pune"} url={"http://localhost:3000"}/>
			 <Link name={"Banglore"} url={"http://localhost:3000"}/>
			 <Link name={"Mumbai"} url={"http://localhost:3000"}/>
			 <Link name={"Hyderabad"} url={"http://localhost:3000"}/>
    </div>

	);

}

function Aboutblocks(props) {
  const classes = useStyles();

	return (
		<div className={classes.infoblocks}>
       <div>About us</div>
       <Link name={"Who we are"} url={"http://localhost:3000"}/>
			 <Link name={"Carrers"} url={"http://localhost:3000"}/>
			 <Link name={"Contact us"} url={"http://localhost:3000"}/>
			 <Link name={"partners"} url={"http://localhost:3000"}/>
    </div>

	);

}

function Followblocks(props) {
  const classes = useStyles();

	return (
		<div className={classes.infoblocks}>

		<a href={props.url} className={classes.link}>
			 {props.name}
		</a>

       <div >Follow us</div>
       <Link name={"facebook"} url={"http://localhost:3000"}/>
       <Link name={"instagram"} url={"https://www.instagram.com/ketchapp/"}/>
			 <Link name={"twitter"} url={"http://localhost:3000"}/>
			 <Link name={"youtube"} url={"http://localhost:3000"}/>
    </div>

	);

}
