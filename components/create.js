import { Button, Chip, Input, Switch, TextareaAutosize, TextField } from "@material-ui/core";

import React, { useState } from "react";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import Stack from '@mui/material/Stack';
import { StaticTimePicker } from "@mui/lab";
import { FormGroup, InputBase } from "@mui/material";
import { postdata } from "../networking/postdata";
import { mediaarr, put } from "../networking/getmedia";
import { useRouter } from "next/router";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { geturlFormdata } from "../constants";
import { getallCategories, handleEnterKeyPress } from "../utils";
import { Dropdown } from "react-bootstrap";
import { getlocal, storelocal } from "../localstore";





export function Taskform(props) {

 const [rcount,setRcount] = React.useState(0);

  var data = []
  const[loaded,setLoaded] = React.useState(false);
   
  const [value, setValue] = React.useState(new Date());

  const medias = []
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


const [files, setFiles] = React.useState([]); 

const router = useRouter();

const handleupload = (file) =>{
if(typeof window != 'undefined'){
  
  
    put(file)
     
 }
  

}

const makearr =() =>{
  
  var s = ""
  mediaarr.forEach(element => {
    s += `"/testbucket/${element}",`
  });
   
  return s.slice(0,-1)
}

const  readyform = async() => {
  
  try {

  
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
  formdatas.set("metadata", `{"images":[${makearr()}]}` )

 var urlform = geturlFormdata("task","create" , {},{})
 await postdata(urlform.url , "task" , formdatas ).then(()=>{ 
    router.push("/c/home");
 }).catch((error)=> {handleClickOpen()} )
  
   
  }
  catch (error) {
    
  }
}

const handlesubmit = async () =>{
    await handleupload(files);
    readyform()

}
 

const fillpics = Array.from(files).map(file => 
  <img style={{width:80+"vw"}} src={URL.createObjectURL(file)}></img>
)

 




const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};


    return (
        <div style={{textAlign:"center"}}>


<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Something went wrong"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
        <DialogTitle id="alert-dialog-title">
          {"Something went wrong"}
        </DialogTitle>
        <DialogContent style={{textAlign:"center"}}>Task not Created</DialogContent>
        <Button onClick={()=>{if (rcount < 3){handlesubmit();setRcount(rcount+1)}else{handleClose()} }} autoFocus>
            {`Retry ${rcount}`}
          </Button>
      </Dialog>

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
     
        <MobileDatePicker
          label="date"
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
 <div>
				 <input type="file" name="file" accept="image/png, image/gif, image/jpeg" multiple  onChange={()=>{var file  = event.target.files ; console.log(file) ; setFiles(file) }} />
				 </div>
			 { files!= [] ?<>{fillpics}</>:<></> }
            <>
            <div><Button onClick={()=>{ handlesubmit() }}>Submit</Button></div>
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

    var urlForm = geturlFormdata("service", "create")
    postdata(urlform.url , "services" , formdatas )
    
     

  }

  const  taskUpdate = () => {
    var formdatas = new FormData();
    
     formdatas.append("task_status",101 )
     formdatas.append("tags", 'asdasd~dog~rewr' )
     formdatas.append("taskid","688bokaro" )

     var urlForm = geturlFormdata("task", "update")
     postdata( urlForm.url , "task" , formdatas )

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


 </FormGroup>

 <div><Button onClick={()=>{ readyform()}}>Submit</Button></div>
        </div>
    );
}



