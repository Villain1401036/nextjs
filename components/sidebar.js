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

			top: 0
  },
	appsidebar:{
		position:"sticky",
    height:600+"px",
		width:30+"vw",
		backgroundColor:'pink',
			elevation: 0,

			right:0
	},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function SideBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
		<div className={classes.appsidebar}>

		</div>
    </div>
  );
}
