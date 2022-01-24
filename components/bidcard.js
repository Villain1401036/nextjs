//task card for a new task that has been posted
import { Button, Card, CardMedia ,divField } from '@material-ui/core';
import { divFormat } from '@material-ui/icons';
import { useRouter } from 'next/dist/client/router';
import router from 'next/router';
import React from 'react';
import { convertToJson, postwitherror, pushitem, s3rooturl } from '../constants';
import { bidtask, postdata } from '../networking/postdata';



export default function Bidcard(props){

//const classes = useStyles();

  const [isloaded,setIsLoaded] = React.useState(true);

 const router = useRouter();
const bidhandler = () =>{

  console.log("post request for opening a bid");
  open(props.maplink)

}


const creatework = () =>{

    console.log("create a work with the data of a task");
    console.log("props.taskobj.taskKey");
    console.log(props.taskobj);
    var formdatas = new FormData();
    formdatas.append("task_key", props.taskobj.taskKey)
     formdatas.append("worker_key", 1)
     formdatas.append("description", props.taskobj.description)
    formdatas.append("place", props.taskobj.place)
    
    // postdata( 'http://localhost:9082/work/create' , "task" , formdatas )
    postwitherror(postdata,'http://localhost:9082/work/create', "work", formdatas  )
  
    console.log(formdatas.getAll('place'));
    
  }


	return(
		
            <Card variant='outlined'  style={{ margin:0+"vw"}} >
                {/*<div name="name">{props.name}</div>*/}
                {/* <CardMedia
        component="img"
        style={{ maxHeight:70+"vw" ,  objectFit:"contain" , backgroundColor: "lightgrey" }}
        // image={s3rooturl + convertToJson(props.itemobj.metadata).images[0]}
        alt="green iguana"
      /> */}

                    <div style={{display:"flex"}} >
                    <div style={{display:"flex", flexDirection:"column"}} >
                <div name="bidprice">{props.bidprice}</div>

                <div name="duration">{props.workerKey}</div>
                </div>
                <div style={{ flex:1,display:"flex" , flexDirection:"row-reverse" }}></div>
                    <button style={{height:50+"%", marginTop:5+"vh" }} onClick={() => {console.log("done");creatework()}}>Accept</button>
                </div>



            </Card>

        
	);



}

