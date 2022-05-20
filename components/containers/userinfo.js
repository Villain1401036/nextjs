
import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { getdata } from '../../networking/getdata';
import { Button, Chip, TextField } from '@material-ui/core';
import Taskcard from '../taskcard';
import { MapSharp } from '@material-ui/icons';
import Addresscard from '../addresscard';
import { FormGroup, Stack } from '@mui/material';
import { Dropdown } from 'react-bootstrap';
import Select from 'react-select'
import router from 'next/router';
import { getfromLS, geturlFormdata, setValue } from '../../constants';
import { put, putverify } from '../../networking/getmedia';
import { postdata } from '../../networking/postdata';
import { getlocal, getobjlocal } from '../../localstore';
import {  getallCategories, placedataobj } from '../../utils';


const useStyles = makeStyles((theme) => ({

  root: {
		margin:"auto",
    display: 'grid',
		gridTemplateColumns:"auto auto auto",

    '& > *': {
      margin: theme.spacing(1),
    },
	},
	contentArea:{
		display:'flex',
		flexDirection:'row',
	},
    cover: {
			marginTop: 0,
			height:70,
			margin:'auto',
  },
	appsidebar:{
		position:"sticky",
		top:100,
		right:0,
		height:600+"px",
		width:250+"px",
		backgroundColor:'pink',


	},
}));

const taskmap = new Map();
const openaddresslist = [];
const tlist =[];
var count = 0;


//******************************************************************************************* */
//This will be for the information about all the data that is coming to here being processed 
//all statistics will be seen here
//******************************************************************************************* */