export function Itemform(props){

  const[loaded,setLoaded] = React.useState(false);
 
  const [value, setValue] = React.useState(new Date());

  const [uimages , setUimages ] = useState(false);
  const [categorydone , setCategorydone ] = useState(false);


  const[customerkey, setCustomerkey] = React.useState();
  const[description, setDescription] = React.useState();

  const[price, setPrice] = React.useState();
  const[deno, setDeno] = React.useState();

  const[tags, setTags] = React.useState("");
  const[category, setCategory] = React.useState();

  const[negotiable, setNegotiable] = React.useState(false);
  

  const[tag, setTag] = React.useState();
 
  
  const[categorys, setCategorys] = React.useState("");


  const [alltags, setAlltags] = useState(new Set());
const [allcat, setAllcat] = useState(new Set());

 
React.useEffect (()=>{
  if (!loaded){
     
  setLoaded(true)
  //setVal(opentasklist);
  }
});


const filtertags =  tags.split("~").map( (item) => <Chip label={item}  onClick={()=>{ }}  size="small"/> )

const filtercategory =   categorys.split("~").map( (item) => <Chip label={item}  onClick={()=>{ }}  size="small"/> )

const [files, setFiles] = React.useState([]); 

const router = useRouter();

const handleupload = (file) =>{
if(typeof window != 'undefined'){
  
  
    put(file)
 
 }
}

const makearr =() =>{
  
  var s = ""
  mediaarr.forEach(element => {
    s += `"/${element}",`
  });
   
  return s.slice(0,-1)
}

const  readyform = async() => {

  try{
  var formdatas = new FormData();
 
  storelocal("user_key",22)
  formdatas.append("customer_key", getlocal("user_key"))
  if (description){ formdatas.append("description", description)}

  if (price){ formdatas.append("price", price)}
   formdatas.append("deno", "INR")
   formdatas.append("place", getlocal("place"))

  if (tag){ formdatas.append("tags", tags)}
  if (category){ formdatas.append("category", category)}

  if (negotiable){
    formdatas.append("negotiable", negotiable)
  }else{
    formdatas.append("negotiable", false)
  }
  

  formdatas.set("metadata", `{"images":[${makearr()}]}` )
 
  await postdata(geturlFormdata("item","create",{}).url , "item" , formdatas ).then((val)=>{
      
  })
  //router.reload();
   
  }
  catch(e){
     
  }

}

const fillpics = Array.from(files).map(file => 
  <img style={{width:80+"vw" , max}} src={URL.createObjectURL(file)}></img>
)





const handlesubmit = async () =>{
   var files = []
   
  if (file1 != undefined){
    files.push(file1)
  } 
  if (file2 != undefined){
    files.push(file2)
  } 
  if (file3 != undefined){
    files.push(file3)
  } 
  handleupload(files);

  await readyform()

}
  const cats = getallCategories();
  const dropcats = cats.map( (item) => <Dropdown.Item href="#/action-3" onClick={()=>setCategory(item)} >{item}</Dropdown.Item> )


   const [file1,setFile1] = useState();
   const [file2,setFile2] = useState();
   const [file3,setFile3] = useState();

  return (

      <div style={{textAlign:"center" , display:"flex", flex:1,flexDirection:"column", backgroundColor:"white"}}>
       
        <h1 style={{margin:5+"vw"}}>Enter Item Details</h1>
          <FormGroup>
          
          <h5 >Choose Category*</h5>
          <Dropdown >
          <Dropdown.Toggle split={true}  bsPrefix='dropdown-toggle' style={{backgroundColor:"white",color:"black",width:80+"vw"}} >
    {(category != undefined)?category:"select category"}
  </Dropdown.Toggle>

  <Dropdown.Menu style={{width:80+"vw",maxHeight:60+"vh", overflow:"scroll"}}>
  {dropcats}
  </Dropdown.Menu>
          </Dropdown>

{category != undefined ?
<>
<div style={{margin:5+"vw"}}>
  <h5>Title</h5>
<InputBase  id="description" label="description" multiline style={{ width:100+"%" ,borderStyle:"solid" , borderWidth:1+"px",paddingLeft:20+"px" , paddingRight:20+"px" }} onChange={(e) => {setDescription(e.target.value); } } ></InputBase>
</div>

<div style={{margin:5+"vw"}}>
  <h5>Additional Information</h5>
  <InputBase  id="description" label="description" multiline style={{ width:100+"%", minHeight:20+"vw" ,borderStyle:"solid" , borderWidth:1+"px",paddingLeft:20+"px" , paddingRight:20+"px" }} onChange={(e) => {setDescription(e.target.value); } } ></InputBase>
</div>

<div style={{margin:5+"vw"}}>

<span><span style={{fontSize:5+"vw",marginRight:5+"vw"}} >Price Per day*</span><InputBase placeholder="25 , 50 or 10.99 ..."  id="price" label="price"  inputMode="numeric" type="number" onChange={(e) => setPrice(e.target.value) } style={{ width:50+"%" ,borderStyle:"solid" , borderWidth:1+"px",paddingLeft:2+"vw" , paddingRight:2+"vw" }}></InputBase></span>
</div>
{/* <h5>Currency*</h5>
<input  id="deno" label="deno"  onChange={(e) => setDeno(e.target.value) } ></input> */}

<h5>negotiable price<Switch checked={negotiable} onChange={()=>{setNegotiable(!negotiable)}} /></h5>

<div style={{marginBottom:5+"vw"}}>
<h5>tags</h5> <div>{alltags.size>0?filtertags:<></>}</div>

<input  id="tags" label="add new tag"    style={{marginTop:2+"vh"}} onChange={(e) => setTag(e.target.value) } onKeyPress={(e)=>{handleEnterKeyPress(e,setTags,alltags,tag,"tags")}}></input>
<div style={{fontSize:3+"vw"}}>^^ Press enter to add more tags</div>

</div>
</>
:<></>
}

{/* 
<h5>categories</h5> <div>{allcat.size >0?filtercategory:<></>}</div>
<TextField  id="category" label="add new category"   style={{margin:2+"vh"}} onChange={(e) => setCategory(e.target.value) } onKeyPress={(e)=>{handleEnterKeyPress(e,setCategorys,allcat,category,"category")}}></TextField> */}
</FormGroup>

{/* <div><Button onClick={()=>{ readyform()}}>Submit</Button></div> */}
<>          
 { category!= undefined && <div><Button style={{margin:3+"vw", borderStyle:"solid" , borderWidth:1+"px",paddingLeft:20+"px" , paddingRight:20+"px" }} onClick={()=>{ setUimages(true) }}>Upload Images</Button></div>
}</>
{uimages?
<>
<h5>Add Images</h5>
<div>^^add some images relevant to the item to make it more appealing</div>
<input type="file" name="file" id={"img1"}  accept="*/*" style={{display:'none'}}  onChange={()=>{var file  = event.target.files ; console.log(file) ; setFile1(file[0]) }} />
<input type="file" name="file" id={"img2"}  accept="image/png, image/gif, image/jpeg" style={{display:'none'}}  onChange={()=>{var file  = event.target.files ; console.log(file) ; setFile2(file[0]) }} />
<input type="file" name="file" id={"img3"}  accept="image/png, image/gif, image/jpeg" style={{display:'none'}}  onChange={()=>{var file  = event.target.files ; console.log(file) ; setFile3(file[0]) }} />


{!file1 ? <div style={{width:80+"vw", height:60+"vw",margin:"auto" , marginBottom:6+"vw", backgroundColor:"lightgrey"}} onClick={()=>{ document.getElementById("img1").click(); }}  ></div>:<img style={{width:80+"vw" , maxHeight:60+"vw",margin:"auto" , marginBottom:6+"vw", backgroundColor:"lightgrey", objectFit:"contain"}} src={URL.createObjectURL(file1)}></img>}


{!file2 ? <div style={{width:80+"vw", height:60+"vw",margin:"auto" ,  marginBottom:6+"vw",backgroundColor:"lightgrey"}} onClick={()=>{ document.getElementById("img2").click();}}  ></div>:<img style={{width:80+"vw" ,  maxHeight:60+"vw",margin:"auto" , marginBottom:6+"vw", backgroundColor:"lightgrey", objectFit:"contain"}} src={URL.createObjectURL(file2)}></img>}

{!file3 ? <div style={{width:80+"vw", height:60+"vw",margin:"auto" ,  marginBottom:6+"vw",backgroundColor:"lightgrey"}} onClick={()=>{document.getElementById("img3").click(); }}  ></div>:<img style={{width:80+"vw" ,  maxHeight:60+"vw",margin:"auto" , marginBottom:6+"vw", backgroundColor:"lightgrey", objectFit:"contain"}} src={URL.createObjectURL(file3)}></img>}


{ files!= [] ?<>{fillpics}</>:<></> }
            <>
            
            <div><Button style={{margin:3+"vw", borderStyle:"solid" , borderWidth:1+"px",paddingLeft:20+"px" , paddingRight:20+"px" }} onClick={()=>{ handlesubmit() }}>Submit</Button></div>
            </>
            </>
 :<></>}
      </div>
  );
}


 