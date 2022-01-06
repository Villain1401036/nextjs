import { Button, TextareaAutosize, TextField } from "@material-ui/core";

import React from "react";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import Stack from '@mui/material/Stack';
import { StaticTimePicker } from "@mui/lab";
import { FormGroup } from "@mui/material";
import { postdata } from "../networking/postdata";





export function Taskform(props) {
    
  const[loaded,setLoaded] = React.useState(false);
   
  const [value, setValue] = React.useState(new Date());


    const[short_name, setShort_name] = React.useState();
const[description, setDescription] = React.useState();
const[tasktype, setTasktype] = React.useState();
const[price, setPrice] = React.useState();
const[deno, setDeno] = React.useState();
const[duration, setDuration] = React.useState();
const[tags, setTags] = React.useState();
const[category, setCategory] = React.useState();
const[place, setPlace] = React.useState();
const[location, setLocation] = React.useState();
const[customer_key, setCustomer_key] = React.useState();


const  readyform = () => {
  var formdatas = new FormData();
 
  
  if (short_name){ formdatas.append("short_name", short_name)}
  if (description){ formdatas.append("description", description)}
  if (tasktype){ formdatas.append("tasktype", tasktype)}
  if (price){ formdatas.append("price", price)}
  if (deno){ formdatas.append("deno", deno)}
  if (duration){ formdatas.append("duration", duration)}
  if (tags){ formdatas.append("tags", tags)}
  if (category){ formdatas.append("category", category)}
  if (place){ formdatas.append("place", place)}
  if (location){ formdatas.append("location", location)}
  if (customer_key){ formdatas.append("customer_key", customer_key)}

 
  postdata('http://localhost:9082/task/create' , "task" , formdatas )
  
 console.log(formdatas.getAll("description")); 

}
    return (
        <div style={{textAlign:"center"}}>
          <h1>NEW TASK</h1>
          
          <FormGroup>
<TextField  id="short_name" label="short_name" variant="outlined" value= {short_name} onChange={(e) => setShort_name(e.target.value) } ></TextField>
<TextField  id="description" label="description" variant="outlined" value= {description} onChange={(e) => setDescription(e.target.value) } ></TextField>
<TextField  id="tasktype" label="tasktype" variant="outlined" value= {tasktype} onChange={(e) => setTasktype(e.target.value) } ></TextField>
<TextField  id="price" label="price" variant="outlined" value= {price} onChange={(e) => setPrice(e.target.value) } ></TextField>
<TextField  id="deno" label="deno" variant="outlined" value= {deno} onChange={(e) => setDeno(e.target.value) } ></TextField>
<TextField  id="duration" label="duration" variant="outlined" value= {duration} onChange={(e) => setDuration(e.target.value) } ></TextField>
<TextField  id="tags" label="tags" variant="outlined" value= {tags} onChange={(e) => setTags(e.target.value) } ></TextField>
<TextField  id="category" label="category" variant="outlined" value= {category} onChange={(e) => setCategory(e.target.value) } ></TextField>
<TextField  id="place" label="place" variant="outlined" value= {place} onChange={(e) => setPlace(e.target.value) } ></TextField>
<TextField  id="location" label="location" variant="outlined" value= {location} onChange={(e) => setLocation(e.target.value) } ></TextField>
<TextField  id="customer_key" label="customer_key" variant="outlined" value= {customer_key} onChange={(e) => setCustomer_key(e.target.value) } ></TextField>

           
<LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
          label="scheduled at"
          value={value}
          minDate={new Date('2017-01-01')}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <MobileDatePicker
          label="For mobile"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
         <StaticTimePicker
        displayStaticWrapperAs="mobile"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      
        </LocalizationProvider>
 </FormGroup>

            <>
            <div><Button onClick={()=>{ readyform()}}>Submit</Button></div>
            </>

        </div>
    );
}


