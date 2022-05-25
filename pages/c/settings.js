
import { Button, Input, InputBase, makeStyles, } from '@material-ui/core';
import { Business } from '@material-ui/icons';
import router from 'next/router';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import { storelocal } from '../../localstore';
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

      pinfo:{
        display:"flex",
          flex:1,
          flexWrap:"wrap",
          justifyContent:"center",
          height:10+"vh",
          marginBottom:2+"vw",
          width:100+"%",
        '@media (min-width:600px)':{
          width:50+"%",
          

       }
      },
      settElem:{
       
      '@media (min-width:600px)':{
         display:"flex",
         flex:1,
         flexWrap:"wrap",
         alignItems:"center",
         height:10+"vh",
         marginBottom:2+"vw"
      }
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
         height:100+"%",
         
         borderRadius:"10px",
         borderColor:CLR_HEAD,
         borderStyle:"solid",
         borderWidth:1+"px",
         
         justifyContent:"center",
         alignItems: "center",

         '@media (min-width:600px)':{
          display:"flex",
          flex:1,
          fontSize:"200%"
       }

        
        }
  }));


export default function SettingsPage(props){

  const classes = useStyles();
  const [isloaded,setIsLoaded] = React.useState(true);

   const [selected , setSelected] = React.useState("");
	return(
		<div className={classes.container}>

      
  
		 
         
        <div style={{padding:2+"vw"}} >
        
        <div style={{display:"flex",flex:1,flexDirection:"row",alignItems:"center",alignItems:"center", position:"sticky",top:0+"vw" , backgroundColor:"white",borderBottomWidth:1 , borderBottomStyle:"solid", borderColor:"lightgrey"  }}>
        {selected != ""  && <span onClick={()=> setSelected("") }><FaArrowLeft />back</span>}
        {selected == ""  && <span onClick={()=> router.back() }><FaArrowLeft /></span>}
        <div style={{color:CLR_RCARD2 ,color:CLR_HEAD,backgroundColor:"white",padding:2+"vw",flex:1,display:"flex" , fontSize:25}}>Settings</div>
       {selected != "" &&
        <div style={{display:"flex",flex:1,flexDirection:"row-reverse",alignItems:"center" }}>
         <span style={{fontSize:20 }}>{selected}</span>
        </div>
         }
        </div>
       {selected == "" &&
        <>
        <div className={classes.settElem}>
        <div >Accounts</div>
         <NavButton name="Personal Info" onClick={()=>{ setSelected("Personal Info") }}/>
         <NavButton name="Business Account" onClick={()=>{setSelected("Business Account") }}/>
         </div>

         <div className={classes.settElem}>
         <div >Start renting</div>
         <NavButton name="Start Renting" onClick={()=>{setSelected("Get Started") }}/>
         <NavButton name="Learn About Renting" onClick={()=>{ setSelected("Learn About Renting")}}/>
         <NavButton name="Promote" onClick={()=>{ setSelected("Promote")}}/>
         </div>

         <div className={classes.settElem}>
         <div >Support</div>
         <NavButton name="How It Works" onClick={()=>{setSelected("How It Works") }}/>
         <NavButton name="Safety" onClick={()=>{ setSelected("Safety")}}/>
         <NavButton name="Contact Support" onClick={()=>{setSelected("Contact Support") }}/>
         <NavButton name="Give Feedback" onClick={()=>{ setSelected("Give Feedback")}}/>
         </div>

         <div className={classes.settElem}>
         <div >Legal</div>
         <NavButton name="Terms of Service" onClick={()=>{ setSelected("Terms of Service")}}/>
         <NavButton name="Privacy Policy" onClick={()=>{ setSelected("Privacy Policy")}}/>
         </div>
         </>
        }
        {selected == "Personal Info" && 
        <><Profile_Info  /></>}

{selected == "Business Account" && 
        <><Business_Account /></>}

{selected == "Get Started" && 
        <><Get_Started /> </>}

{selected == "Learn About Renting" && 
        <><Learn_About_Renting setSelected={(e)=>{setSelected(e)}} /></>}

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

{selected == "Privacy Policy" && 
        <><Privacy_Policy /> </>}
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


export function ChooseText(props){
    const [filteropen , setFilteropen] = useState(false);
    const [currvalue, setCurrvalue] = useState(props.value);


    return (
        <>
        {
            filteropen?
        
        <div style={{width:90+"%",borderColor:CLR_RCARD1,borderStyle:"solid" ,borderRadius:"10px", borderWidth:2 , margin:"2%",padding:"2%" }}>
            <div style={{ fontSize:10 }}>{props.label}</div>
            <div placeholder='yourname'  style={{ borderColor:"white",borderStyle:"hidden",borderStyle:"hidden", flexDirection:"row",fontSize:15,height:8+"vw" , color:'black'   }}
          
          
          >{currvalue}</div>

                  
        </div>
    : <div style={{width:90+"%",borderColor:CLR_RCARD1,borderStyle:"solid" ,borderRadius:"10px", borderWidth:2 , margin:"2%",padding:"2%" }}>
    <div style={{ fontSize:9 }}>{props.label}</div>
   
    <div placeholder='yourname'  style={{ borderColor:"white",borderStyle:"hidden",borderStyle:"hidden", flexDirection:"row",fontSize:15 , color:'black'   }}
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
             <Modal.Body style={{flex:1 ,display:"flex" ,  flexDirection:"column" ,justifyContent:"center",alignItems:"center" ,}}><div style={{ flex:1 ,display:"flex" ,  flexDirection:"column" ,justifyContent:"center",alignItems:"center" ,backgroundColor:"white" , borderRadius:"10px" }}>
                 <div style={{height:10+"vw"}} onClick={()=>{ console.log("Male");setFilteropen(false);setCurrvalue("Male") }}>Male</div>
                 <div style={{height:10+"vw"}} onClick={()=>{ console.log("Female");setFilteropen(false);setCurrvalue("Female") }}>Female</div>
                 <div style={{height:10+"vw"}} onClick={()=>{ console.log("Others"); setFilteropen(false);;setCurrvalue("Others")}}>Others</div>
        </div></Modal.Body>
         </Modal>
         
   </>    )
   
}

export function EditText(props){
    const [editing , setEditing] = useState(false);
    const [currvalue, setCurrvalue] = useState(props.value);

    if (props.disabled){
        return (
        
        <div style={{width:90+"%",borderColor:CLR_RCARD1,borderStyle:"solid" ,borderRadius:"10px", borderWidth:2 , margin:"2%",padding:"2%" , backgroundColor:"lightgrey" }}>
        <div style={{display:"flex",}}>
            <div>
        <div style={{ fontSize:9 }}>{props.label}</div>
        <div  style={{ borderColor:"white",borderStyle:"hidden",borderStyle:"hidden", flexDirection:"row",fontSize:15 , color:'black'   }}>
            {currvalue}
            
            </div>
            </div>
            <div style={{display:"flex",flex:1}} ></div>
            <FaEdit  color={CLR_HEAD} onClick={()=>{console.log("asdas"); }}/>
            </div>
              
    </div>);
    }
    return (
        <>
        {
            editing?
        
        <div style={{width:90+"%",borderColor:CLR_HEAD,borderStyle:"solid" ,borderRadius:"10px", borderWidth:2, margin:"2%" ,padding:"2%" }}>
            <div style={{ fontSize:10 }}>{props.label}</div>
           
            <InputBase  placeholder={props.placeholder}  style={{ borderColor:"white",borderStyle:"hidden",borderStyle:"hidden", flexDirection:"row",fontSize:15, color:'black'  }}
                  
                  autoFocus
                  defaultValue={currvalue}
                    onBlur={()=>setEditing(false) }
                 onKeyPress={(e)=>{ console.log(e.key);  if (e.key=='Enter'){
                   setEditing(false)
                 }else{
                 }}}
                  onChange={(e)=>{ setCurrvalue(e.target.value); console.log(e.target.value);}} 
                  
                  ></InputBase>
                  
        </div>
    : <div style={{width:90+"%",borderColor:CLR_RCARD1,borderStyle:"solid" ,borderRadius:"10px", borderWidth:2 , margin:"2%",padding:"2%" }}>
    <div style={{ fontSize:9 }}>{props.label}</div>
   
    <div placeholder='yourname'  style={{ borderColor:"white",borderStyle:"hidden",borderStyle:"hidden", flexDirection:"row",fontSize:15, color:'black'   }}
           onClick={()=>{setEditing(true)}}
          
          >{currvalue}</div>
          
</div>
 }
   </>    )
   
}
function Profile_Info(props){ 
    const classes = useStyles()
    const [changed , setChanged ] = React.useState(false);
  
  return (
        <div style={{display:"flex" , flex:1 , justifyContent:"center" ,flexDirection:"column" ,alignItems:"center"  }} >
          <div className={classes.pinfo} >
        <EditText label="first name" value="rahul" />
      <EditText label="last name" value="kumar" />

      <ChooseText label="Gender" value="Male" />

      <EditText label="email" value="kr7168799@gmail.com" disabled />

      </div>
      
       <div style={{display:"flex",backgroundColor:"white",width:100+"vw" ,bottom:0,padding:2+"vw"}}>
           { changed?<Button style={{backgroundColor:CLR_HEAD ,width:100+"%",color:"white"}} >Submit</Button> :
           <Button style={{backgroundColor:"lightgrey" ,width:100+"%",color:"white"}} >Submit</Button>
           }
       </div>
      </div>
  )
}

function Business_Account(props){

    const [isBusiness , setIsBusiness] = useState(false);
    React.useEffect(() =>{
        // setIsBusiness(storelocal("isbusinessuser")) 
    } )

    if (!isBusiness){
        return ( 
            <div style={{display:"flex" , flex:1 , justifyContent:"center" ,flexDirection:"column" ,alignItems:"center"  }} >
            <h5>You dont have a business account</h5>
            <Button style={{backgroundColor:CLR_RCARD2}} onClick={()=> { console.log("create business account")} }>Create business Account</Button>
            </div>
        )
    }
    return (
        <div style={{display:"flex" , flex:1 , justifyContent:"center" ,flexDirection:"column" ,alignItems:"center"  }} >
            <h5>You dont have a business account</h5>
            <Button style={{backgroundColor:CLR_RCARD2}} onClick={()=> { console.log("create business account")} }>Create business Account</Button>
            </div>
    ); 
  }

  function Get_Started(props){
    return (
        <div style={{display:"flex" , flex:1 , justifyContent:"center" ,flexDirection:"column" ,alignItems:"center"  }} >
        <h5>Purpose</h5>
        <div >Here we have to write why this app was made and the purpose of it and How to start renting</div>
        <h5>Registration</h5>
        <div>Work flow of registrations</div>
        <Button style={{backgroundColor:CLR_RCARD2}} onClick={()=> { console.log("create business account")} }>Register as a Owner</Button>  
        </div>
    )
  }

  function Learn_About_Renting(props){

    return (
        <div style={{display:"flex" , flex:1 , justifyContent:"center" ,flexDirection:"column" ,alignItems:"center"  }} >
        <h5>Why Rent</h5>
        <div >Here we have to write why renting things makes and saves money as well as reduces the spending</div>

        <Button style={{backgroundColor:CLR_RCARD2}} onClick={()=> { props.setSelected("Get Started") }} >Try Renting now</Button>  
        </div>
    )
  }

  function Promote(props){
    return (
        <div style={{display:"flex" , flex:1 , justifyContent:"center" ,flexDirection:"column" ,alignItems:"center"  }} >
        <h5>Be A Part of It</h5>
        <div >Help us Reach every individual so that we make an impact</div>

        <div style={{backgroundColor:CLR_RCARD2}} >Share US on</div>  
        </div>
    )
  }

  function How_It_Works(props){
    return (
        <div style={{display:"flex" , flex:1 , justifyContent:"center" ,flexDirection:"column" ,alignItems:"center"  }} >
        <h5>Steps to start Renting with SMOR</h5>
        <div >Here we will be pointing how to use the app easily</div>
        </div>
    )
  }

  function Safety(props){
    return (
        <div style={{display:"flex" , flex:1 , justifyContent:"center" ,flexDirection:"column" ,alignItems:"center"  }} >
        <h5>Safety of property</h5>
        <div >Here we will get to know the steps to be followed to ensure a safe exchange of stuff</div>
        </div>
    )
  }

  function Contact_Support(props){
    return (
        <div style={{display:"flex" , flex:1 , justifyContent:"center" ,flexDirection:"column" ,alignItems:"center"  }} >
        <h5>Facing any Problems</h5>
        <div>Email us at</div>
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=kr7168799@gmail.com" >kr7168799@gmail.com</a>
        </div>
    )
  }

  function Give_Feedback(props){
    return (
        <div style={{display:"flex" , flex:1 , justifyContent:"center" ,flexDirection:"column" ,alignItems:"center"  }} >
        <h5>We always Want to improve</h5>
        <div>If you have any suggestions or feedbacks please let us know by typing below</div>
        <InputBase placeholder='your feedback here'  style={{ width:100+"%"  , borderColor:"grey",borderStyle:"solid" , flexDirection:"row",fontSize:15, color:'black'  }}
                  multiline
                  autoFocus
                  
                    onBlur={()=>{} }
                 onKeyPress={(e)=>{ console.log(e.key);  if (e.key=='Enter'){
                 }else{
                 }}}
                  onChange={(e)=>{ console.log(e.target.value);}} 
                  
                  ></InputBase>
        </div>
    )
  }

  function Terms_of_Service(props){
      return(
    <div style={{display:"flex" , flex:1 , justifyContent:"center" ,flexDirection:"column" ,alignItems:"center"  }} >

    <h5>Terms of Service</h5>
     <div>all terms and services will be here</div>
    </div>
      );
  }

  
  function Privacy_Policy(props){
    return(
  <div style={{display:"flex" , flex:1 , justifyContent:"center" ,flexDirection:"column" ,alignItems:"center"  }} >

  <h5>Privacy Policy</h5>
   <div>all policies will be here</div>
  </div>
    );
}