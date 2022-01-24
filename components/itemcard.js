//task card for a new task that has been posted
import { Button, Card, CardMedia ,divField } from '@material-ui/core';
import { divFormat } from '@material-ui/icons';
import { useRouter } from 'next/dist/client/router';
import router from 'next/router';
import React from 'react';
import { convertToJson, pushitem, s3rooturl } from '../constants';
import { bidtask, postdata } from '../networking/postdata';



export default function Itemcard(props){

//const classes = useStyles();

  const [isloaded,setIsLoaded] = React.useState(true);

 const router = useRouter();
const bidhandler = () =>{

  console.log("post request for opening a bid");
  open(props.maplink)

}


	return(
		
            <Card variant='outlined'  style={{ margin:0+"vw"}} onClick={() => {console.log(props.itemobj); pushitem(props.itemobj); router.push("/itempage") }}>
                {/*<div name="name">{props.name}</div>*/}
                <CardMedia
        component="img"
        style={{ maxHeight:70+"vw" ,  objectFit:"contain" , backgroundColor: "lightgrey" }}
        image={s3rooturl + convertToJson(props.itemobj.metadata).images[0]}
        alt="green iguana"
      />
                <div name="category">{props.category}</div>
                <div name="description">{props.description}</div>
                <div name="place">{props.place}</div>
                <div name="price">{props.price}</div>
                <div name="distance">{props.distance}</div>
                <div name="scheduled_at">{props.scheduled_at}</div>
                <div name="duration">{props.duration}</div>

            </Card>

        
	);



}

