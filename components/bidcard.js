//task card for a new task that has been posted
import { Button, Card, CardMedia ,divField } from '@material-ui/core';

import { useRouter } from 'next/dist/client/router';
import router from 'next/router';
import React from 'react';
import { convertToJson, geturlFormdata, postwitherror, pushitem, s3rooturl } from '../constants';
import { bidtask, postdata } from '../networking/postdata';



export default function Bidcard(props){

//const classes = useStyles();

  const [isloaded,setIsLoaded] = React.useState(true);

 const router = useRouter();
const bidhandler = () =>{

   ;
  open(props.maplink)

}


const creatework = () =>{

 
    var formdatas = new FormData();
    formdatas.append("task_key", props.taskobj.taskKey)
     formdatas.append("worker_key", 1)
     formdatas.append("description", props.taskobj.description)
    formdatas.append("place", props.taskobj.place)
    
    

    var urlform = geturlFormdata("work", "create",{},{})
    postwitherror(postdata,urlform.url, "work", formdatas  )
  
     ;
    
  }


	return(
		
            <Card variant='outlined'  style={{ margin:0+"vw"}} >

                    <div style={{display:"flex"}} >
                    <div style={{display:"flex", flexDirection:"column"}} >
                <div name="bidprice">{props.bidprice}</div>

                <div name="duration">{props.workerKey}</div>
                </div>
                <div style={{ flex:1,display:"flex" , flexDirection:"row-reverse" }}></div>
                    <button style={{height:50+"%", marginTop:5+"vh" }} onClick={() => { }}>Accept</button>
                </div>



            </Card>

        
	);



}

