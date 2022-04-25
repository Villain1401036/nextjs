
import { Button, Input, InputBase, makeStyles, } from '@material-ui/core';
import { Business } from '@material-ui/icons';
import router from 'next/router';
import React from 'react'
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import ButtonAppBar from '../../components/headbar';
import { CLR_FBAR, CLR_HEAD, CLR_RCARD1, CLR_RCARD2 } from '../../themes';




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
          
          height:100+'%',
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
      appbar:{
          
          backgroundColor:"white",
  
          top: 12+"vw",
          position:'sticky',
          
      
      
      
  
      },
      container:{
          minHeight:100+"vh",
          backgroundColor:"white",
          
      },
      nbuttonroot:
     
      {
        display:"flex",
        backgroundColor:"white",
        color:CLR_HEAD ,
         margin:2+"vw" ,
         height:10+"vw",
         
         borderRadius:2+"vw",
         borderColor:CLR_HEAD,
         borderStyle:"solid",
         borderWidth:1+"px",
         
         justifyContent:"center",
         alignItems: "center",
        
        }
  }));


export default function SettingsPage(props){

  const classes = useStyles();
  const [isloaded,setIsLoaded] = React.useState(true);

   const [selected , setSelected] = React.useState("");
	return(
		<div className={classes.container}>

      
  
		  <ButtonAppBar />
         
        <div style={{marginTop:2+"vw",padding:2+"vw"}}>
        
        <div style={{display:"flex",flex:1,flexDirection:"row",alignItems:"center",alignItems:"center", position:"sticky",top:15+"vw" }}>
        {selected != ""  && <span onClick={()=> setSelected("") }><FaArrowLeft />back</span>}
        <h1 style={{color:CLR_RCARD2 ,color:CLR_HEAD,backgroundColor:"white",padding:2+"vw"}}>Settings</h1>
        <div style={{display:"flex",flex:1,flexDirection:"row-reverse",alignItems:"center" }}>

         <span style={{fontSize:20}}>{selected}</span>
         
         

        </div>
        
        </div>
       {selected == "" &&
        <>
        <div style={{fontSize:5+"vw"}}>Accounts</div>
         <NavButton name="Personal Info" onClick={()=>{ setSelected("Personal Info") }}/>
         <NavButton name="Business Account" onClick={()=>{ }}/>

         <div style={{fontSize:5+"vw"}}>Start renting</div>
         <NavButton name="Get Started" onClick={()=>{ }}/>
         <NavButton name="Learn About Renting" onClick={()=>{ }}/>
         <NavButton name="Promote" onClick={()=>{ }}/>

         <div style={{fontSize:5+"vw"}}>Support</div>
         <NavButton name="How It Works" onClick={()=>{ }}/>
         <NavButton name="Safety" onClick={()=>{ }}/>
         <NavButton name="Contact Support" onClick={()=>{ }}/>
         <NavButton name="Give Feedback" onClick={()=>{ }}/>

         <div style={{fontSize:5+"vw"}}>Legal</div>
         <NavButton name="Terms of Service" onClick={()=>{ }}/>

         </>
        }
        {selected == "Personal Info" && 
        <><Profile_Info  /></>}

{selected == "Business Account" && 
        <><Business_Account /></>}

{selected == "Get Started" && 
        <><Get_Started /> </>}

{selected == "Learn About Renting" && 
        <><Learn_About_Renting /></>}

{selected == "Promote" && 
        <><Promote /></>}

{selected == "How It Works" && 
        <><How_It_Works /></>}

{selected == "Safety" && 
        <><Safety /></>}

{selected == "Contact Support" && 
        <><Contact_Support /></>}

{selected == "Give Feedback" && 
        <><Give_Feedback /></>}
        
{selected == "Terms of Service" && 
        <><Terms_of_Service /> </>}
      </div>
		</div>
	);

}

function NavButton(props){
    const classes = useStyles();
    return(
        <div className={classes.nbuttonroot} onClick={props.onClick}> <a >{props.name}</a> </div> 
    )
}


