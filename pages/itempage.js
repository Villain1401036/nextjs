import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'
import ButtonAppBar from '../components/headbar'
import MediaCard from '../components/item'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
		marginTop: 100,
		margin:'auto',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),

    },
  },
}));

export default function ItemPage(props){

const classes = useStyles();

  const [isloaded,setIsLoaded] = React.useState(true);

	return(
		<div>
		<Head>
			<title>Spook</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<ButtonAppBar />

			 <div className={classes.root} >

			 </div>

		</div>
	);



}
