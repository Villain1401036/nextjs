//task card for a new task that has been posted
import { Button, Card, divField } from '@material-ui/core';
import { divFormat } from '@material-ui/icons';
import React from 'react';
import { bidtask, postdata } from '../networking/postdata';



export default function Taskcard(props){

//const classes = useStyles();

  const [isloaded,setIsLoaded] = React.useState(true);


const bidhandler = () =>{

  console.log("post request for opening a bid");
  open(props.maplink)

}




const catchtask = () =>{

  console.log("create a work with the data of a task");

  var formdatas = new FormData();
  formdatas.append("task_key", props.taskKey)
   formdatas.append("worker_key", 1)
   formdatas.append("description", props.description)
  formdatas.append("place", props.place)
  
  postdata( 'http://localhost:9082/work/create' , "task" , formdatas )
  console.log(formdatas.getAll('place'));
}

const bidtask = () =>{

  console.log("create a work with the data of a task");

  var formdatas = new FormData();
  formdatas.append("task_key", props.taskKey)
   formdatas.append("worker_key", 11)
   formdatas.append("completion_time", 453645675)
  formdatas.append("bidprice", 3443)
  formdatas.append("available_at", 344567673)
  
  postdata( 'http://localhost:9082/bid/create' , "task" , formdatas )
  console.log(formdatas.getAll('place'));

  
}

	return(
		
            <Card style={{ margin:5+"vw"}} onClick={() => console.log("card is clicked to open")}>
                <div name="name">{props.name}</div>
                <div name="category">{props.category}</div>
                <div name="description">{props.description}</div>
                <div name="place">{props.place}</div>
                <div name="price">{props.price}</div>
                <div name="distance">{props.distance}</div>v 
                <div name="scheduled_at">{props.scheduled_at}</div>
                <div name="duration">{props.duration}</div>
                <button name="maplink" onClick={() => open(props.maplink)}>location</button>
                <button name="bid" onClick={() => bidtask()}>bid</button>
                <button name="bid" onClick={() => catchtask()}>takework</button>
            </Card>

        
	);



}

