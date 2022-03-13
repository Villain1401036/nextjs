//task card for a new task that has been posted
import { Button, Card, CardMedia, divField } from '@material-ui/core';
import { divFormat, PinDrop, PinDropOutlined, PinDropRounded, PinDropSharp, PinDropTwoTone } from '@material-ui/icons';
import { useRouter } from 'next/router';
import React from 'react';
import { pushwork, s3rooturl } from '../constants';
import { bidtask, postdata } from '../networking/postdata';



export default function Workcard(props){

//const classes = useStyles();

  const [isloaded,setIsLoaded] = React.useState(true);



  console.log(props.location);
  const router = useRouter();

  var rooturl = s3rooturl

	return(
		
            <Card variant='outlined'  style={{ margin:2+"vw"}} onClick={() =>{ console.log(props.workobj) ;pushwork(props.workobj) ; router.push("/workpage") }}>
                {/*<div name="name">{props.name}</div>*/}
                
                <CardMedia
        component="img"
        style={{ maxHeight:70+"vw" , minHeight:50+"vw",  objectFit:"contain" , backgroundColor: "lightgrey" }}
        image={rooturl+props.image}
        
        alt="green iguana"
      />
                
                <div name="description">{props.description}</div>
               
                
                <div style={{display:"flex" , flexDirection:"row-reverse" }}>
                
                <div style={{display:"flex" , flex:1, flexDirection:"row" }}></div>
                <div name="maplink"  style={{width:10+"vw", padding:1+"vw"}} onClick={() => open(props.maplink)} ><PinDropTwoTone fontSize="large" /></div>
                </div>
            </Card>

        
	);



}