export default function Userinfo(props){
    
     

    
    
    const [loaded,setLoaded] = React.useState(false); 

    const classes = useStyles();

    const [verify , setVerify] = React.useState(false);
    
    const [page , setPage] = React.useState("gen");
    //var urlform = geturlFormdata("customer","create",{},{})
 
    useEffect (()=>{
       if (!loaded){
            
       }
    });

    const [fname , setFname ] = useState();
    const [lname , setLname ] = useState();
    const [gender , setGender ] = useState();
    const [email , setEmail ] = useState();
    const [phone , setPhone ] = useState();
    const [aadhar , setAadhar ] = useState();
    const [country , setCountry ]  = useState();
    const [district , setDistrict] = useState();
    const [state , setState] = useState();

const handleSubmit = async () =>{
    
    try{

    
    var urlform = geturlFormdata("customer","create",{},{})
    var formdatas = new FormData();

    if (fname){ formdatas.set("first_name", fname)}
    if (lname){ formdatas.set("last_name", lname)}
    if (gender){ formdatas.set("gender", gender)}
    
    
    if (aadhar){ formdatas.set("aadhar_id", aadhar)}
      var temp = getlocal("temp_id")
       
    if(temp.startsWith("+")){
       formdatas.set("phone_number", getlocal("temp_id"))
    }else{
       formdatas.set("email", getlocal("temp_id"))
    }
    formdatas.set("iden", getlocal("temp_id"))
    formdatas.set("metadata",`{"country":"${country}","state":"${state}" ,"district":"${district}"}`)
     
     
     
    await postdata(urlform.url , "customer" ,formdatas )
    
    var temp = getlocal("temp_id")
     
    var urlform = null;
  if(temp.startsWith("+")){
     urlform = geturlFormdata("customer","get",{"user_id":temp, "idtype":"phone"})
  }else{
    urlform = geturlFormdata("customer","get",{"user_id":temp, "idtype":"email"})
  }
    
    await getdata(urlform.url , "customers").then((value)=> {
         console.log(value);

        
        
        var path = getlocal('currentpath')
        router.push(path , path , {shallow:true})
    }).catch((e)=>{
       alert(e)
    })
    }
    catch(e){
        //  alert(e)
    }
    

}
const canvasRef = React.useRef(null)
  

  useEffect(() => {
    
 
 

    //Our draw come here
  
  })


  var selectedcategory = new Set()
  const onselectcategory =( item ) =>{

    if (selectedcategory.has(item)){
      selectedcategory.delete(item)
    }
    else{
      selectedcategory.add(item)
    }
     
    
}

   const placedata = placedataobj
  const countryops = [
    {value:"India" , label:"India"}
  ]
 
 const getstate = () =>{
  const stateopts  = new Array()
   placedata["states"].forEach(element => {
     stateopts.push({value: element["state"] , label:element["state"]  })
   });
   return stateopts
 }

 const getdistrict = (state) =>{
  const districtopts  = new Array()
  if (state == null){
    return districtopts
  }
  
  var i = 0
  while (i < placedata["states"].length){
    if (placedata["states"][i]["state"] == state){
        break
    }
    i++
  }


  placedata["states"][i]["districts"].forEach(element => {
     districtopts.push({value: element , label:element  })
   });
 
  return districtopts
 }

  const listcategory = getallCategories()
 const chipscategory = listcategory.map((item) => <> <SelectChip item={item} onselect={(val)=> onselectcategory(val)} /></> )

	return(
<>

<FormGroup style={{width:90+"vw"}}>

  { page == "gen" && 
   
         
<>
<input type='text' className='btn' style={{margin:2+"vw" , border :"solid" , borderWidth:1+"px"}}  id="First Name" label="First Name" variant="outlined" placeholder='First Name' onChange={(e)=>{ setFname(e.target.value); }} ></input>
<input  id="lname" className='btn' style={{margin:2+"vw" , border :"solid" , borderWidth:1+"px"}} label="Last Name" variant="outlined" placeholder='Last Name'  onChange={(e) => setLname(e.target.value) } ></input>
<div style={{width:50+"%", marginBottom:10+"vh" , display:"flex" , flexDirection:"row"} }>
<h3>Gender</h3>
<Select  options={[{value:"Male" , label:"Male"},{value:"Female" , label:"Female"}]} onChange={(value)=>{ setGender(value["value"])}}/>

</div>

<button onClick={()=>{setPage("place")}} disabled={false} >Next</button>
</>} 

{page == "place" && <>             <div style={{margin:1+"vh" , marginBottom:1+"vh"}} > <Select    options={countryops} onChange={(val)=>{setCountry(val["value"]);}} /></div>
             <div style={{margin:1+"vh", marginBottom:1+"vh"}} > <Select   options={getstate()} onChange={(value)=>{ setState(value["value"])}} /></div>
              <div style={{margin:1+"vh", marginBottom:1+"vh"}} > <Select   options={getdistrict(state)} onChange={(val)=>{setDistrict(val["value"]);}}/></div>
              <button onClick={()=>{setPage("cats")}} disabled={false} >Next</button>
</>}
{/* <TextField  id="email" label="Email" variant="outlined"  onChange={(e) => setEmail(e.target.value) } ></TextField>
<TextField disabled id="deno" label="Phone" variant="outlined"  onChange={(e) => setPhone(e.target.value) } ></TextField> */}



{
  page=="cats" && <>
<h3>choose Categories you want to look for</h3>

<div style={{width:100+"%"}}>

{chipscategory}
</div>

<button onClick={()=>{handleSubmit()}}>Submit</button>
  </>
}

{
  page=="complete" && <>
<h3>choose Categories you want to look for</h3>

<div style={{width:100+"%"}}>

{chipscategory}
</div>


<button onClick={()=>{  setVerify(true) }}>GO TO ID VERIFICATION</button>
  </>
}



  

            </FormGroup>
            
            
        
            

             
</>
	);

}