function ChooseText(props){
    const [filteropen , setFilteropen] = useState(false);
    const [currvalue, setCurrvalue] = useState(props.value);


    return (
        <>
        {
            filteropen?
        
        <div style={{width:90+"%",borderColor:CLR_HEAD,borderStyle:"solid" ,borderRadius:"2vw", borderWidth:2, margin:"2vw" ,padding:"2vw" }}>
            <div style={{ fontSize:10 }}>{props.label}</div>
            <div placeholder='yourname'  style={{ borderColor:"white",borderStyle:"hidden",borderStyle:"hidden", flexDirection:"row",fontSize:15,height:8+"vw" , color:'black'   }}
          
          
          >{currvalue}</div>

                  
        </div>
    : <div style={{width:90+"%",borderColor:CLR_RCARD1,borderStyle:"solid" ,borderRadius:"2vw", borderWidth:2 , margin:"2vw",padding:"2vw" }}>
    <div style={{ fontSize:9 }}>{props.label}</div>
   
    <div placeholder='yourname'  style={{ borderColor:"white",borderStyle:"hidden",borderStyle:"hidden", flexDirection:"row",fontSize:15,height:8+"vw" , color:'black'   }}
           onClick={()=>{setFilteropen(true)}}
          
          >{currvalue}</div>
          
</div>
 }

<Modal  style={{zIndex:2000, flex:1 ,display:"flex" , display:"flex", justifyContent:"center",alignItems:"center" ,flexDirection:"row"  }}  
    show={filteropen} 
    backdrop={true} 
    onHide={()=>setFilteropen(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
         >
             <Modal.Body style={{flex:1 ,display:"flex" ,  flexDirection:"column" ,justifyContent:"center",alignItems:"center" ,}}><div style={{ flex:1 ,display:"flex" ,  flexDirection:"column" ,justifyContent:"center",alignItems:"center" ,backgroundColor:"white" , borderRadius:2+"vw" }}>
                 <div style={{height:10+"vw"}} onClick={()=>{ console.log("Male");setFilteropen(false);setCurrvalue("Male") }}>Male</div>
                 <div style={{height:10+"vw"}} onClick={()=>{ console.log("Female");setFilteropen(false);setCurrvalue("Female") }}>Female</div>
                 <div style={{height:10+"vw"}} onClick={()=>{ console.log("Others"); setFilteropen(false);;setCurrvalue("Others")}}>Others</div>
        </div></Modal.Body>
         </Modal>
         
   </>    )
   
}

function EditText(props){
    const [editing , setEditing] = useState(false);
    const [currvalue, setCurrvalue] = useState(props.value);

    if (props.disabled){
        return (
        
        <div style={{width:90+"%",borderColor:CLR_RCARD1,borderStyle:"solid" ,borderRadius:"2vw", borderWidth:2 , margin:"2vw",padding:"2vw" , backgroundColor:"lightgrey" }}>
        <div style={{display:"flex",}}>
            <div>
        <div style={{ fontSize:9 }}>{props.label}</div>
        <div placeholder='yourname'  style={{ borderColor:"white",borderStyle:"hidden",borderStyle:"hidden", flexDirection:"row",fontSize:15,height:8+"vw" , color:'black'   }}>
            {currvalue}
            
            </div>
            </div>
            <div style={{display:"flex",flex:1}} ></div>
            <FaEdit size={8+"vw"} color={CLR_HEAD} onClick={()=>{console.log("asdas"); }}/>
            </div>
              
    </div>);
    }
    return (
        <>
        {
            editing?
        
        <div style={{width:90+"%",borderColor:CLR_HEAD,borderStyle:"solid" ,borderRadius:"2vw", borderWidth:2, margin:"2vw" ,padding:"2vw" }}>
            <div style={{ fontSize:10 }}>{props.label}</div>
           
            <InputBase placeholder='yourname'  style={{ borderColor:"white",borderStyle:"hidden",borderStyle:"hidden", flexDirection:"row",fontSize:15, color:'black'  }}
                  
                  autoFocus
                  defaultValue={currvalue}
                    onBlur={()=>setEditing(false) }
                 onKeyPress={(e)=>{ console.log(e.key);  if (e.key=='Enter'){
                 }else{
                 }}}
                  onChange={(e)=>{ setCurrvalue(e.target.value); console.log(e.target.value);}} 
                  
                  ></InputBase>
                  
        </div>
    : <div style={{width:90+"%",borderColor:CLR_RCARD1,borderStyle:"solid" ,borderRadius:"2vw", borderWidth:2 , margin:"2vw",padding:"2vw" }}>
    <div style={{ fontSize:9 }}>{props.label}</div>
   
    <div placeholder='yourname'  style={{ borderColor:"white",borderStyle:"hidden",borderStyle:"hidden", flexDirection:"row",fontSize:15,height:8+"vw" , color:'black'   }}
           onClick={()=>{setEditing(true)}}
          
          >{currvalue}</div>
          
</div>
 }
   </>    )
   
}
function Profile_Info(props){ 

  
  return (
        <div style={{display:"flex" , flex:1 , justifyContent:"center" ,flexDirection:"column" ,alignItems:"center"  }} >
        <EditText label="first name" value="rahul" />
      <EditText label="last name" value="kumar" />

      <ChooseText label="Gender" value="Male" />

      <EditText label="email" value="kr7168799@gmail.com" disabled />
      
      </div>
  )
}

function Business_Account(props){
    return <>This is profile info</>
  }

  function Get_Started(props){
    return <>This is profile info</>
  }

  function Learn_About_Renting(props){
    return <>This is profile info</>
  }

  function Promote(props){
    return <>This is profile info</>
  }

  function How_It_Works(props){
    return <>This is profile info</>
  }

  function Safety(props){
    return <>This is profile info</>
  }

  function Contact_Support(props){
    return <>This is profile info</>
  }

  function Give_Feedback(props){
    return <>This is profile info</>
  }

  function Terms_of_Service(props){
    return <>This is profile info</>
  }