export function Serviceform(props){

    const[loaded,setLoaded] = React.useState(false);
   
    const [value, setValue] = React.useState(new Date());

    const[shortname, setShortname] = React.useState();
    const[description, setDescription] = React.useState();
    const[servicetype, setServicetype] = React.useState();
    const[price, setPrice] = React.useState();
    const[deno, setDeno] = React.useState();
    const[duration, setDuration] = React.useState();
    const[tags, setTags] = React.useState();
    const[category, setCategory] = React.useState();
    const[place, setPlace] = React.useState();
    const[location, setLocation] = React.useState();
    const[worker_key, setWorker_key] = React.useState();
    
   
   
React.useEffect (()=>{
    if (!loaded){
       
    setLoaded(true)
    //setVal(opentasklist);
    }
 });

  

  const  readyform = () => {
    var formdatas = new FormData();
   
    
    if (shortname){ formdatas.append("shortname", shortname)}
    if (description){ formdatas.append("description", description)}
    if (servicetype){ formdatas.append("servicetype", servicetype)}
    if (price){ formdatas.append("price", price)}
    if (deno){ formdatas.append("deno", deno)}
    if (duration){ formdatas.append("duration", String(value.getTime()/1000).split(".")[0])}
    if (tags){ formdatas.append("tags", tags)}
    if (category){ formdatas.append("category", category)}
    if (place){ formdatas.append("place", place)}
    if (location){ formdatas.append("location", location)}
    if (worker_key){ formdatas.append("worker_key", worker_key)}

   
    postdata('http://localhost:9082/service/create' , "services" , formdatas )
    
   console.log(formdatas.getAll("description")); 

  }

  const  taskUpdate = () => {
    var formdatas = new FormData();
    
     formdatas.append("task_status",101 )
     formdatas.append("tags", 'asdasd~dog~rewr' )
     formdatas.append("taskid","688bokaro" )
     postdata('http://localhost:9082/task/update?updatetype=tags' , "task" , formdatas )

  }


    return (
        <div style={{textAlign:"center"}}>
         
          <h1 >NEW SERVICE</h1>
            <FormGroup>

<TextField  id="shortname" label="shortname" variant="outlined" value= {shortname} onChange={(e) => setShortname(e.target.value) } ></TextField>
<TextField  id="description" label="description" variant="outlined" value= {description} onChange={(e) => setDescription(e.target.value) } ></TextField>
<TextField  id="servicetype" label="servicetype" variant="outlined" value= {servicetype} onChange={(e) => setServicetype(e.target.value) } ></TextField>
<TextField  id="price" label="price" variant="outlined" value= {price} onChange={(e) => setPrice(e.target.value) } ></TextField>
<TextField  id="deno" label="deno" variant="outlined" value= {deno} onChange={(e) => setDeno(e.target.value) } ></TextField>
<TextField  id="duration" label="duration" variant="outlined" value= {duration} onChange={(e) => setDuration(e.target.value) } ></TextField>
<TextField  id="tags" label="tags" variant="outlined" value= {tags} onChange={(e) => setTags(e.target.value) } ></TextField>
<TextField  id="category" label="category" variant="outlined" value= {category} onChange={(e) => setCategory(e.target.value) } ></TextField>
<TextField  id="place" label="place" variant="outlined" value= {place} onChange={(e) => setPlace(e.target.value) } ></TextField>
<TextField  id="location" label="location" variant="outlined" value= {location} onChange={(e) => setLocation(e.target.value) } ></TextField>
<TextField  id="worker_key" label="worker_key" variant="outlined" value= {worker_key} onChange={(e) => setWorker_key(e.target.value) } ></TextField>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
          label="For desktop"
          value={value}
          minDate={new Date('2017-01-01')}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <MobileDatePicker
          label="For mobile"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
         <StaticTimePicker
        displayStaticWrapperAs="mobile"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      
        </LocalizationProvider>
 </FormGroup>
 <div><Button onClick={()=>{ readyform()}}>Submit</Button></div>
        </div>
    );
}


 