function IdVerification(props){

    const [loaded,setLoaded] = useState();
    const [selectid,setSelectid] = useState();
    const [inprocess,setInprocess] = useState(false);

    
const [otp, setOtp] = React.useState([]); 
const [photo, setPhoto] = React.useState([]);
const [sign, setSign] = React.useState([]);
    
    const getotp = () =>{
        var k =  Math.floor(Math.random()*10000)
        if ( k < 1000){
            return 1000+k
        } 
        return k
    }

    useEffect (()=>{
        if (!loaded){
             setInprocess(true)
        }
     });
 

    const fillotp = Array.from(otp).map(file => <>
        <img style={{width:80+"vw"}} src={URL.createObjectURL(file)}></img>
        <div >{file["name"]}</div>
        </>
      )

      const fillphoto = Array.from(photo).map(file => <>
        <img style={{width:80+"vw"}} src={URL.createObjectURL(file)}></img>
        <div >{file["name"]}</div>
        </>
      )

      const fillsign = Array.from(sign).map(file => <>
        <img style={{width:80+"vw"}} src={URL.createObjectURL(file)}></img>
        <div >{file["name"]}</div>
        </>
      )
    const idoptions = [
         {value:"Aadhar Id" , label:"Aadhar Id"},
         {value:"Voter Id" , label:"Voter Id"},
     ]




     const uploadforverification = () =>{
         handlesubmit()
     }

     
     const handlesubmit = async () =>{
        await handleupload(otp);
        await handleupload(photo);
        await handleupload(sign);
        
    }
    

    const handleupload = async(file) =>{
        try{

        
        if(typeof window != 'undefined'){
            
            await putverify(file)
            setInprocess(true);
         
         }
        }
        catch (e) {
            
        }
     }


    return(
 <>
        {!inprocess?
        <div style={{textAlign:"center"}}>

            <h5>Verify your Identity</h5>
            <h6>To verify yourself please select a particular type of Id card</h6>

            <div style={{width:50+"%", marginBottom:10+"vh" , margin:"auto"} }>
<Select  options={idoptions} onChange={(value)=>{ setSelectid(value["value"])}}/>
</div>

          <h1>{getotp()}</h1>

                 <div>
				 <input type="file" name="file" id="file1" accept="image/png, image/gif, image/jpeg" hidden  aria-label='asdg' onChange={()=>{var file  = event.target.files ;  setOtp(file)  }} />
                 <label style={{backgroundColor:"lightblue", padding:1+"vw", borderStyle:"solid", borderRadius:1+"vh"}} for="file1">upload pic with otp</label>
                 { otp!= [] ?<>{fillotp}</>:<></> }
				 </div>
                
                 <div>
				 <input type="file" name="file" id="file2" accept="image/png, image/gif, image/jpeg" hidden  aria-label='asdg' onChange={()=>{var file  = event.target.files ;  setPhoto(file)  }} />
                 <label style={{backgroundColor:"lightblue", padding:1+"vw", borderStyle:"solid", borderRadius:1+"vh"}} for="file2">upload a signature</label>
                 { photo!= [] ?<>{fillphoto}</>:<></> }
				 </div>

                 <div>
				 <input type="file" name="file" id="file3" accept="image/png, image/gif, image/jpeg" hidden  aria-label='asdg' onChange={()=>{var file  = event.target.files ;  setSign(file)  }} />
                 <label style={{backgroundColor:"lightblue", padding:1+"vw", borderStyle:"solid", borderRadius:1+"vh"}} for="file3">upload passport size photo</label>
                 { sign!= [] ?<>{fillsign}</>:<></> }
				 </div>

                 <button onClick={()=>{ uploadforverification()}}>Submit for Verification</button>

        </div>:
        <>
            <h4>Verification in progress</h4> 
            {/* <button onClick={()=>{ }>Back</button> */}

        </>
}
        </>
    );
}


function SelectChip(props){

  const [select, setSelect] = useState(false);
   return(
     <>{
       !select?
      <Chip label={props.item} variant="outlined" component="a"  onClick={()=> {setSelect(!select);props.onselect(props.item) }}/>:
      <Chip label={props.item} component="a" color={"primary"}  onClick={()=> {setSelect(!select);props.onselect(props.item) }}/>
      
     }</>
     );
}