
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
    
    console.log( getfromLS("access_token"));

    
    
    const [loaded,setLoaded] = React.useState(false); 

    const classes = useStyles();

    const [verify , setVerify] = React.useState(false);
    
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

const handleSubmit = async () =>{
    
    try{

    
    var urlform = geturlFormdata("customer","create",{},{})
    var formdatas = new FormData();

    if (fname){ formdatas.set("first_name", fname)}
    if (lname){ formdatas.set("last_name", lname)}
    if (gender){ formdatas.set("gender", gender)}
    if (email){ formdatas.set("email", email)}
    if (phone){ formdatas.set("phone_number", phone)}
    if (aadhar){ formdatas.set("aadhar_id", aadhar)}
    console.log(formdatas.getAll("first_name"));
    console.log(fname);
    await postdata(urlform.url , "customer" ,formdatas )
    

    await getdata(geturlFormdata("customer","get",{"user_id":email, "idtype":"email"}).url , "customers").then((value)=> {
        console.log(value);
    })
    }
    catch(e){
        console.log(e);
    }
    router.push("/home")

}
const canvasRef = React.useRef(null)
  

  useEffect(() => {
    
 
    var QRCode = require('qrcode')

    QRCode.toCanvas('1723 7165 2698 1876 6123 1653 1232 1233', { errorCorrectionLevel: 'H' }, function (err, canvas) {
      if (err) throw err
    
      var container = document.getElementById('container')
      
        container.replaceChildren(canvas)
      
     
    
    })
    //Our draw come here
  
  })
  

	return(
<>
		{
            !verify
       ?
            <FormGroup>

            <TextField type='text'  id="First Name" label="First Name" variant="outlined" onChange={(e)=>{ setFname(e.target.value); }} ></TextField>
<TextField  id="description" label="Last Name" variant="outlined"  onChange={(e) => setLname(e.target.value) } ></TextField>



<TextField  id="price" label="Email" variant="outlined"  onChange={(e) => setEmail(e.target.value) } ></TextField>
<TextField  id="deno" label="Phone" variant="outlined" onChange={(e) => setPhone(e.target.value) } ></TextField>

<h5>Gender</h5>

<div style={{width:50+"%", marginBottom:10+"vh"} }>
    
<Select  options={[{value:"Male" , label:"Male"},{value:"Female" , label:"Female"}]} onChange={(value)=>{ setGender(value["value"])}}/>

</div>
<div style={{margin:"auto"}} id={"container"}></div>
<button onClick={()=>{handleSubmit()}}>Submit</button>

   <button onClick={()=>{ console.log("ID verify");setVerify(true) }}>GO TO ID VERIFICATION</button>

            </FormGroup>
              :<>
                 <IdVerification />
              </>
        }
            

             
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
				 <input type="file" name="file" id="file1" accept="image/png, image/gif, image/jpeg" hidden  aria-label='asdg' onChange={()=>{var file  = event.target.files ; console.log(file);setOtp(file)  }} />
                 <label style={{backgroundColor:"lightblue", padding:1+"vw", borderStyle:"solid", borderRadius:1+"vh"}} for="file1">upload pic with otp</label>
                 { otp!= [] ?<>{fillotp}</>:<></> }
				 </div>
                
                 <div>
				 <input type="file" name="file" id="file2" accept="image/png, image/gif, image/jpeg" hidden  aria-label='asdg' onChange={()=>{var file  = event.target.files ; console.log(file);setPhoto(file)  }} />
                 <label style={{backgroundColor:"lightblue", padding:1+"vw", borderStyle:"solid", borderRadius:1+"vh"}} for="file2">upload a signature</label>
                 { photo!= [] ?<>{fillphoto}</>:<></> }
				 </div>

                 <div>
				 <input type="file" name="file" id="file3" accept="image/png, image/gif, image/jpeg" hidden  aria-label='asdg' onChange={()=>{var file  = event.target.files ; console.log(file);setSign(file)  }} />
                 <label style={{backgroundColor:"lightblue", padding:1+"vw", borderStyle:"solid", borderRadius:1+"vh"}} for="file3">upload passport size photo</label>
                 { sign!= [] ?<>{fillsign}</>:<></> }
				 </div>

                 <button onClick={()=>{console.log("kdaskfd");uploadforverification()}}>Submit for Verification</button>

        </div>:
        <>
            <h4>Verification in progress</h4> 
        </>
}
        </>
    );
}
