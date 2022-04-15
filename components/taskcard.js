//task card for a new task that has been posted
import { Button, Card, CardMedia, divField } from '@material-ui/core';
import { divFormat, PinDrop, PinDropOutlined, PinDropRounded, PinDropSharp, PinDropTwoTone } from '@material-ui/icons';
import { useRouter } from 'next/router';
import React from 'react';
import { geturlFormdata, pushtask, s3rooturl } from '../constants';
import { bidtask, postdata } from '../networking/postdata';



export default function Taskcard(props){

//const classes = useStyles();

  const [isloaded,setIsLoaded] = React.useState(true);


const bidhandler = () =>{

   
  open(props.maplink)

}




const catchtask = () =>{

   

  var formdatas = new FormData();
  formdatas.append("task_key", props.taskobj.taskKey)
   formdatas.append("worker_key", 1)
   formdatas.append("description", props.description)
  formdatas.append("place", props.place)
  
  var urlForm = geturlFormdata("work","create")
  postdata( urlForm.url , "task" , formdatas )

   
  
}

const bidtask = () =>{

   

  var formdatas = new FormData();
  formdatas.append("task_key", props.taskobj.taskKey)
   formdatas.append("worker_key", 19)
   formdatas.append("completion_time", 453645675)
  formdatas.append("bidprice", 3443)
  formdatas.append("available_at", 344567673)
  
  var urlForm = geturlFormdata("bid","create",{},{})
  postdata( urlForm.url , "task" , formdatas )
   

  
}
   
  const router = useRouter();

  var rooturl = s3rooturl

	return(
		
            <Card variant='outlined'  style={{ margin:0.4+"vw"}} >
                {/*<div name="name">{props.name}</div>*/}
                <div onClick={() =>{ console.log(props.taskobj) ;pushtask(props.taskobj) ; router.push("/p/taskpage") }}>
                <CardMedia
        component="img"
        style={{ maxHeight:70+"vw" , minHeight:40+"vw",  objectFit:"contain" , backgroundColor: "lightgrey" }}
        image={rooturl+props.image}
        
        alt="green iguana"
      />
                <div name="description" style={{fontSize:3+"vw"}}>{props.taskobj.taskKey}</div>
                <div name="description"  style={{fontSize:3+"vw"}}>{props.description}</div>
                <div name="place"  style={{fontSize:3+"vw"}}>{props.place}</div>
                <div name="price"  style={{fontSize:3+"vw"}}>{props.price}</div>
                <div name="distance">{props.distance}</div>
                <div name="scheduled_at">{props.scheduled_at}</div>
                <div name="duration">{props.duration}</div>
                
                
                </div>
                <div style={{display:"flex" , flexDirection:"row-reverse" }}>
                <button name="bid" onClick={() => bidtask()} style={{ fontSize:3+"vw",backgroundColor:"white", margin:1+"vw", borderStyle:"solid" , borderRadius:2+"vw", borderColor:"purple" ,   textAlign:"center" }} >
                  BID
                  </button>
                <button name="takework" onClick={() => catchtask()} style={{fontSize:3+"vw", margin:1+"vw", borderStyle:"solid" , borderRadius:2+"vw", borderColor:"purple" ,   textAlign:"center" , backgroundColor:"white" }} >takework</button>
                <div style={{display:"flex" , flex:1, flexDirection:"row" }}></div>
                <div name="maplink"  style={{width:10+"vw", padding:1+"vw"}} onClick={() => open(props.maplink)} ><PinDropTwoTone fontSize="small" /></div>
                </div>
            </Card>

        
	);



}

