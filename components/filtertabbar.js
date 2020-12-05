import React from 'react'
import { Shopname } from '../constants'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position:'sticky'
  },
	appbar:{
		flexGrow: 1,
		backgroundColor:'lightgreen',
		justifyContent:'center'


	},
	Linkbutt:{
   marhin:10,
	 padding:10,
	 borderRadius:3,
	 borderWidth:1,
	 borderStyle:'solid',
	 borderColor:'grey',

	},
	ops:{
		alignItems:'center',
		display:'flex',
		flexDirection:'row',
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
    <div  className={classes.root}>
		<div className={classes.appbar}>
	             <div className={classes.ops}>
							  <Link name={"Repair"} url={"http://localhost:3000"}/>
							   <Link name={"Chores"} url={"http://localhost:3000"}/>
								 <Link name={"Party"} url={"http://localhost:3000"}/>
								  <Link name={"exchange"} url={"http://localhost:3000"}/>
	            	</div>
		</div>
    </div>
  );
}

function Link(props) {
  const classes = useStyles();

	return (
		<div className={classes.Linkbutt} >
		<a href={props.url} className={classes.link}>
       {props.name}
    </a>
    </div>
	);

}
