
import { Avatar, Button, Input, InputBase, makeStyles, } from '@material-ui/core';
import { Business } from '@material-ui/icons';
import router, { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import { getobjlocal, storelocal } from '../localstore';
import { CLR_FBAR, CLR_HEAD, CLR_RCARD1, CLR_RCARD2 } from '../themes';

import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu'; 
import { AuthContext } from '../context';
import { Drawercomponent } from '../components/headbar';
import { convertToJson, onRefresh } from '../constants';

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
         height:10+"vw",
         
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

  const [drawerState,setDrawerState] = React.useState(false);
   
   const authContext = useContext(AuthContext);


   console.log(authContext);
  const toogleDstate = () => {
      setDrawerState(!drawerState); 
	}

  useEffect(()=>{
    onRefresh(authContext);
    authContext.checkType()
  })


  

  // const [isloaded,setIsLoaded] = React.useState(true);

   const [selected , setSelected] = React.useState("");
	return(
		<div className={classes.container}>

      
  
		 
         
        <div style={{padding:2+"vw"}} >
        
        <div style={{display:"flex",flex:1,flexDirection:"row",alignItems:"center",alignItems:"center", position:"sticky",top:0+"vw" , backgroundColor:"white",borderBottomWidth:1 , borderBottomStyle:"solid", borderColor:"lightgrey", zIndex:"2000"  }}>
        {selected != ""  && <span onClick={()=> setSelected("") }><FaArrowLeft />back</span>}
        {selected == ""  && <span onClick={()=> router.back() }><FaArrowLeft /></span>}
        <div style={{color:CLR_RCARD2 ,color:CLR_HEAD,backgroundColor:"white",padding:2+"vw",flex:1,display:"flex" , fontSize:25}}>Settings</div>
       {selected != "" &&
        <div style={{display:"flex",flex:1,flexDirection:"row-reverse",alignItems:"center" }}>
         <span style={{fontSize:20 }}>{selected}</span>
        </div>
         }
   
  
          <IconButton edge="start"  color="inherit" aria-label="menu"  onClick={()=>toogleDstate()} >
    { authContext.isLoggedIn ? <Avatar src={convertToJson(getobjlocal("userdata")[0]["metadata"])["photoURL"]} style={{ width: 30, height: 30 }} /> : <MenuIcon /> }
    <Drawer anchor={"right"} open={drawerState} style={{zIndex:2100}}  onClose={()=>console.log("closed")} variant='temporary'>
   <Drawercomponent />
   
        </Drawer>
        </IconButton>

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
         {/* <NavButton name="Start Renting" onClick={()=>{setSelected("Get Started") }}/> */}
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
                    onBlur={(e)=>{setEditing(false);props.onSet(e.target.value); }}
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
          
          >{(currvalue != undefined?currvalue:props.placeholder)}</div>
          
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
            <svg width="100vw" height="660" viewBox="0 0 757 660" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="757" height="660" fill="white"/>
<path fillRule="evenodd" clipRule="evenodd" d="M592 221C621.271 221 645 197.271 645 168C645 138.729 621.271 115 592 115C562.729 115 539 138.729 539 168C539 197.271 562.729 221 592 221Z" fill="#F2F2F2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M592 129C593.657 129 595 127.657 595 126C595 124.343 593.657 123 592 123C590.343 123 589 124.343 589 126C589 127.657 590.343 129 592 129Z" fill="black" fill-opacity="0.1"/>
<path fillRule="evenodd" clipRule="evenodd" d="M550 171C551.657 171 553 169.657 553 168C553 166.343 551.657 165 550 165C548.343 165 547 166.343 547 168C547 169.657 548.343 171 550 171Z" fill="black" fill-opacity="0.1"/>
<path fillRule="evenodd" clipRule="evenodd" d="M634 171C635.657 171 637 169.657 637 168C637 166.343 635.657 165 634 165C632.343 165 631 166.343 631 168C631 169.657 632.343 171 634 171Z" fill="black" fill-opacity="0.1"/>
<path fillRule="evenodd" clipRule="evenodd" d="M592 213C593.657 213 595 211.657 595 210C595 208.343 593.657 207 592 207C590.343 207 589 208.343 589 210C589 211.657 590.343 213 592 213Z" fill="black" fill-opacity="0.1"/>
<path fillRule="evenodd" clipRule="evenodd" d="M592 132L594 167H590L592 132Z" fill="#AFB9C5"/>
<path fillRule="evenodd" clipRule="evenodd" d="M609.699 185.698L591.314 170.142L594.142 167.314L609.699 185.698Z" fill="#AFB9C5"/>
<path fillRule="evenodd" clipRule="evenodd" d="M592 172C594.209 172 596 170.209 596 168C596 165.791 594.209 164 592 164C589.791 164 588 165.791 588 168C588 170.209 589.791 172 592 172Z" fill="#C5CFD6"/>
<g opacity="0.345889">
<path fillRule="evenodd" clipRule="evenodd" d="M535.794 446.385C528.899 369.336 158.964 220.624 90.2873 293.603C21.6103 366.582 87.6347 503.545 231.556 538.617C375.478 573.69 542.688 523.434 535.794 446.385Z" fill="#F2F2F2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M307.144 496.448C313.32 430.992 644.692 304.655 706.21 366.654C767.728 428.652 752.157 559.059 623.238 588.854C494.319 618.65 300.968 561.904 307.144 496.448Z" fill="#DDE3E9"/>
</g>
<path fillRule="evenodd" clipRule="evenodd" d="M108.5 239.673C131.972 239.673 151 229.6 151 217.173C151 204.747 131.972 194.673 108.5 194.673C85.0279 194.673 66 204.747 66 217.173C66 229.6 85.0279 239.673 108.5 239.673Z" fill="#F2F2F2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M158 232.673C158 205.059 135.838 182.673 108.5 182.673C81.1619 182.673 59 205.059 59 232.673" fill="#DDE3E9"/>
<rect x="106" y="30" width="5" height="160" fill="#DDE3E9"/>
<g opacity="0.7">
<path fillRule="evenodd" clipRule="evenodd" d="M186 189C203.545 189 217.768 180.87 217.768 170.842C217.768 160.814 203.545 152.684 186 152.684C168.455 152.684 154.232 160.814 154.232 170.842C154.232 180.87 168.455 189 186 189Z" fill="#F2F2F2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M223 183.351C223 161.066 206.435 143 186 143C165.565 143 149 161.066 149 183.351" fill="#DDE3E9"/>
<rect x="184" y="30" width="5" height="136" fill="#DDE3E9"/>
</g>
<path d="M618 264.236L636.568 245.66C639.692 242.535 644.759 242.535 647.884 245.66L697.316 295.113C700.315 298.114 702 302.182 702 306.424V634" stroke="#CBCBCB" strokeWidth="8"/>
<rect x="672" y="633" width="59" height="7" rx="3" fill="#AFB9C5"/>
<path d="M582.499 253.335C595.386 240.447 616.28 240.447 629.168 253.335V253.335C642.055 266.222 642.055 287.116 629.168 300.004L609.369 319.803L562.7 273.134L582.499 253.335Z" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M582.228 300.527C595.115 313.414 607.62 321.804 610.159 319.265C612.697 316.727 604.308 304.222 591.42 291.335C578.533 278.447 566.028 270.058 563.49 272.596C560.951 275.135 569.341 287.64 582.228 300.527Z" fill="#F2F2F2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M97.258 402.173C100.123 401.823 103.18 401.947 105.844 403.077C111.509 405.482 113.119 412.174 113.041 417.614C112.957 423.468 111.714 429.863 116.165 434.58C118.211 436.748 120.756 438.408 122.765 440.617C124.912 442.977 126.597 445.677 127.844 448.577C130.134 453.903 131.258 460.167 129.164 465.754C127.32 470.674 122.681 475.114 123.683 480.708C124.729 486.543 130.612 491.004 134.29 495.351C138.453 500.269 142.286 506.556 142.916 513.006C143.519 519.188 140.828 525.44 136.699 530.113C128.448 539.451 116.045 544.028 103.54 544C98.23 543.988 92.2186 543.748 87.6366 540.895C86.2204 540.013 85.4733 539.023 84.6315 537.648C83.8767 536.414 82.8796 535.612 81.7255 534.739C79.1899 532.822 77.3587 530.239 76.1901 527.347C71.6522 516.114 75.2792 502.218 81.6312 492.243C83.1364 489.88 84.3686 487.605 83.6374 484.789C82.8744 481.848 80.999 479.196 79.3403 476.669C77.7011 474.17 75.8299 471.787 74.5488 469.087C73.207 466.257 72.8292 463.294 73.0662 460.198C73.5118 454.381 76.0227 449.013 79.5777 444.336C83.0017 439.83 87.0221 435.518 87.0311 429.615C87.041 423.357 82.8577 417.791 84.6399 411.429C85.3778 408.795 86.86 406.092 89.2486 404.513C91.5393 402.998 94.5639 402.502 97.258 402.173Z" fill="#DDE3E9"/>
<path fillRule="evenodd" clipRule="evenodd" d="M95.3862 412.176C95.4399 411.336 96.4367 410.832 97.2215 411.051C98.2545 411.34 98.2346 412.305 98.2073 413.165C98.1237 415.808 98.5063 418.377 99.1417 420.942C100.462 426.274 102.903 431.186 104.836 436.308C106.768 441.425 107.675 446.709 106.542 452.124C105.473 457.23 103.795 462.203 102.701 467.315C101.738 471.821 100.712 476.573 102.18 481.067C103.592 485.393 106.714 488.916 108.962 492.825C113.617 500.918 115.681 509.896 115.957 519.135C116.085 523.425 115.97 527.755 114.975 531.963C114.402 534.386 113.632 537.66 111.556 539.333C110.599 540.105 108.961 540.371 108.155 539.229C107.399 538.158 108.062 536.499 108.303 535.357C109.343 530.413 109.552 525.361 109.303 520.342C109.062 515.48 108.487 510.626 106.957 505.982C105.537 501.673 103.379 497.802 100.84 494.032C98.2521 490.191 95.562 486.341 94.4928 481.789C93.4065 477.166 94.289 472.462 95.4691 467.927C96.7171 463.131 98.3518 458.472 100.042 453.805C101.689 449.258 102.272 444.955 101.363 440.196C99.5672 430.794 94.7598 421.968 95.3862 412.176Z" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M172.892 413.582C176.437 414.659 179.958 416.395 182.485 419.118C187.858 424.909 186.209 433.661 183.243 440.053C180.05 446.933 175.212 453.849 177.94 461.743C179.193 465.372 181.301 468.659 182.49 472.316C183.761 476.224 184.309 480.294 184.239 484.372C184.11 491.862 182.118 499.855 176.708 505.373C171.945 510.232 164.158 513.07 162.377 520.206C160.518 527.651 165.061 535.988 167.078 543.041C169.36 551.024 170.533 560.453 167.862 568.409C165.303 576.034 158.842 582.028 151.528 585.406C136.915 592.156 119.949 591.117 105.296 584.578C99.0748 581.801 92.1506 578.391 88.2845 572.633C87.0897 570.853 86.7364 569.294 86.476 567.23C86.2426 565.378 85.4972 563.911 84.6048 562.278C82.644 558.692 81.8618 554.684 82.0198 550.656C82.6345 535.011 94.2336 520.464 106.956 511.972C109.971 509.96 112.618 507.912 113.249 504.2C113.909 500.325 113.111 496.213 112.501 492.361C111.899 488.554 110.964 484.763 110.889 480.902C110.811 476.858 111.933 473.157 113.848 469.619C117.445 462.972 123.227 457.93 129.87 454.247C136.267 450.7 143.262 447.692 146.393 440.715C149.712 433.32 147.747 424.561 153.2 417.964C155.458 415.233 158.625 412.807 162.262 412.182C165.749 411.583 169.558 412.57 172.892 413.582Z" fill="#DDE3E9"/>
<path fillRule="evenodd" clipRule="evenodd" d="M165.651 425.811C166.154 424.844 167.584 424.769 168.387 425.44C169.443 426.324 168.914 427.456 168.432 428.46C166.95 431.547 166.052 434.789 165.452 438.159C164.204 445.166 164.485 452.262 164.063 459.341C163.642 466.414 161.935 473.147 157.774 478.965C153.85 484.452 149.283 489.462 145.327 494.943C141.841 499.773 138.153 504.863 137.516 510.954C136.901 516.817 138.707 522.626 139.288 528.434C140.492 540.457 138.204 552.171 133.688 563.257C131.591 568.405 129.189 573.472 125.821 577.933C123.882 580.503 121.267 583.977 117.963 584.869C116.44 585.281 114.385 584.739 114.042 582.964C113.718 581.298 115.363 579.682 116.242 578.455C120.047 573.146 122.938 567.273 125.275 561.198C127.54 555.314 129.41 549.265 130.053 542.963C130.649 537.116 130.153 531.401 129.158 525.606C128.144 519.701 127.015 513.732 128.149 507.781C129.3 501.736 132.795 496.628 136.55 491.876C140.521 486.85 144.873 482.19 149.293 477.549C153.6 473.027 156.536 468.238 157.966 462.126C160.79 450.049 159.791 437.078 165.651 425.811Z" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M63.306 458C69.2003 458 74.3823 461.124 77.9531 465.558C82.133 470.748 82.9772 477.086 84.6745 483.272C85.5191 486.35 86.9717 489.406 89.5174 491.498C91.8327 493.4 94.7721 493.78 97.5435 494.71C103.082 496.567 107.555 501.041 109.321 506.499C111.476 513.158 109.193 519.873 109.586 526.622C109.947 532.819 116.058 536.685 120.974 539.656C125.821 542.586 130.189 545.328 131.649 551.035C133.197 557.088 133.716 563.844 131.572 569.823C128.002 579.779 117.552 584.163 107.456 584.842C98.2932 585.459 86.7719 584.491 79.8907 577.84C75.773 573.86 74.2819 568.293 74.4669 562.755C74.5818 559.311 75.264 555.899 76.146 552.571C76.7711 550.213 77.6157 547.864 77.8563 545.427C78.4959 538.942 72.5026 537.697 67.401 535.916C60.9183 533.654 56.3799 529.38 53.224 523.425C50.285 517.881 49.0519 511.658 50.8137 505.554C51.7135 502.437 53.3456 499.61 55.559 497.205C56.5334 496.146 57.9066 495.263 58.7861 494.151C59.6069 493.112 59.4282 491.766 59.1453 490.55C57.8373 484.931 53.762 480.278 52.3045 474.668C50.9887 469.605 51.7665 463.304 56.3954 460.038C58.3953 458.627 60.8616 458.016 63.306 458Z" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M71.3377 472.641C77.585 479.296 79.2831 488.325 79.7815 497.076C80.0606 501.983 79.7701 507.159 81.2118 511.919C82.4454 515.993 85.3373 519.107 88.3183 522.051C94.3188 527.975 101.011 533.999 102.766 542.574C103.796 547.606 103.101 552.804 104.524 557.78C105.817 562.304 108.096 566.748 110.867 570.568C113.098 573.645 116.004 576 118.443 578.867C119.187 579.743 120.253 581.031 119.946 582.267C119.586 583.714 117.743 584.172 116.435 583.945C113.386 583.415 110.819 580.503 108.825 578.386C105.91 575.291 103.432 571.962 101.419 568.227C99.1832 564.08 97.3833 559.679 96.6142 555.026C95.8161 550.199 96.2133 545.168 94.3909 540.535C91.3242 532.74 83.886 528.14 78.5082 522.064C71.8077 514.494 72.807 505.072 73.4933 495.759C73.8703 490.641 74.2451 484.862 71.6591 480.189C70.672 478.406 68.4711 476.743 68.0467 474.715C67.6579 472.858 69.7797 470.981 71.3377 472.641Z" fill="#AFB9C5"/>
<path fillRule="evenodd" clipRule="evenodd" d="M78.0004 582C78.0004 620.058 84.2112 640 117 640C149.789 640 156 620.058 156 582H78.0004Z" fill="#89C5CC"/>
<rect x="213" y="527" width="38" height="9" rx="2" fill="#AFB9C5"/>
<path fillRule="evenodd" clipRule="evenodd" d="M230.217 454H232H233H234.783C235.301 469.419 237.707 484.085 242 498H248.5C257.06 498 264 504.94 264 513.5C264 522.06 257.06 529 248.5 529H215.5C206.94 529 200 522.06 200 513.5C200 504.94 206.94 498 215.5 498H223C229.44 477.128 230.217 454 230.217 454Z" fill="#DDE3E9"/>
<path fillRule="evenodd" clipRule="evenodd" d="M196.622 384.679C196.622 384.679 213.811 383 231 383C248.189 383 265.378 384.679 265.378 384.679L270 464.133C270 464.133 250.5 466 231 466C211.5 466 192 464.133 192 464.133L196.622 384.679Z" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M169 640V558V536H190H273H294V558V640H273V558H190V640H169Z" fill="#F2F2F2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M587.381 358.208C596.214 379.197 611.229 393.781 619.182 415.605C623.898 428.547 625.864 442.62 625.983 457.032C626.048 464.86 625.911 472.694 625.875 480.522C625.839 488.156 625.632 495.741 624.984 503.327C624.332 510.952 623.603 518.487 623.282 526.159C623.031 532.137 622.917 539.091 620.891 544.544C619.279 548.881 615.183 549.516 614.097 544.256C613.493 541.333 613.569 538.068 613.636 535.063C613.721 531.208 613.945 527.359 614.06 523.504C614.519 508.036 613.923 492.566 614.235 477.092C614.539 461.973 616.482 446.871 614.332 431.853C612.556 419.452 608.046 408.802 602.862 398.593C597.874 388.771 592.445 379.187 589.075 368.014C588.107 364.806 587.359 361.481 587 358.03C587.157 357.957 587.284 358.016 587.381 358.208Z" fill="#C1DEE2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M584.974 399.617C586.723 400.88 587.7 402.728 588.882 404.551C590.352 406.817 592.081 408.863 593.551 411.131C596.615 415.86 599.308 420.879 602.102 425.799C607.406 435.137 611.433 445.091 613.427 455.895C615.495 467.092 616.052 478.648 616.919 490.012C617.839 502.056 618.765 514.188 618.887 526.279C618.942 531.696 619.235 537.446 618.584 542.825C618.179 546.173 616.668 549.027 613.261 549C606.025 548.942 602.627 540.927 601.208 534.354C599.119 524.674 598.702 514.393 599.033 504.494C599.432 492.558 601.504 480.802 602.4 468.912C603.35 456.325 602.814 443.96 598.486 432.109C596.3 426.12 593.763 420.274 591.484 414.325C590.514 411.792 589.719 409.19 588.409 406.831C586.951 404.208 585.142 401.826 584 399C584.324 399.206 584.649 399.411 584.974 399.617Z" fill="#89C5CC"/>
<path fillRule="evenodd" clipRule="evenodd" d="M668.334 374.518C668.556 374.345 668.778 374.173 669 374C668.361 376.693 667.207 378.88 666.324 381.341C665.531 383.554 665.129 386.058 664.595 388.477C663.34 394.158 661.89 399.711 660.706 405.44C658.36 416.777 658.804 428.99 660.342 441.568C661.795 453.45 664.092 465.313 665.187 477.192C666.095 487.043 666.485 497.202 665.619 506.601C665.031 512.984 663.103 520.606 657.848 519.962C655.374 519.659 654.084 516.681 653.564 513.32C652.729 507.922 652.554 502.246 652.229 496.878C651.502 484.896 651.358 472.951 651.214 461.092C651.078 449.904 650.705 438.494 651.452 427.587C652.173 417.063 654.428 407.58 657.653 398.83C659.351 394.22 660.97 389.502 662.878 385.108C663.793 383.001 664.911 381.139 665.827 379.033C666.563 377.339 667.148 375.601 668.334 374.518Z" fill="#C1DEE2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M587.209 434.302C588.166 432.695 590.272 437.993 590.593 438.66C590.457 438.328 590.321 437.997 590.184 437.667C592.083 440.825 593.821 444.113 594.901 447.734C595.97 451.319 596.888 454.977 597.891 458.587C599.774 465.361 602.202 471.943 603.907 478.778C605.569 485.438 605.988 491.986 605.585 498.875C605.167 506.035 604.911 513.306 605.399 520.462C605.632 523.88 606.743 527.064 607.504 530.354C608.266 533.648 608.866 536.986 609.767 540.239C609.974 539.815 610 541.232 610 541.339C609.994 542.152 609.881 542.833 609.619 543.604C608.948 545.586 607.691 547.269 605.778 547.816C602.322 548.803 599.112 545.659 597.998 542.339C596.399 537.575 595.517 532.311 594.755 527.304C594.057 522.713 593.891 518.094 594.099 513.44C594.508 504.261 596.169 495.202 596.618 486.026C597.107 476.036 595.128 466.649 593.471 456.925C592.673 452.239 591.91 447.598 590.356 443.134C589.727 441.326 588.907 439.731 588.048 438.061C587.558 437.112 586.569 435.418 587.209 434.302Z" fill="#C1DEE2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M615.252 418.697C614.856 430.142 614.172 441.5 612.646 452.824C611.089 464.38 609.3 475.897 607.802 487.463C606.343 498.722 604.815 510.168 605.018 521.585C605.168 529.993 603.774 544.219 613.113 548.369C622.572 552.572 624.601 534.623 625.222 528.699C626.412 517.333 626.027 505.847 625.449 494.419C624.856 482.689 623.866 471.02 622.64 459.334C621.277 446.353 620.208 433.314 619.349 420.296C618.925 413.857 618.82 407.429 618.937 400.988C619.048 394.911 618.817 388.77 616.656 383C616.543 383.082 616.431 383.164 616.318 383.246" fill="#69A1AC"/>
<path fillRule="evenodd" clipRule="evenodd" d="M664.083 454.955C662.382 457.433 660.667 459.887 659.061 462.512C656.186 467.209 653.587 472.432 652.805 479.147C651.169 493.2 652.481 508.379 652.798 522.863C652.863 525.822 652.489 528.693 653.655 531.51C654.713 534.064 656.691 536.01 658.576 536C662.611 535.977 661.995 526.095 662.002 521.746C662.014 514.123 661.159 506.422 661.233 498.806C661.306 491.26 661.765 483.694 662.859 476.528C663.967 469.275 665.589 462.309 667.729 455.81C668.026 454.908 670.158 447.937 668.144 449.139" fill="#89C5CC"/>
<path fillRule="evenodd" clipRule="evenodd" d="M646.262 380C643.609 380 643.625 393.226 643.546 394.925C643.257 401.055 643.325 407.188 643.143 413.319C642.744 426.701 642.254 440.2 640.243 453.426C639.161 460.547 637.907 467.636 636.557 474.702C635.204 481.789 633.387 488.867 632.497 496.044C631.642 502.943 632.125 509.977 632.242 516.91C632.359 523.885 632.57 530.874 633.484 537.788C633.709 539.494 633.974 541.195 634.257 542.891C634.492 544.305 634.355 546.058 634.754 547.401C635.393 549.552 638.133 550.256 639.978 549.92C644.97 549.009 648.159 542.74 649.865 538.16C652.043 532.311 653.199 525.967 654.339 519.804C655.631 512.821 656.388 505.732 656.743 498.623C657.466 484.175 656.539 469.712 655.504 455.31C654.928 447.301 654.263 439.327 653.246 431.367C652.232 423.441 650.932 415.55 650.086 407.601C649.471 401.825 648.865 396.04 648.467 390.241C648.371 388.859 648.291 380 646.262 380" fill="#69A1AC"/>
<path fillRule="evenodd" clipRule="evenodd" d="M642.941 476.139C642.508 462.253 636.927 401.259 635.657 384.467C635.339 380.264 632.282 362.765 631.885 358C630.81 359.347 630.901 380.309 630.913 385.126C630.926 389.891 630.335 394.576 630.031 399.315C629.721 404.151 622.572 466.601 621.645 471.247C619.799 480.491 618.564 489.976 617.611 499.428C616.683 508.639 615.24 518.358 616.482 527.618C616.767 529.75 617.219 531.848 617.955 533.806C618.749 535.922 619.294 537.879 619.932 540.093C620.958 543.659 622.815 546.789 625.668 548.262C631.517 551.281 634.658 544.447 636.251 538.497C638.793 528.995 640.426 519.338 641.191 509.359C642.037 498.318 643.287 487.255 642.941 476.139" fill="#89C5CC"/>
<rect x="581" y="517" width="91" height="91" rx="2" fill="white"/>
<rect x="571" y="527" width="10" height="113" rx="2" fill="#C5CFD6"/>
<rect x="621" y="527" width="10" height="113" rx="2" fill="#C5CFD6"/>
<rect x="672" y="527" width="10" height="113" rx="2" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M391.935 358.244C398.411 362.147 404.774 364.033 407.76 363.263C415.25 361.333 415.938 333.935 410.143 323.134C404.349 312.333 374.558 307.625 373.057 329.025C372.536 336.453 375.654 343.081 380.262 348.49L372 387H396L391.935 358.244Z" fill="#B28B67"/>
<path fillRule="evenodd" clipRule="evenodd" d="M378.418 353.308C375.406 339.906 366.825 330.771 368.135 324.782C369.446 318.792 375.121 317.332 375.121 317.332C375.121 317.332 378.057 305.457 394.056 307.23C410.055 309.004 419.819 315.648 415.602 330.268C411.726 330.268 407.046 328.866 400.576 331.268C397.496 332.411 396.17 338.358 396.17 338.358H393.246C393.246 338.358 388.989 331.301 384.851 333.171C380.713 335.042 382.97 342.259 382.97 342.259L381.529 353.308H378.418Z" fill="#191847"/>
<path fillRule="evenodd" clipRule="evenodd" d="M328.623 512H405.877L416 636H301L328.623 512Z" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M328.623 512H352.383L366.604 636H301L328.623 512Z" fill="black" fill-opacity="0.1"/>
<path fillRule="evenodd" clipRule="evenodd" d="M448.323 536.566C439.642 554.978 426.077 599.672 426.077 599.672L437.593 604.934C437.593 604.934 466.814 557.952 484.672 525.836C483.84 533.066 482.993 541.206 482.208 549.763C480.347 570.033 482.207 613.827 483.208 626.477C483.837 634.428 494.64 632.762 495.648 626.457C495.819 625.389 496.515 621.639 497.554 616.045C502.647 588.613 515.977 516.818 516 499.238C516.01 492.165 502.19 485.81 493.953 490.756C488.296 484.719 477.588 481.24 471.436 491.212C467.525 497.552 458.233 515.55 448.323 536.566Z" fill="#B28B67"/>
<path fillRule="evenodd" clipRule="evenodd" d="M426.9 583.125L466.427 489.487C475.897 474.255 502.446 492.587 499.217 501.422C491.885 521.479 454.6 586.414 452.415 592.39L426.9 583.125Z" fill="#1F28CF"/>
<path fillRule="evenodd" clipRule="evenodd" d="M427.664 594.185C426.971 593.241 425.63 593.017 424.734 593.771C423.099 595.146 420.748 597.264 419.899 598.734C418.547 601.076 416.733 606.021 416.733 606.021C419.45 607.59 465.578 634.222 465.578 634.222C465.578 634.222 471.116 629.027 467.304 626.157C463.491 623.286 461.012 621.315 461.012 621.315L444.152 598.087C443.821 597.631 443.179 597.538 442.733 597.882L439.23 600.579C439.23 600.579 434.409 600.159 432.035 598.788C430.589 597.953 428.824 595.767 427.664 594.185Z" fill="#E4E4E4"/>
<path fillRule="evenodd" clipRule="evenodd" d="M483.45 620.284C482.378 619.813 481.104 620.29 480.705 621.391C479.977 623.398 479 626.409 479 628.106C479 630.811 479.901 636 479.901 636C483.039 636 536.303 636 536.303 636C536.303 636 538.502 628.732 533.765 628.152C529.028 627.573 525.895 627.106 525.895 627.106L499.68 615.419C499.165 615.189 498.563 615.43 498.348 615.951L496.663 620.039C496.663 620.039 492.278 622.085 489.537 622.085C487.868 622.085 485.246 621.074 483.45 620.284Z" fill="#E4E4E4"/>
<path fillRule="evenodd" clipRule="evenodd" d="M518.77 506.433C518.77 533 506.154 594.97 506.146 600.82L479 600.841C479 600.841 484.96 517.898 483.227 517.004C481.493 516.111 412.176 523.925 391.386 523.925C361.408 523.925 349.006 505.02 348 470H407.386C419.478 471.294 482.549 484.015 505.972 488.388C516 490.261 518.77 499.115 518.77 506.433Z" fill="#2B44FF"/>
<path fillRule="evenodd" clipRule="evenodd" d="M487.36 355.962L449.456 367.341L459.134 383.463L488.605 366.118C502.362 365.299 508.862 363.942 508.105 362.048C507.466 360.451 505.947 360.179 504.548 359.928C503.458 359.733 502.441 359.55 501.969 358.765C500.892 356.971 504.667 352.301 508.438 348.023C512.21 343.745 509.192 343.546 507.369 343.889C501.101 346.433 494.431 350.458 487.36 355.962ZM478.005 457.592L446.107 434.168L439.055 451.599L470.643 464.698C479.577 475.192 484.572 479.566 485.629 477.822C486.521 476.351 485.824 474.974 485.182 473.705C484.682 472.717 484.215 471.795 484.559 470.946C485.344 469.006 491.345 469.21 497.031 469.648C502.717 470.085 501.06 467.555 499.689 466.305C493.885 462.831 486.657 459.926 478.005 457.592Z" fill="#B28B67"/>
<path fillRule="evenodd" clipRule="evenodd" d="M396.561 371.087C413.931 403.476 439.05 428.305 475.466 454.116L461.677 469.663C421.018 454.553 399.559 445.436 389.021 414.835C386.376 407.154 384.528 382.671 382.942 369.789L396.561 371.087Z" fill="#2026A2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M348 479H425C425 479 398.837 399.208 398.27 369.472C398.251 368.461 396.384 366.68 395.559 366.913C386.5 369.472 376.172 365 376.172 365C357.917 394.358 351.605 430.505 348 479Z" fill="#F2F2F2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M395.486 409.791C407.512 461.377 406.958 503.606 380.407 503.606H339.351C332.83 459.784 349.968 399.024 365.856 368.377C366.463 367.206 367.754 365 370.797 365H382.727C382.732 365.016 382.737 365.032 382.743 365.047C386.332 365.077 390.286 365.208 394.567 365.35C416.608 366.082 447.341 367.102 481.923 356L486 376.373C454.787 396.448 423.181 411.999 395.486 409.791Z" fill="#1F28CF"/>
</svg>

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
        <div style={{display:"flex" , flex:1 , justifyContent:"center" ,flexDirection:"column" ,alignItems:"center" ,textAlign:"center"  }} >
        <h5 style={{paddingBlock:"5vh"}}>A lot of people are saving money renting.</h5>
           <h1>Why not YOU?</h1> 

<h5  style={{paddingTop:"5vh"}}>Start renting on Smorentel</h5>
 <div>If you are fed up with high prices </div>
 <div>If you want to spend less and experience more </div>
 <h4>Try renting on Smorentel</h4>


<svg width="100vw" height="489" viewBox="0 0 493 489" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="493" height="489" fill="white"/>
<path fillRule="evenodd" clipRule="evenodd" d="M417 218L380.745 345.227L354.293 439H335L363.109 218H417Z" fill="#191847"/>
<path fillRule="evenodd" clipRule="evenodd" d="M426.696 218C427.534 283.574 430.394 319.34 431.274 325.298C432.155 331.256 445.468 369.156 471.214 439H451.227C418.451 371.997 400.154 334.096 396.337 325.298C392.521 316.5 380.741 280.734 363 218H426.696Z" fill="#2F3676"/>
<path fillRule="evenodd" clipRule="evenodd" d="M473 457L472 436L451 436C436.064 446.5 412 453 412 453V457H450L463 455V457H473Z" fill="#191847"/>
<path fillRule="evenodd" clipRule="evenodd" d="M357 457L356 436L335 436C320.064 446.5 296 453 296 453V457H334L347 455V457H357Z" fill="#191847"/>
<path fillRule="evenodd" clipRule="evenodd" d="M100.935 90.2443C107.411 94.1475 113.774 96.0333 116.76 95.2635C124.25 93.333 124.938 65.9351 119.143 55.1339C113.349 44.3328 83.5583 39.625 82.0568 61.0255C81.5356 68.4529 84.6544 75.0814 89.2623 80.4901L81 119H105L100.935 90.2443Z" fill="#B28B67"/>
<path fillRule="evenodd" clipRule="evenodd" d="M121.409 59.9836C121.171 58.5836 120.59 57.0288 120.122 55.7043C119.517 53.9967 118.603 52.4571 117.596 51.0061C115.701 48.2744 113.428 45.8075 110.918 43.7601C106.333 40.0202 100.497 37.8631 94.7574 38.5636C91.8597 38.9173 89.0468 40.0226 86.6525 41.8624C84.4894 43.5246 82.4087 45.9716 79.6077 46.1474C76.56 46.3385 73.7662 43.6485 71.322 41.9871C68.566 40.1141 65.6342 38.7493 62.4132 38.2188C57.0173 37.3304 51.9482 39.1534 48.2294 43.5805C44.2722 48.2916 41.3955 55.2003 43.9943 61.4425C44.4773 62.6028 45.0988 63.581 45.9907 64.3918C46.8086 65.1353 48.0579 65.9263 48.3895 67.1142C48.7418 68.3769 47.6895 70.006 47.2815 71.1454C46.6969 72.7778 46.2169 74.4913 46.3876 76.2656C46.6679 79.1795 48.4991 81.9612 50.4327 83.8765C52.4004 85.8254 54.8222 86.943 57.4089 87.4582C59.1361 87.8022 60.9013 87.992 62.6567 87.8628C63.5281 87.7988 64.2971 87.5567 65.1414 87.3642C65.9625 87.1769 66.4213 87.395 67.1179 87.8453C70.354 89.9373 73.8335 90.7467 77.5701 90.4356C80.7237 90.1729 84.3584 89.4087 86.931 87.248C89.788 84.8482 89.7311 81.5391 89.0588 78.0035C89.7711 78.3565 91.7416 78.5751 90.5641 77.1681C90.0976 76.6108 89.2163 76.384 88.6178 76.0563C87.9209 75.6747 87.2132 75.1814 86.6721 74.5589C84.4869 72.0454 86.6939 66.93 89.4404 66.0871C93.5209 64.8347 94.4345 70.6055 97.3474 72.0982C99.0222 72.9565 100.774 71.7834 102.029 70.5855C103.71 68.9809 104.855 66.8551 105.844 64.6918C106.659 62.9103 107.417 61.1038 108.248 59.3311C108.635 58.5033 109.978 56.1632 109.304 55.2272C112.226 54.6444 115.482 55.859 117.999 57.4517C119.039 58.1101 119.832 58.8361 120.387 59.9985C120.506 60.2475 120.765 60.9879 121.09 61.0183C121.695 61.0748 121.469 60.3354 121.409 59.9836" fill="#191847"/>
<path fillRule="evenodd" clipRule="evenodd" d="M67 218L103.631 344.227L120.86 439H138.153L120.891 218H67Z" fill="#997659"/>
<path fillRule="evenodd" clipRule="evenodd" d="M50.5377 218C53.0937 283.574 52.0857 319.34 51.5136 325.298C50.9416 331.256 47.6939 371.156 25.5637 441H43.55C72.8578 373.997 83.0889 334.096 86.4503 325.298C89.8117 316.5 99.7394 280.734 114.233 218H50.5377Z" fill="#B28B67"/>
<path fillRule="evenodd" clipRule="evenodd" d="M66.2136 218C75.7419 261.435 92.2217 330.768 115.653 426H140.946C142.814 328.254 134.867 263.92 121.105 218H66.2136Z" fill="#69A1AC"/>
<path fillRule="evenodd" clipRule="evenodd" d="M50.4099 218C52.9132 283.574 46.4258 348.177 26.3305 427.021H53.3168C82.6785 361.018 103.723 296.734 118.106 218H50.4099Z" fill="#89C5CC"/>
<path fillRule="evenodd" clipRule="evenodd" d="M23 454L23.9149 439.249C23.9546 438.609 24.5774 438.171 25.2047 438.304C33.8719 440.146 45.8257 436 45.8257 436C57.8567 444.522 75.2007 448.433 81.3081 449.604C82.4897 449.831 83.2478 451.023 82.9196 452.18L81.5529 457H45.8257H24.9848L23 454Z" fill="#191847"/>
<path fillRule="evenodd" clipRule="evenodd" d="M117 454L117.915 439.249C117.955 438.609 118.577 438.171 119.205 438.304C127.872 440.146 139.826 436 139.826 436C151.857 444.522 169.201 448.433 175.308 449.604C176.49 449.831 177.248 451.023 176.92 452.18L175.553 457H139.826H118.985L117 454Z" fill="#191847"/>
<path fillRule="evenodd" clipRule="evenodd" d="M160.348 127.69L125.638 146.7L138.456 160.458L163.677 137.365C176.963 133.704 183.039 131.025 181.905 129.329C180.948 127.9 179.406 127.949 177.985 127.995C176.878 128.031 175.845 128.064 175.22 127.394C173.794 125.863 176.515 120.51 179.315 115.542C182.114 110.573 179.121 111.005 177.409 111.72C171.807 115.512 166.12 120.836 160.348 127.69ZM195.247 154.364L180 162.74L180.868 178.04C180.868 178.04 190.743 170.913 199.238 168.544C210.071 165.524 214.453 163.218 219.746 156.473C222.578 152.864 224.982 145.61 222.286 143.248C221.252 142.341 217.399 144.482 213.468 146.667C210.472 148.332 207.43 150.022 205.556 150.408C203.034 150.927 203.329 147.657 203.565 145.045C203.734 143.17 203.873 141.633 202.918 142.077C198.455 142.154 195.247 154.364 195.247 154.364Z" fill="#997659"/>
<path fillRule="evenodd" clipRule="evenodd" d="M108.734 142.465C120.892 142.337 137.104 139.769 154.402 128.789L161.196 143.939C149.264 155.78 132.486 165.51 117.816 165.098C106.255 164.773 100.347 150.789 108.734 142.465Z" fill="#2026A2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M75.9446 246.259C64.3866 244.752 53.7663 243.367 47.4728 244.606C40.4113 221.673 46.2749 207.234 51.6879 193.905C54.9502 185.871 58.0489 178.241 58.0555 169.397C58.0748 143.642 78.7544 104 81.797 104H82.6703H106.783H109.544C110.784 119.937 116.079 137.193 121.407 154.56C122.652 158.615 123.898 162.677 125.095 166.729C145.26 171.307 190.036 155.373 190.036 155.373C190.036 155.373 201.34 178.759 200.487 188.717C174.424 202.331 152.087 208.401 133.683 208.802C134.268 219.721 132.939 230.112 128.474 239.606C122.491 252.327 97.5758 249.079 75.9446 246.259Z" fill="#1F28CF"/>
<path fillRule="evenodd" clipRule="evenodd" d="M382.065 75.2443C375.589 79.1475 369.226 81.0333 366.24 80.2635C358.75 78.333 358.062 50.9351 363.857 40.1339C369.651 29.3328 399.442 24.625 400.943 46.0255C401.464 53.4529 398.346 60.0814 393.738 65.4901L402 104H378L382.065 75.2443Z" fill="#B28B67"/>
<path fillRule="evenodd" clipRule="evenodd" d="M380.865 48.3889C378.789 45.2979 376.796 42.9401 374.203 41.571C363.652 41.7377 362.417 39.8462 362.417 33.471C364.121 32.2515 370.134 30.1982 376.868 29.6206C380.303 28.6375 384.373 28.8224 388.293 30.4622C393.132 31.8352 397.23 34.7923 399.04 40.3283C405.588 51.629 400.618 63.3927 393.92 67.4112C392.137 65.2989 390.581 63.2518 389.192 61.2922C390.308 60.2028 391 58.6822 391 57C391 53.6863 388.314 51 385 51C384.756 51 384.516 51.0145 384.28 51.0427C384.131 55.1858 383.517 69.2027 381.906 74.0715C380.005 79.8116 368.916 81.221 365.049 81.221C361.708 81.221 361.822 78.0578 361.904 75.7908C361.916 75.4643 361.927 75.1564 361.927 74.8792C361.927 74.3001 362.68 74.3016 363.531 74.3033C364.636 74.3055 365.906 74.308 365.906 73.0401C365.906 71.6579 363.996 70.5978 362.287 69.6491C361.221 69.0572 360.232 68.5087 359.835 67.9525C358.581 66.1977 358.159 63.8311 360.05 63.8311C361.084 63.8311 362.503 64.427 364.209 65.144C366.785 66.2264 370.017 67.5847 373.574 67.5847C379.45 67.5847 380.847 48.6261 380.865 48.3889Z" fill="#191847"/>
<path fillRule="evenodd" clipRule="evenodd" d="M322.652 114.69L357.362 133.7L344.544 147.458L319.323 124.365C306.037 120.704 299.961 118.025 301.095 116.329C302.052 114.9 303.594 114.949 305.015 114.995C306.122 115.031 307.155 115.064 307.78 114.394C309.206 112.863 306.485 107.51 303.685 102.542C300.886 97.5726 303.879 98.0052 305.591 98.7198C311.193 102.512 316.88 107.836 322.652 114.69ZM287.753 141.364L303 149.74L302.132 165.04C302.132 165.04 292.257 157.913 283.762 155.544C272.929 152.524 268.547 150.218 263.254 143.473C260.422 139.864 258.018 132.61 260.714 130.248C261.748 129.341 265.601 131.482 269.532 133.667C272.528 135.332 275.57 137.022 277.444 137.408C279.966 137.927 279.671 134.657 279.435 132.045C279.266 130.17 279.127 128.633 280.082 129.077C284.545 129.154 287.753 141.364 287.753 141.364Z" fill="#997659"/>
<path fillRule="evenodd" clipRule="evenodd" d="M374.266 129.465C362.108 129.337 345.896 126.769 328.598 115.789L321.804 130.939C333.736 142.78 350.514 152.51 365.184 152.098C376.745 151.773 382.653 137.789 374.266 129.465Z" fill="#A22020"/>
<path fillRule="evenodd" clipRule="evenodd" d="M407.055 233.259C418.613 231.752 429.234 230.367 435.527 231.606C442.589 208.673 436.725 194.234 431.312 180.905C428.05 172.871 424.951 165.241 424.944 156.397C424.925 130.642 404.246 91 401.203 91H400.33H376.217H373.456C372.216 106.937 366.921 124.193 361.593 141.56C360.348 145.615 359.102 149.677 357.905 153.729C337.74 158.307 292.964 142.373 292.964 142.373C292.964 142.373 281.66 165.759 282.513 175.717C308.576 189.331 330.913 195.401 349.317 195.802C348.732 206.721 350.061 217.112 354.526 226.606C360.509 239.327 385.424 236.079 407.055 233.259Z" fill="#FF0000"/>
<path d="M238 83.3014L320.495 82.933L320.74 137.825L238.245 138.193L238 83.3014Z" fill="#E89313"/>
</svg>



<h5 style={{paddingTop:"5vh"}}>Benefits of Renting</h5>
<div style={{textAlign:"left"}}>
<li>No Maintenance Costs or Repair Bills</li>
<li>No Long Time Commitments</li>
<li>Save Tax </li>
<li>Avoid Transport Cost</li>
<li>Take Time for an Examination</li>
<li>See and Experience a Preview</li>
</div>


        <Button style={{backgroundColor:CLR_RCARD2}} onClick={()=> { props.setSelected("Get Started") }} >Try Renting now</Button>  
        </div>
    )
  }

  function Promote(props){
    return (
      <>
        <div style={{display:"flex" , flex:1 , justifyContent:"center" ,flexDirection:"column" ,alignItems:"center" ,minHeight:100+"vw"  }} >
        <h5>Be A Part of It</h5>
        <div >Help us Reach every individual so that we make an impact</div>
     
  
        <div style={{backgroundColor:CLR_RCARD2}} >Share US on</div>


        <svg width="100vw" height="489" fill="none" version="1.1" viewBox="0 0 493 489" xmlns="http://www.w3.org/2000/svg">

<g clipRule="evenodd" fillRule="evenodd">
 <path d="m100.94 90.244c6.476 3.9032 12.839 5.789 15.825 5.0192 7.49-1.9305 8.178-29.328 2.383-40.13-5.794-10.801-35.585-15.509-37.086 5.8916-0.5212 7.4274 2.5976 14.056 7.2055 19.465l-8.2623 38.51h24l-4.065-28.756z" fill="#B28B67"/>
 <path d="m121.41 59.984c-0.238-1.4-0.819-2.9548-1.287-4.2793-0.605-1.7076-1.519-3.2472-2.526-4.6982-1.895-2.7317-4.168-5.1986-6.678-7.246-4.585-3.7399-10.421-5.897-16.161-5.1965-2.8977 0.3537-5.7106 1.459-8.1049 3.2988-2.1631 1.6622-4.2438 4.1092-7.0448 4.285-3.0477 0.1911-5.8415-2.4989-8.2857-4.1603-2.756-1.873-5.6878-3.2378-8.9088-3.7683-5.3959-0.8884-10.465 0.9346-14.184 5.3617-3.9572 4.7111-6.8339 11.62-4.2351 17.862 0.483 1.1603 1.1045 2.1385 1.9964 2.9493 0.8179 0.7435 2.0672 1.5345 2.3988 2.7224 0.3523 1.2627-0.7 2.8918-1.108 4.0312-0.5846 1.6324-1.0646 3.3459-0.8939 5.1202 0.2803 2.9139 2.1115 5.6956 4.0451 7.6109 1.9677 1.9489 4.3895 3.0665 6.9762 3.5817 1.7272 0.344 3.4924 0.5338 5.2478 0.4046 0.8714-0.064 1.6404-0.3061 2.4847-0.4986 0.8211-0.1873 1.2799 0.0308 1.9765 0.4811 3.2361 2.092 6.7156 2.9014 10.452 2.5903 3.1536-0.2627 6.7883-1.0269 9.3609-3.1876 2.857-2.3998 2.8001-5.7089 2.1278-9.2445 0.7123 0.353 2.6828 0.5716 1.5053-0.8354-0.4665-0.5573-1.3478-0.7841-1.9463-1.1118-0.6969-0.3816-1.4046-0.8749-1.9457-1.4974-2.1852-2.5135 0.0218-7.6289 2.7683-8.4718 4.0805-1.2524 4.9941 4.5184 7.907 6.0111 1.6748 0.8583 3.4266-0.3148 4.6816-1.5127 1.681-1.6046 2.826-3.7304 3.815-5.8937 0.815-1.7815 1.573-3.588 2.404-5.3607 0.387-0.8278 1.73-3.1679 1.056-4.1039 2.922-0.5828 6.178 0.6318 8.695 2.2245 1.04 0.6584 1.833 1.3844 2.388 2.5468 0.119 0.249 0.378 0.9894 0.703 1.0198 0.605 0.0565 0.379-0.6829 0.319-1.0347" fill="#191847"/>
 <path d="M67 218L103.631 344.227L120.86 439H138.153L120.891 218H67Z" fill="#997659"/>
 <path d="m50.538 218c2.556 65.574 1.548 101.34 0.9759 107.3-0.572 5.958-3.8197 45.858-25.95 115.7h17.986c29.308-67.003 39.539-106.9 42.9-115.7s13.289-44.564 27.783-107.3h-63.695z" fill="#B28B67"/>
 <path d="m66.214 218c9.5283 43.435 26.008 112.77 49.439 208h25.293c1.868-97.746-6.079-162.08-19.841-208h-54.891z" fill="#69A1AC"/>
 <path d="m50.41 218c2.5033 65.574-3.9841 130.18-24.079 209.02h26.986c29.362-66.003 50.406-130.29 64.789-209.02h-67.696z" fill="#89C5CC"/>
 <path d="m23 454 0.9149-14.751c0.0397-0.64 0.6625-1.078 1.2898-0.945 8.6672 1.842 20.621-2.304 20.621-2.304 12.031 8.522 29.375 12.433 35.482 13.604 1.1816 0.227 1.9397 1.419 1.6115 2.576l-1.3667 4.82h-56.568l-1.9848-3z" fill="#191847"/>
 <path d="m117 454 0.915-14.751c0.04-0.64 0.662-1.078 1.29-0.945 8.667 1.842 20.621-2.304 20.621-2.304 12.031 8.522 29.375 12.433 35.482 13.604 1.182 0.227 1.94 1.419 1.612 2.576l-1.367 4.82h-56.568l-1.985-3z" fill="#191847"/>
</g>
<path d="m269.45 78.465s-5.5511 32.133-7.7752 49.667c-2.224 17.534-22.927 53.267-22.927 53.267l5.3091-44.592z" fill="#b3b3b3"/>
<path d="m144.97 98.241-6.2258 25.162 27.732-9.0586s6.2329-0.40334 14.718 4.8846c10.906 6.7965 7.8256 5.9678 15.492 12.494 7.666 6.5259 25.622 25.947 25.622 25.947l16.187 23.652s0.342-34.447 14.127-65.208c21.777-48.594 16.835-37.648 16.835-37.648s-15.238 15.248-51.112 19.719c-33.574 4.1839-46.225-4.2134-46.225-4.2134l-19.855-23.896z" fill="#808080"/>
<path d="m158.29 128.87-32.648 17.832 12.818 13.758 25.221-23.093c13.286-3.661 19.362-6.34 18.228-8.036-0.957-1.429-2.499-1.38-3.92-1.334-1.107 0.036-2.14 0.069-2.765-0.601-1.426-1.531 3.357-3.6436 6.157-8.6116 0 0-7.853-4.537-9.565-3.822-5.602 3.792-7.7541 7.054-13.526 13.908zm36.961 25.496-15.247 8.376 0.868 15.3s9.875-7.127 18.37-9.496c10.833-3.02 15.215-5.326 20.508-12.071 2.832-3.609 5.236-10.863 2.54-13.225-1.034-0.907-4.887 1.234-8.818 3.419-2.996 1.665-6.038 3.355-7.912 3.741-2.522 0.519-2.227-2.751-1.991-5.363 0.169-1.875 0.308-3.412-0.647-2.968-4.463 0.077-7.671 12.287-7.671 12.287z" clipRule="evenodd" fill="#997659" fillRule="evenodd"/>
<path d="m108.73 142.46c12.158-0.128 28.37-2.696 45.668-13.676l6.794 15.15c-11.932 11.841-28.71 21.571-43.38 21.159-11.561-0.325-17.469-14.309-9.082-22.633z" clipRule="evenodd" fill="#2026A2" fillRule="evenodd"/>
<g>
 <path d="m75.945 246.26c-11.558-1.507-22.178-2.892-28.472-1.653-7.0615-22.933-1.1979-37.372 4.2151-50.701 3.2623-8.034 6.361-15.664 6.3676-24.508 0.0193-25.755 20.699-65.397 23.742-65.397h27.747c1.24 15.937 6.535 33.193 11.863 50.56 1.245 4.055 2.491 8.117 3.688 12.169 20.165 4.578 54.943-13.856 54.943-13.856s14.637 20.886 13.784 30.844c-26.063 13.614-41.734 24.683-60.138 25.084 0.585 10.919-0.744 21.31-5.209 30.804-5.983 12.721-30.898 9.473-52.529 6.653z" clipRule="evenodd" fill="#1f28cf" fillRule="evenodd"/>
 <g fill="none" stroke="#000" strokeWidth="1px">
  <path d="m290.3 86.188c62.032-8.0403 70.862-12.095 70.862-12.095z"/>
  <path d="m290.08 115.37 80.876 9.638z"/>
  <path d="m279.68 152.06 72.224 28.157z"/>
  <path d="m262.5 183.64 48.832 47.478z"/>
 </g>
</g>
</svg>



        </div>

        </>
    )
  }

  function How_It_Works(props){
    return (
        <div style={{display:"flex" , flex:1 , justifyContent:"center" ,flexDirection:"column" ,alignItems:"center"  }} >
        <h5>Steps to start Renting with SMOR</h5>
        <div >Here we will be pointing how to use the app easily</div>

        <svg width="100vw" height="602" viewBox="0 0 500 602" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_2_2932)">
<path d="M257.419 12.3083L79.4278 18.5239C59.3093 19.2265 43.5695 36.1053 44.2721 56.2238L59.7361 499.054C60.4386 519.172 77.3174 534.912 97.4359 534.21L275.427 527.994C295.546 527.291 311.286 510.413 310.583 490.294L295.119 47.464C294.417 27.3455 277.538 11.6058 257.419 12.3083Z" fill="#F2F2F2"/>
</g>
<path fillRule="evenodd" clipRule="evenodd" d="M78.662 29.557C65.25 30.026 54.757 41.278 55.225 54.691L70.746 499.138C71.214 512.551 82.467 523.044 95.879 522.576L275.444 516.305C288.856 515.837 299.349 504.584 298.881 491.172L283.36 46.724C282.892 33.312 271.639 22.818 258.227 23.287L230.234 24.264L230.375 28.313C230.64 35.913 224.694 42.29 217.094 42.555L121.728 45.885C114.128 46.151 107.752 40.205 107.486 32.604L107.345 28.556L78.662 29.557Z" fill="#1F28CF"/>

<g mask="url(#mask0_2_2932)">
<path fillRule="evenodd" clipRule="evenodd" d="M304.833 125.249C307.607 136.196 312.255 144.853 316.07 147.135C325.636 152.854 353.37 124.066 358.098 106.399C362.825 88.7327 336.995 52.6394 314.346 74.1225C306.486 81.5783 303.137 91.9649 302.515 102.588L256.071 135.457L280.622 160.45L304.833 125.249Z" fill="#B28B67"/>
<path fillRule="evenodd" clipRule="evenodd" d="M371.018 98.4601C365.749 104.212 357.16 104.55 351.491 99.3646C347.489 97.2261 342.852 93.9272 338.172 89.7642C337.051 91.8878 335.526 94.0429 333.539 96.2112C331.784 98.1262 329.723 99.9527 327.464 101.639C327.604 99.4759 327.042 97.3997 325.748 96.0824C322.13 92.3987 316.74 92.9684 313.691 96.2962C309.823 100.519 309.34 105.932 312.497 109.618C303.817 112.671 295.361 113.018 291.155 108.735C283.165 100.601 287.786 83.5713 298.862 71.48C299.252 71.0549 299.646 70.6413 300.045 70.2381C295.551 69.4388 290.698 69.4484 285.81 69.459C275.425 69.48 264.881 69.501 257.276 61.7595C242.062 46.2711 265.615 7.81123 286.874 29.4515C301.33 44.1686 306.409 53.6271 309.532 63.1469C314.026 60.7902 318.632 59.6508 322.816 59.8384C323.947 59.7481 325.341 59.9795 326.936 60.5009C327.937 60.791 328.898 61.174 329.806 61.6526C334.813 63.9856 341.09 68.4265 347.272 74.2942C348.426 75.3898 349.533 76.4941 350.59 77.5984C356.041 71.6842 365.015 71.537 370.653 77.2767C376.303 83.0288 376.466 92.5127 371.018 98.4601Z" fill="#191847"/>
<path fillRule="evenodd" clipRule="evenodd" d="M87.8181 367.675C87.8181 367.675 134.881 393.654 171.188 401.789C207.494 409.924 243.219 394.163 243.219 394.163C243.219 394.163 197.306 368.035 165.618 360.934C133.931 353.834 87.8181 367.675 87.8181 367.675Z" fill="#1F28CF"/>
<path fillRule="evenodd" clipRule="evenodd" d="M197.207 422.448C196.987 421.866 196.828 421.25 196.734 420.6C194.783 407.161 150.42 256.946 148.251 230.813L228.666 248.832C230.315 268.7 231.058 391.233 229.775 415.359C233.159 454.627 231.36 578.944 232.535 587.848C233.771 597.214 215.123 602.504 212.796 590.809C209.093 572.199 201.589 521.32 199.817 490.883C198.156 462.349 197.267 436.814 197.207 422.448Z" fill="#997659"/>
<path fillRule="evenodd" clipRule="evenodd" d="M128.112 424.093C93.702 425.483 -28.9152 414.459 -37.6097 415.092C-46.5536 415.742 -50.2497 395.75 -39.0267 394.114C-21.1688 391.51 27.4705 387.147 56.377 387.397C79.628 387.597 100.751 388.242 114.865 389.011C121.866 348.295 136.156 250.02 143.85 229.827L215.001 245.77C207.624 265.134 149.948 405.563 141.766 419.079C139.052 423.951 133.641 425.16 128.112 424.093Z" fill="#B28B67"/>
<path fillRule="evenodd" clipRule="evenodd" d="M144.079 229.879C144.079 229.879 193.973 226.221 233.08 249.821C233.367 298.857 253.27 322.753 242.946 395.52C190.666 409.71 140.821 354.163 87.2753 367.427C80.1859 330.504 116.072 253.449 144.079 229.879Z" fill="#2B44FF"/>
<path fillRule="evenodd" clipRule="evenodd" d="M308.135 354.375L295.725 296.547L271.911 309.306L293.61 355.164C293.42 375.803 294.705 385.658 297.466 384.726C299.794 383.941 300.329 381.7 300.822 379.636C301.206 378.028 301.564 376.527 302.725 375.906C305.375 374.486 311.626 380.617 317.323 386.703C323.019 392.788 323.598 388.3 323.291 385.54C320.298 375.907 315.246 365.519 308.135 354.375ZM77.932 268.456C86.0257 263.384 142.747 198.779 142.747 198.779L167.607 215.944C167.607 215.944 96.1946 278.592 91.3974 282.132C85.166 286.731 83.6445 298.57 82.6128 306.598C82.4531 307.84 82.306 308.991 82.1538 310.009C77.2253 309.194 76.7306 305.763 76.2085 302.146C75.619 298.06 74.9954 293.737 67.9111 292.677C65.1741 292.267 62.4338 292.122 59.7575 291.981C50.5115 291.494 42.017 291.045 36.9837 279.85C36.1855 278.075 36.7326 273.823 41.8208 273.692C54.4989 273.365 73.9745 270.935 77.932 268.456Z" fill="#B28B67"/>
<path fillRule="evenodd" clipRule="evenodd" d="M281.403 137.167L292.863 142.365C281.853 201.217 286.715 264.868 307.45 333.319L247.674 353.192C236.91 268.569 244.177 193.839 281.403 137.167Z" fill="#191847"/>
<path fillRule="evenodd" clipRule="evenodd" d="M152.39 242.832L244.227 305.702C244.227 305.702 262.637 202.162 297.814 145.062L272.788 121.751C228.308 143.71 194.2 184.885 152.39 242.832Z" fill="#DDE3E9"/>
<path fillRule="evenodd" clipRule="evenodd" d="M85.1211 255.69C168.65 143.279 272.179 121.335 272.179 121.335L272.189 121.371C272.197 121.367 272.204 121.362 272.213 121.358L274.021 122.595C277.194 124.935 283.647 129.788 283.647 129.788L277.934 154.51C256.307 192.067 198.889 311.449 198.889 311.449L138.777 270.297C135.727 275.485 132.756 280.829 129.883 286.333L85.1211 255.69Z" fill="#2F3676"/>
<path fillRule="evenodd" clipRule="evenodd" d="M138.483 270.799C151.732 248.184 166.501 228.544 181.3 211.751C169.096 235.344 155.864 264.728 155.23 282.264L138.483 270.799Z" fill="black" fillOpacity="0.1"/>
<path fillRule="evenodd" clipRule="evenodd" d="M175.762 240.981L214.397 246.775L205.447 261.303L175.762 240.981Z" fill="white" fillOpacity="0.2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M397.396 254.53C389.854 255.068 383.329 253.86 381.017 251.818C375.221 246.698 387.046 221.974 397.113 214.98C407.179 207.987 435.86 217.317 427.482 237.067C424.575 243.921 418.787 248.411 412.225 251.139L402.104 289.202L380.72 278.307L397.396 254.53Z" fill="#B28B67"/>
<path fillRule="evenodd" clipRule="evenodd" d="M383 363L333.918 487.227L300.999 592.25H288L338.326 363H383Z" fill="#997659"/>
<path fillRule="evenodd" clipRule="evenodd" d="M392.883 363C393.406 406.654 401.028 465.427 402.246 468.149C403.464 470.87 486.324 537.358 486.324 537.358L477.371 546.939C477.371 546.939 379.603 489.934 375.079 482.331C370.555 474.728 355.826 404.763 344 363H392.883Z" fill="#B28B67"/>
<path fillRule="evenodd" clipRule="evenodd" d="M484.884 535.564C485.211 534.44 486.396 533.771 487.496 534.173C489.502 534.906 492.436 536.092 493.736 537.183C495.808 538.922 499.204 542.948 499.204 542.948C497.187 545.352 462.949 586.154 462.949 586.154C462.949 586.154 455.968 583.166 458.569 579.165C461.17 575.164 462.826 572.464 462.826 572.464L470.724 544.87C470.879 544.328 471.451 544.022 471.988 544.192L476.202 545.529C476.202 545.529 480.588 543.485 482.35 541.384C483.423 540.106 484.335 537.448 484.884 535.564Z" fill="#E4E4E4"/>
<path fillRule="evenodd" clipRule="evenodd" d="M303.55 586.284C304.622 585.813 305.896 586.29 306.295 587.391C307.023 589.398 308 592.409 308 594.106C308 596.811 307.099 602 307.099 602C303.961 602 250.697 602 250.697 602C250.697 602 248.498 594.732 253.235 594.152C257.972 593.573 261.105 593.106 261.105 593.106L287.32 581.419C287.835 581.189 288.437 581.43 288.652 581.951L290.337 586.039C290.337 586.039 294.722 588.085 297.463 588.085C299.132 588.085 301.754 587.074 303.55 586.284Z" fill="#E4E4E4"/>
<path fillRule="evenodd" clipRule="evenodd" d="M350 581.433L288.196 574.725L334 363H389.356L350 581.433Z" fill="#69A1AC"/>
<path fillRule="evenodd" clipRule="evenodd" d="M473.54 521.9L433 569.886C433 569.886 368.95 499.932 358.317 478.596C347.685 457.26 339.201 363 339.201 363H401.522C401.522 363 406.156 445.926 407.769 449.785C409.383 453.644 473.54 521.9 473.54 521.9Z" fill="#89C5CC"/>
<path fillRule="evenodd" clipRule="evenodd" d="M281.325 299.141L312.634 323.347L297.821 334.93L276.524 308.176C263.974 302.481 258.392 298.885 259.777 297.388C260.945 296.125 262.461 296.416 263.857 296.683C264.945 296.891 265.96 297.086 266.682 296.521C268.33 295.233 266.48 289.52 264.492 284.175C262.504 278.829 265.393 279.725 266.972 280.698C271.912 285.32 276.696 291.468 281.325 299.141ZM432.847 362.027L453.714 363.039C458.337 401.943 461.52 423.423 463.263 427.482C464.541 430.457 474.665 439.826 481.747 445.247C484.589 447.422 483.234 449.945 482.084 450.573C474.833 454.538 469.827 451.266 464.378 447.705C462.8 446.674 461.185 445.619 459.468 444.708C455.023 442.35 452.974 444.427 451.037 446.39C449.323 448.128 447.696 449.776 444.574 448.178C444.887 447.565 445.254 446.883 445.65 446.146C448.21 441.383 451.985 434.36 450.244 429.298C449.351 426.7 443.552 404.277 432.847 362.027Z" fill="#B28B67"/>
<path fillRule="evenodd" clipRule="evenodd" d="M398.337 270.217L390.306 266.686C367.611 279.857 349.535 320.587 335.95 323.188C323.107 325.647 308.07 316.42 290.404 304.618L281.152 316.412C294.026 339.88 327.565 365.357 345.081 359.954C373.087 351.315 391.802 300.188 398.337 270.217Z" fill="#DB2721"/>
<path fillRule="evenodd" clipRule="evenodd" d="M408.624 384.777C408.624 384.777 358.161 372.195 334.385 366.267C330.993 365.421 332.853 360.682 333.96 358.332C346.732 331.216 376.492 305.974 386.617 265.366L408.868 267.347C419.477 300.25 416.858 336.85 408.624 384.777Z" fill="#DDE3E9"/>
<path fillRule="evenodd" clipRule="evenodd" d="M410.005 267.631L410.249 267.692C450.901 309.266 468.488 362.385 463.013 427.049L446.692 426.217C439.378 411.638 431.557 388.812 423.229 357.74C423.773 375.342 422.957 393.054 420.038 409.265L353.212 392.604C348.426 356.685 401.77 265.578 401.77 265.578L406.384 266.728L410.005 267.631Z" fill="#FF4133"/>
</g>
<defs>
<filter id="filter0_d_2_2932" x="0.249512" y="0.285706" width="334.356" height="589.947" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-10" dy="22"/>
<feGaussianBlur stdDeviation="17"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_2932"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_2932" result="shape"/>
</filter>
</defs>
</svg>

        </div>


    )
  }

  function Safety(props){
    return (
        <div style={{display:"flex" , flex:1 , justifyContent:"center" ,flexDirection:"column" ,alignItems:"center"  }} >
        <h5>Safety of property</h5>
        <div >Here we will get to know the steps to be followed to ensure a safe exchange of stuff</div>
 
        <svg width="100vw" height="300" style={{marginTop:100}} viewBox="0 0 327 453" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M155.897 85.7758C163.09 88.9942 169.91 90.1385 172.901 88.9623C180.401 86.0128 177.631 57.5624 170.265 47.1166C162.899 36.6708 131.492 35.5799 132.66 57.9249C133.065 65.6802 137.133 72.1461 142.585 77.1603L138.936 118.076L163.756 115.028L155.897 85.7758Z" fill="#915B3C"/>
<path fillRule="evenodd" clipRule="evenodd" d="M154.535 35.9665C151.198 35.8311 142.345 36.5434 140.721 36.7431C139.683 36.8706 138.587 37.2461 137.855 36.3675C137.256 35.648 137.278 34.304 137.016 33.4157C136.712 32.3839 136.337 31.3747 135.959 30.3684C134.883 27.5051 133.46 24.83 131.627 22.3795C128.188 17.782 123.564 14.4178 118.05 12.8069C111.96 11.0282 105.346 11.2619 99.1867 12.5306C92.5957 13.8881 86.8394 16.8279 80.8079 19.67C75.0603 22.3782 68.8818 23.9251 62.4988 23.7309C56.0676 23.5354 50.8778 20.6964 45.1547 18.0998C39.2958 15.4415 32.7999 14.03 26.4181 15.3214C20.4609 16.5271 15.2227 19.6936 10.657 23.6252C6.38531 27.3036 3.00479 31.5132 1.48309 37.0406C-0.153966 42.9864 0.610935 49.1984 5.05983 53.7292C11.5083 60.2967 22.0574 60.9045 30.6194 59.664C35.5718 58.9469 40.3372 57.4407 44.8227 55.2145C50.8045 52.2455 55.7493 47.851 61.2267 44.1056C63.7973 42.3481 66.4913 40.833 69.3622 39.6274C72.148 38.4572 74.9446 37.734 77.7719 39.1583C80.7628 40.6651 83.4625 42.1746 86.7667 42.942C89.9364 43.6783 93.2259 43.9039 96.4549 43.4821C102.737 42.6613 108.696 39.9388 114.642 37.8751C119.491 36.1925 124.689 34.4706 129.893 34.8768C132.065 35.0464 135.268 35.5535 136.304 37.6638C123.711 41.582 120.61 58.1484 125.679 69.4079C128.414 75.4851 141.101 81.4241 145.274 77.5403C147.917 75.0798 145.816 72.5337 144.452 70.8501C141.84 67.626 140.542 63.2318 144.284 60.3044C147.511 57.7796 151.787 62.3094 151.856 62.2954C152.804 62.1022 160.505 56.4007 165.368 48.8635C171.034 48.5066 171.431 44.689 169.715 41.8174C167.999 38.9459 159.146 36.1539 154.535 35.9665Z" fill="#191847"/>
<path fillRule="evenodd" clipRule="evenodd" d="M147.369 203.326L185.536 334.98L203.488 433.829H221.507L203.521 203.326H147.369Z" fill="#784931"/>
<path fillRule="evenodd" clipRule="evenodd" d="M130.216 203.326C132.88 271.72 131.829 309.023 131.233 315.237C130.637 321.451 127.253 363.068 104.195 435.915H122.936C153.473 366.03 164.133 324.414 167.635 315.237C171.138 306.061 181.482 268.757 196.584 203.326H130.216Z" fill="#915B3C"/>
<path fillRule="evenodd" clipRule="evenodd" d="M146.55 203.326C156.478 248.628 173.649 320.943 198.063 420.27H224.417C226.363 318.32 218.083 251.221 203.743 203.326H146.55Z" fill="#69A1AC"/>
<path fillRule="evenodd" clipRule="evenodd" d="M130.083 203.326C132.691 271.72 125.932 339.101 104.994 421.335H133.112C163.705 352.493 185.632 285.445 200.618 203.326H130.083Z" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M101.523 449.474L102.48 434.035C102.52 433.395 103.143 432.957 103.77 433.092C112.804 435.04 125.307 430.7 125.307 430.7C137.907 439.634 156.101 443.71 162.375 444.907C163.557 445.133 164.311 446.324 163.983 447.481L162.532 452.603H125.307H103.592L101.523 449.474Z" fill="#191847"/>
<path fillRule="evenodd" clipRule="evenodd" d="M199.466 449.474L200.423 434.035C200.463 433.395 201.085 432.957 201.713 433.092C210.747 435.04 223.249 430.7 223.249 430.7C235.85 439.634 254.044 443.71 260.318 444.907C261.5 445.133 262.254 446.324 261.926 447.481L260.475 452.603H223.249H201.534L199.466 449.474Z" fill="#191847"/>
<path fillRule="evenodd" clipRule="evenodd" d="M270.411 197.98L233.437 179.692L229.359 198.872L264.144 206.611C275.211 215.773 281.129 219.363 281.898 217.38C282.547 215.707 281.582 214.419 280.694 213.232C280.002 212.308 279.356 211.445 279.554 210.511C280.008 208.376 286.203 207.5 292.117 206.921C298.031 206.341 295.873 204.042 294.239 203.007C287.654 200.488 279.711 198.812 270.411 197.98ZM106.236 270.64C108.166 264.004 107.912 202.681 107.912 202.681L129.37 198.985C129.37 198.985 120.826 266.664 119.935 270.87C118.778 276.333 123.578 283.129 126.833 287.737C127.336 288.45 127.803 289.11 128.205 289.705C125.178 291.757 123.285 290.256 121.29 288.674C119.037 286.886 116.653 284.995 112.355 288.002C110.694 289.163 109.158 290.461 107.657 291.729C102.473 296.109 97.7103 300.133 89.7045 296.946C88.4353 296.441 86.7117 294.001 89.3754 291.386C96.0115 284.873 105.292 273.885 106.236 270.64Z" fill="#915B3C"/>
<path fillRule="evenodd" clipRule="evenodd" d="M152.968 101.867L161.572 98.7794C199.513 121.443 222.679 173.749 268.141 195.605L260.553 209.369C189.017 213.037 159.903 149.387 152.968 101.867Z" fill="#1F28CF"/>
<path fillRule="evenodd" clipRule="evenodd" d="M133.97 220.306C133.97 220.306 187.336 210.897 212.48 206.463C216.067 205.83 214.477 200.764 213.497 198.239C202.187 169.096 173.083 140.662 165.503 97.6753L142.231 98.1136C128.817 131.572 128.886 169.842 133.97 220.306Z" fill="#DDE3E9"/>
<path fillRule="evenodd" clipRule="evenodd" d="M128.946 243.433C126.913 252.538 124.758 260.55 122.5 266.811L105.663 269.78C93.513 211.468 107.733 162.443 121.495 131.968C117.323 132.399 113.299 131.329 110.199 127.497C99.2859 114.006 100.824 105.248 109.192 100.982C113.794 98.637 118.548 98.8459 124.238 99.0959C128.895 99.3005 134.178 99.5327 140.519 98.4154C140.521 98.415 140.523 98.4147 140.525 98.4143C141.14 98.3059 141.706 98.2486 142.228 98.2379L149.818 97.3421C149.818 97.3421 198.579 195.469 191 232.491L128.946 243.433Z" fill="#2B44FF"/>
<path fillRule="evenodd" clipRule="evenodd" d="M128.946 243.433C131.613 231.487 134.069 217.658 136.272 203.436C140.578 217.912 146.027 232.252 152.139 239.344L128.946 243.433Z" fill="black" fill-opacity="0.1"/>
</svg>

        </div>
    )
  }

  function Contact_Support(props){
    return (
        <div style={{display:"flex" , flex:1 , justifyContent:"center" ,flexDirection:"column" ,alignItems:"center"  }} >
        <h5>Facing any Problems</h5>
        <div>Email us at</div>
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=kr7168799@gmail.com" >rahul@smorentel.com</a> 

        

        <svg width="100vw" viewBox="0 0 960 846" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="1440" height="888" transform="translate(-232 -20)" fill="white"/>
<path fillRule="evenodd" clipRule="evenodd" d="M812.225 279.334C811.692 278.946 810.426 278.809 809.838 278.692C807.39 278.21 804.869 278 802.374 278C794.681 278.012 786.863 278.767 779.298 280.074C774.494 280.903 768.687 283.696 763.909 282.179C755.585 279.537 747.172 279.667 739.274 283.439C732.053 286.888 726.572 293.439 723.373 300.517C722.89 301.586 720.932 305.519 720.378 308.17C720.141 308.712 719.913 309.257 719.708 309.811C719.126 311.384 718.603 312.984 718.118 314.588C717.91 315.272 717.389 316.782 718.008 317.074C717.019 318.901 716.141 320.783 715.411 322.726C713.286 328.378 710.962 334.578 710.215 340.568C709.939 342.786 709.928 345.017 710.185 347.239C710.312 348.338 710.26 350.546 711.004 351.382C712.585 353.154 713.396 350.673 713.218 349.491C711.858 340.485 714.485 332.027 717.598 323.561C719.612 318.087 722.92 313.078 726.626 308.543C729.625 304.871 732.842 301.98 736.953 299.546C741.981 296.569 747.356 294.163 752.681 291.749C756.184 290.161 759.691 288.615 763.291 287.247C764.092 286.942 765.351 286.161 766.239 286.158C768.116 286.152 770.777 287.537 772.59 288.052C778.554 289.748 784.594 291.919 790.758 292.785C794.712 293.341 798.416 292.715 802.113 291.398C802.491 291.264 803.125 290.918 803.901 290.424C806.646 289.368 809.243 288.039 811.504 286.121C812.806 285.017 813.989 283.589 815.067 282.282C815.389 281.892 815.532 281.444 815.537 281.018C815.781 280.891 815.943 280.741 815.98 280.567C816.249 279.281 813.796 279.258 812.225 279.334" fill="#89C5CC"/>
<path fillRule="evenodd" clipRule="evenodd" d="M187.273 386.541C185.764 387.763 184.284 389.011 182.84 390.31C181.739 391.3 179.791 392.485 179.396 393.985C178.985 395.544 180.282 397.003 181.306 397.945C186.723 402.929 192.823 406.298 200.329 406.859C211.887 407.722 221.946 404.77 231.974 398.963C239.018 394.883 243.684 388.849 244.703 380.701C253.092 384.187 261.205 388.993 268.1 394.891C271.502 397.801 274.432 401.025 277.142 404.599C278.878 406.889 280.557 409.215 282.115 411.631C282.792 412.68 283.481 414.542 284.599 415.146C285.912 415.856 287.499 414.743 287.434 413.284C287.379 412.069 286.068 410.66 285.454 409.667C284.436 408.018 283.402 406.379 282.313 404.776C280.551 402.179 278.73 399.62 276.744 397.19C272.28 391.73 266.601 387.221 260.714 383.375C249.42 375.997 237.025 371.349 223.283 370.955C214.833 370.713 207.725 373.6 200.499 377.911C196 380.595 191.356 383.235 187.273 386.541" fill="#DDE3E9"/>
<path fillRule="evenodd" clipRule="evenodd" d="M296.883 350.856C288.077 341.787 279.241 332.832 269.403 324.847C263.605 320.141 257.495 315.863 251.511 311.401C252.201 312.006 252.878 312.628 253.539 313.266C251.671 311.998 249.226 311.281 247.246 310.107C245.037 308.798 242.925 307.301 240.854 305.791C236.811 302.845 232.829 299.843 228.673 297.051C224.043 293.94 219.245 291.066 214.536 288.072C210.539 285.532 206.494 282.751 202.218 280.674C199.888 279.542 197.553 278.201 195.213 277.02C194.43 276.625 186.484 271.608 186.504 271.593C186.943 271.262 190.942 273.14 191.56 273.393C193.366 274.131 195.094 275.013 196.83 275.893C195.877 274.013 195.123 272.038 194.712 269.958C194.585 269.317 193.569 264.644 194.089 264.252C194.348 264.057 196.883 272.416 197.013 273.22C197.119 273.872 197.103 274.812 197.317 275.431C197.662 276.429 197.645 276.127 198.405 276.69C199.798 277.721 201.647 278.365 203.154 279.227C203.968 279.68 206.485 281.48 208.001 281.993C212.588 284.221 217.238 287.649 221.597 290.495C220.453 288.345 219.582 286.097 218.948 283.741C218.797 283.182 217.167 278.165 217.563 277.867C218.008 277.532 221.112 285.195 221.296 285.92C221.637 287.268 221.708 288.768 222.136 290.079C222.605 291.518 224.07 292.028 225.39 292.867C230.247 295.953 234.938 299.232 239.55 302.662C244.583 293.711 238.78 282.903 233.89 275.393C230.364 269.98 225.619 265.34 220.608 261.289C213.92 255.882 206.269 251.563 198.627 247.612C189.723 243.009 180.099 240.156 170.093 238.839C164.86 238.149 159.507 238.169 154.221 238.39C151.639 238.498 149.16 238.84 146.686 239.682C145.57 240.062 144.492 240.541 143.442 241.077C142.644 241.484 140.713 241.914 140.255 242.521C136.477 247.438 134.545 252.337 134.84 258.515C135.119 264.363 136.966 270.214 139.472 275.431C142.264 281.24 145.854 286.512 150.55 290.936C154.132 294.312 158.137 297.25 162.116 300.15C176.267 310.463 194.208 319.433 212.536 317.128C218.469 316.383 224.112 314.308 229.385 311.489C230.628 310.824 231.863 310.152 233.036 309.368C233.827 308.839 235.941 306.456 236.736 306.37C237.827 306.251 240.175 308.469 241.198 309.144C248.972 314.275 256.542 319.685 263.953 325.313C271.839 331.301 279.337 337.697 286.615 344.393C289.71 347.242 292.786 350.096 295.791 353.04C296.491 353.725 298.202 356.247 299.471 356.361C300.273 356.434 300.814 355.749 300.7 355.006C300.501 353.715 297.785 351.784 296.883 350.856" fill="#C1DEE2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M802.98 315.66C799.57 314.915 795.803 314.972 792.329 315.033C773.695 315.287 755.397 324.109 743.489 338.205C733.351 350.205 730.563 365.125 728.56 380.207C728.362 381.704 728.277 383.192 728.165 384.693C728.141 385.015 728.105 385.302 728.066 385.573C727.279 386.277 726.865 387.098 727.332 388C725.597 391.797 724.129 395.69 722.869 399.706C719.162 411.526 715.392 423.571 717.714 436C718.257 429.16 719.399 422.166 720.764 415.438C720.842 415.052 720.927 414.669 721.015 414.287C721.025 414.247 721.033 414.206 721.042 414.166C721.525 412.106 722.153 410.108 722.917 408.141C722.925 408.119 722.933 408.098 722.941 408.077C723.042 407.818 723.149 407.56 723.255 407.303C723.474 406.77 723.699 406.238 723.937 405.709C724.018 405.528 724.095 405.346 724.17 405.163C725.282 402.437 725.751 399.365 726.748 396.545C726.986 395.904 727.235 395.265 727.496 394.629C727.512 394.592 727.527 394.555 727.543 394.518C728.249 392.807 729.028 391.118 729.853 389.446C730.301 389.11 730.54 388.274 730.927 387.515C731.006 387.365 731.631 386.368 731.817 385.793C732.303 384.854 732.786 383.915 733.275 382.977C733.261 382.983 733.246 382.988 733.231 382.994C733.72 382.093 734.211 381.197 734.698 380.304C734.805 380.108 734.913 379.912 735.021 379.715C735.196 379.402 735.371 379.089 735.545 378.777C737.177 375.856 738.908 372.994 740.705 370.167C741.347 369.158 742.879 367.711 743.173 366.579C743.184 366.536 743.186 366.497 743.193 366.457C747.093 360.979 751.582 355.927 756.967 351.924C756.316 352.628 754.932 355.015 754.567 355.488C753.447 356.935 752.232 358.282 751.013 359.646C748.828 362.089 746.696 364.609 744.801 367.274C741.335 372.148 738.346 377.277 735.519 382.51C735.493 382.54 735.463 382.569 735.438 382.601C734.017 384.352 733.123 386.998 732.101 389.001C736.147 387.127 740.622 385.906 744.774 384.242C748.916 382.583 752.944 380.735 756.834 378.566C762.003 375.682 767.366 372.427 772.25 368.743C777.847 365.271 782.551 360.492 786.703 355.477C791.615 349.543 796.117 343.558 798.901 336.353C800.269 332.813 801.345 329.121 801.983 325.386C802.011 325.224 802.046 325.047 802.085 324.864C802.738 323.574 803.321 322.255 803.811 320.906C804.588 318.766 806.425 316.412 802.98 315.66" fill="#69A1AC"/>
<path fillRule="evenodd" clipRule="evenodd" d="M154.292 327.014C152.94 325.666 151.422 324.45 149.64 323.583C149.189 323.364 145.833 321.895 145.614 322.218C145.105 322.968 153.886 326.583 154.292 327.014M170.205 318.012C170.194 318.069 171.358 319.887 171.675 320.446C172.349 321.635 172.972 322.847 173.558 324.061C172.691 321.916 171.8 319.928 170.205 318.012M88.8181 332.814C87.6972 333.146 86.3496 331.836 87.8035 331.514C88.9799 331.254 88.9222 331.193 89.4504 330.321C89.8794 329.612 90.1436 328.748 90.52 328.005C91.3184 326.427 92.2241 324.923 93.3357 323.514C95.7182 320.493 98.621 317.89 101.877 315.696C107.559 311.868 113.929 308.369 120.687 306.611C131.432 303.816 143.662 303.643 154.424 305.581C161.089 306.781 167.181 308.867 171.606 313.809C173.818 316.279 175.555 319.172 176.314 322.358C176.512 323.19 176.475 324.116 176.723 324.932C177.104 326.185 176.936 325.851 178.528 326.095C180.267 326.362 182.004 326.633 183.74 326.91C188.287 327.634 192.861 328.403 197.291 329.578C198.75 329.965 200.176 330.437 201.569 330.987C202.622 331.402 206.818 332.704 207.328 333.965C208.177 336.062 205.333 335.111 204.45 334.655C203.676 334.254 202.881 333.881 202.075 333.538C200.045 332.673 197.93 332.004 195.767 331.471C193.43 330.895 191.045 330.466 188.669 330.035C186.454 329.634 184.23 329.27 182.003 328.921C180.766 328.727 179.528 328.539 178.29 328.35C177.867 328.286 177.122 327.949 177.178 328.455C174.575 327.993 171.76 328.06 169.109 327.932C165.862 327.777 162.602 327.649 159.344 327.742C156.994 327.81 154.642 327.952 152.304 328.242C150.938 328.412 149.594 328.661 148.253 328.976C147.517 329.149 144.614 329.515 144.213 330.106C144.385 329.852 147.589 330.099 147.997 330.084C149.628 330.028 151.247 329.879 152.872 329.712C155.888 329.402 158.906 329.24 161.931 329.263C161.92 329.752 159.853 330.623 159.348 330.947C158.217 331.674 157.134 332.467 156.123 333.337C154.343 334.869 152.211 336.766 150.979 338.581C151.342 338.046 153.133 337.35 153.768 336.942C154.786 336.287 155.783 335.588 156.727 334.841C157.598 334.152 158.411 333.407 159.21 332.646C160.009 331.885 161.094 330.303 162.144 329.796C162.208 329.765 162.666 330.098 162.926 329.985C163.188 329.871 163.514 329.3 163.581 329.277C164.559 328.93 166.415 329.362 167.443 329.406C170.109 329.519 172.772 329.667 175.435 329.802C176.26 329.843 176.962 329.671 177.273 330.231C177.605 330.829 176.997 332.4 176.824 333.051C176.181 335.469 175.041 337.638 173.245 339.511C169.883 343.02 165.736 345.359 161.052 346.924C143.111 352.918 124.023 355.318 106.087 349.083C98.6619 346.502 87.4791 341.889 88.8181 332.814" fill="#89C5CC"/>
<g opacity="0.6" clip-path="url(#clip0_0_73)">
<path fillRule="evenodd" clipRule="evenodd" d="M909.965 615.189C922.165 691.272 626.277 740.899 371.6 706.266C116.922 671.633 0.0882409 536.387 121.616 464.322C243.144 392.258 897.764 539.106 909.965 615.189Z" fill="#DDE3E9"/>
</g>
<rect x="260" y="160" width="159" height="302" rx="8" fill="#F2F2F2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M339 443C347.284 443 354 436.284 354 428C354 419.716 347.284 413 339 413C330.716 413 324 419.716 324 428C324 436.284 330.716 443 339 443Z" fill="white"/>
<path fillRule="evenodd" clipRule="evenodd" d="M326 180C327.105 180 328 179.105 328 178C328 176.895 327.105 176 326 176C324.895 176 324 176.895 324 178C324 179.105 324.895 180 326 180Z" fill="white"/>
<rect x="333" y="176" width="21" height="4" rx="2" fill="white"/>
<rect x="274" y="188" width="131" height="54" rx="4" fill="white"/>
<g clip-path="url(#clip1_0_73)">
<rect x="313" y="204.2" width="73" height="8.1" rx="3" fill="#DDE3E9"/>
<rect x="313" y="217.7" width="49" height="8.1" rx="3" fill="#DDE3E9"/>
</g>
<path fillRule="evenodd" clipRule="evenodd" d="M295 227C301.627 227 307 221.627 307 215C307 208.373 301.627 203 295 203C288.373 203 283 208.373 283 215C283 221.627 288.373 227 295 227Z" fill="#C5CFD6"/>
<rect x="274" y="250" width="131" height="42" rx="4" fill="white"/>
<g clip-path="url(#clip2_0_73)">
<rect x="313" y="262.6" width="73" height="6.3" rx="3" fill="#DDE3E9"/>
<rect x="313" y="273.1" width="49" height="6.3" rx="3" fill="#DDE3E9"/>
</g>
<path fillRule="evenodd" clipRule="evenodd" d="M295 283C301.627 283 307 277.627 307 271C307 264.373 301.627 259 295 259C288.373 259 283 264.373 283 271C283 277.627 288.373 283 295 283Z" fill="#C5CFD6"/>
<rect x="274" y="300" width="131" height="42" rx="4" fill="white"/>
<g clip-path="url(#clip3_0_73)">
<rect x="313" y="312.6" width="73" height="6.3" rx="3" fill="#DDE3E9"/>
<rect x="313" y="323.1" width="49" height="6.3" rx="3" fill="#DDE3E9"/>
</g>
<path fillRule="evenodd" clipRule="evenodd" d="M295 333C301.627 333 307 327.627 307 321C307 314.373 301.627 309 295 309C288.373 309 283 314.373 283 321C283 327.627 288.373 333 295 333Z" fill="#AFB9C5"/>
<rect x="274" y="350" width="131" height="42" rx="4" fill="white"/>
<g clip-path="url(#clip4_0_73)">
<rect x="313" y="362.6" width="73" height="6.3" rx="3" fill="#DDE3E9"/>
<rect x="313" y="373.1" width="49" height="6.3" rx="3" fill="#DDE3E9"/>
</g>
<path fillRule="evenodd" clipRule="evenodd" d="M295 383C301.627 383 307 377.627 307 371C307 364.373 301.627 359 295 359C288.373 359 283 364.373 283 371C283 377.627 288.373 383 295 383Z" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M290.14 404C288.815 404 287.494 404.027 286.171 404.095C285.162 404.148 283.621 403.939 282.768 404.568C281.881 405.221 281.942 406.557 282.081 407.501C282.813 412.493 284.6 416.919 288.339 420.456C294.096 425.901 300.695 428.668 308.504 429.9C313.99 430.766 319.054 429.564 323.092 425.663C326.043 431.139 328.281 437.199 329.404 443.315C329.958 446.333 330.127 449.315 330.03 452.388C329.967 454.356 329.859 456.32 329.648 458.279C329.556 459.13 329.122 460.418 329.455 461.223C329.846 462.167 331.165 462.259 331.757 461.453C332.25 460.783 332.16 459.466 332.261 458.673C332.429 457.355 332.584 456.036 332.695 454.712C332.876 452.569 333.009 450.42 333 448.268C332.977 443.435 331.902 438.583 330.432 433.995C327.612 425.192 323.037 417.369 315.921 411.231C311.545 407.457 306.537 405.929 300.856 405.108C297.318 404.597 293.723 404 290.14 404" fill="#89C5CC"/>
<path fillRule="evenodd" clipRule="evenodd" d="M310.571 439C296.272 439 286.642 450.524 282.089 462.502C280.372 467.016 279.97 471.974 279.308 476.714C279.096 478.236 279.175 480.554 278.557 481.909C278.333 482.401 277.819 482.577 278.065 483.247C278.214 483.652 278.505 483.901 278.944 483.981C279.843 484.147 281.115 483.167 281.886 482.781C288.282 479.573 292.484 474.613 295.912 468.545C298.038 464.784 300.194 460.879 301.456 456.75C302.227 454.227 302.676 451.571 302.94 448.954C303.044 447.923 303.144 446.868 303.138 445.832C303.132 444.803 302.653 444.259 302.309 443.364C307.08 441.558 312.466 441.066 317.299 442.937C321.769 444.668 325.482 448.013 327.561 452.216C328.101 453.308 328.518 454.46 328.821 455.636C329.02 456.406 329.029 457.404 329.398 458.1C330.29 459.788 332.168 458.66 331.988 457.089C331.485 452.708 328.979 448.309 325.775 445.263C321.734 441.421 316.258 439 310.571 439" fill="#89C5CC"/>
<rect x="326" y="186" width="159" height="302" rx="8" fill="#DDE3E9"/>
<path fillRule="evenodd" clipRule="evenodd" d="M405 469C413.284 469 420 462.284 420 454C420 445.716 413.284 439 405 439C396.716 439 390 445.716 390 454C390 462.284 396.716 469 405 469Z" fill="white"/>
<path fillRule="evenodd" clipRule="evenodd" d="M392 206C393.105 206 394 205.105 394 204C394 202.895 393.105 202 392 202C390.895 202 390 202.895 390 204C390 205.105 390.895 206 392 206Z" fill="white"/>
<rect x="399" y="202" width="21" height="4" rx="2" fill="white"/>
<rect x="340" y="214" width="131" height="54" rx="4" fill="white"/>
<g clip-path="url(#clip5_0_73)">
<rect x="349" y="230.2" width="73" height="8.1" rx="3" fill="#DDE3E9"/>
<rect x="349" y="243.7" width="49" height="8.1" rx="3" fill="#DDE3E9"/>
</g>
<path fillRule="evenodd" clipRule="evenodd" d="M457 248C460.866 248 464 244.866 464 241C464 237.134 460.866 234 457 234C453.134 234 450 237.134 450 241C450 244.866 453.134 248 457 248Z" fill="#DDE3E9"/>
<path fillRule="evenodd" clipRule="evenodd" d="M457 244C458.657 244 460 242.657 460 241C460 239.343 458.657 238 457 238C455.343 238 454 239.343 454 241C454 242.657 455.343 244 457 244Z" fill="#F2F2F2"/>
<rect x="340" y="276" width="131" height="42" rx="4" fill="white"/>
<g clip-path="url(#clip6_0_73)">
<rect x="379" y="288.6" width="73" height="6.3" rx="3" fill="#DDE3E9"/>
<rect x="379" y="299.1" width="49" height="6.3" rx="3" fill="#DDE3E9"/>
</g>
<path fillRule="evenodd" clipRule="evenodd" d="M361 309C367.627 309 373 303.627 373 297C373 290.373 367.627 285 361 285C354.373 285 349 290.373 349 297C349 303.627 354.373 309 361 309Z" fill="#C5CFD6"/>
<rect x="340" y="326" width="131" height="42" rx="4" fill="white"/>
<g clip-path="url(#clip7_0_73)">
<rect x="349" y="338.6" width="73" height="6.3" rx="3" fill="#DDE3E9"/>
<rect x="349" y="349.1" width="49" height="6.3" rx="3" fill="#AFB9C5"/>
</g>
<path fillRule="evenodd" clipRule="evenodd" d="M457 354C460.866 354 464 350.866 464 347C464 343.134 460.866 340 457 340C453.134 340 450 343.134 450 347C450 350.866 453.134 354 457 354Z" fill="#DDE3E9"/>
<path fillRule="evenodd" clipRule="evenodd" d="M457 350C458.657 350 460 348.657 460 347C460 345.343 458.657 344 457 344C455.343 344 454 345.343 454 347C454 348.657 455.343 350 457 350Z" fill="#F2F2F2"/>
<rect x="340" y="376" width="131" height="42" rx="4" fill="white"/>
<g clip-path="url(#clip8_0_73)">
<rect x="379" y="388.6" width="73" height="6.3" rx="3" fill="#DDE3E9"/>
<rect x="379" y="399.1" width="49" height="6.3" rx="3" fill="#DDE3E9"/>
</g>
<path fillRule="evenodd" clipRule="evenodd" d="M361 409C367.627 409 373 403.627 373 397C373 390.373 367.627 385 361 385C354.373 385 349 390.373 349 397C349 403.627 354.373 409 361 409Z" fill="#C5CFD6"/>
<rect x="392" y="211" width="335" height="346" rx="8" fill="#F2F2F2"/>
<rect x="641" y="254" width="70" height="81" rx="8" fill="white"/>
<path fillRule="evenodd" clipRule="evenodd" d="M676 301C684.837 301 692 293.837 692 285C692 276.163 684.837 269 676 269C667.163 269 660 276.163 660 285C660 293.837 667.163 301 676 301Z" fill="#DDE3E9"/>
<rect x="651" y="305" width="50" height="6" rx="3" fill="#DDE3E9"/>
<rect x="659" y="315" width="34" height="6" rx="3" fill="#DDE3E9"/>
<path d="M392 219C392 214.582 395.582 211 400 211H719C723.418 211 727 214.582 727 219V238H392V219Z" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M405 229C407.209 229 409 227.209 409 225C409 222.791 407.209 221 405 221C402.791 221 401 222.791 401 225C401 227.209 402.791 229 405 229Z" fill="#F2F2F2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M417 229C419.209 229 421 227.209 421 225C421 222.791 419.209 221 417 221C414.791 221 413 222.791 413 225C413 227.209 414.791 229 417 229Z" fill="#F2F2F2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M429 229C431.209 229 433 227.209 433 225C433 222.791 431.209 221 429 221C426.791 221 425 222.791 425 225C425 227.209 426.791 229 429 229Z" fill="#F2F2F2"/>
<rect x="641" y="343" width="70" height="194" rx="8" fill="white"/>
<rect x="659" y="361" width="34" height="26" rx="4" fill="#DDE3E9"/>
<rect x="659" y="395" width="34" height="25" rx="4" fill="#AFB9C5"/>
<rect x="659" y="428" width="34" height="25" rx="4" fill="#DDE3E9"/>
<rect x="659" y="494" width="34" height="25" rx="4" fill="#DDE3E9"/>
<rect x="659" y="461" width="34" height="25" rx="4" fill="#C5CFD6"/>
<rect x="408" y="255" width="225" height="47" rx="4" fill="white"/>
<g clip-path="url(#clip9_0_73)">
<rect x="417" y="269.1" width="167" height="7.05" rx="3" fill="#DDE3E9"/>
<rect x="417" y="280.85" width="112.096" height="7.05" rx="3" fill="#DDE3E9"/>
</g>
<path fillRule="evenodd" clipRule="evenodd" d="M608.954 285.5C612.82 285.5 615.954 282.366 615.954 278.5C615.954 274.634 612.82 271.5 608.954 271.5C605.088 271.5 601.954 274.634 601.954 278.5C601.954 282.366 605.088 285.5 608.954 285.5Z" fill="#DDE3E9"/>
<path fillRule="evenodd" clipRule="evenodd" d="M608.954 281.5C610.611 281.5 611.954 280.157 611.954 278.5C611.954 276.843 610.611 275.5 608.954 275.5C607.297 275.5 605.954 276.843 605.954 278.5C605.954 280.157 607.297 281.5 608.954 281.5Z" fill="#F2F2F2"/>
<rect x="408" y="310" width="225" height="39" rx="4" fill="white"/>
<g clip-path="url(#clip10_0_73)">
<rect x="417" y="321.7" width="167" height="5.85" rx="2.925" fill="#DDE3E9"/>
<rect x="417" y="331.45" width="112.096" height="5.85" rx="2.925" fill="#DDE3E9"/>
</g>
<path fillRule="evenodd" clipRule="evenodd" d="M608.954 336.5C612.82 336.5 615.954 333.366 615.954 329.5C615.954 325.634 612.82 322.5 608.954 322.5C605.088 322.5 601.954 325.634 601.954 329.5C601.954 333.366 605.088 336.5 608.954 336.5Z" fill="#DDE3E9"/>
<path fillRule="evenodd" clipRule="evenodd" d="M608.954 332.5C610.611 332.5 611.954 331.157 611.954 329.5C611.954 327.843 610.611 326.5 608.954 326.5C607.297 326.5 605.954 327.843 605.954 329.5C605.954 331.157 607.297 332.5 608.954 332.5Z" fill="#F2F2F2"/>
<rect x="408" y="357" width="225" height="39" rx="4" fill="white"/>
<g clip-path="url(#clip11_0_73)">
<rect x="417" y="368.7" width="167" height="5.85" rx="2.925" fill="#DDE3E9"/>
<rect x="417" y="378.45" width="112.096" height="5.85" rx="2.925" fill="#DDE3E9"/>
</g>
<path fillRule="evenodd" clipRule="evenodd" d="M608.954 383.5C612.82 383.5 615.954 380.366 615.954 376.5C615.954 372.634 612.82 369.5 608.954 369.5C605.088 369.5 601.954 372.634 601.954 376.5C601.954 380.366 605.088 383.5 608.954 383.5Z" fill="#DDE3E9"/>
<path fillRule="evenodd" clipRule="evenodd" d="M608.954 379.5C610.611 379.5 611.954 378.157 611.954 376.5C611.954 374.843 610.611 373.5 608.954 373.5C607.297 373.5 605.954 374.843 605.954 376.5C605.954 378.157 607.297 379.5 608.954 379.5Z" fill="#AFB9C5"/>
<rect x="408" y="498" width="225" height="39" rx="4" fill="white"/>
<g clip-path="url(#clip12_0_73)">
<rect x="417" y="509.7" width="167" height="5.85" rx="2.925" fill="#DDE3E9"/>
<rect x="417" y="519.45" width="112.096" height="5.85" rx="2.925" fill="#DDE3E9"/>
</g>
<path fillRule="evenodd" clipRule="evenodd" d="M608.954 524.5C612.82 524.5 615.954 521.366 615.954 517.5C615.954 513.634 612.82 510.5 608.954 510.5C605.088 510.5 601.954 513.634 601.954 517.5C601.954 521.366 605.088 524.5 608.954 524.5Z" fill="#DDE3E9"/>
<path fillRule="evenodd" clipRule="evenodd" d="M608.954 520.5C610.611 520.5 611.954 519.157 611.954 517.5C611.954 515.843 610.611 514.5 608.954 514.5C607.297 514.5 605.954 515.843 605.954 517.5C605.954 519.157 607.297 520.5 608.954 520.5Z" fill="#F2F2F2"/>
<rect x="408" y="451" width="225" height="39" rx="4" fill="white"/>
<g clip-path="url(#clip13_0_73)">
<rect x="417" y="462.7" width="167" height="5.85" rx="2.925" fill="#DDE3E9"/>
<rect x="417" y="472.45" width="112.096" height="5.85" rx="2.925" fill="#DDE3E9"/>
</g>
<path fillRule="evenodd" clipRule="evenodd" d="M608.954 477.5C612.82 477.5 615.954 474.366 615.954 470.5C615.954 466.634 612.82 463.5 608.954 463.5C605.088 463.5 601.954 466.634 601.954 470.5C601.954 474.366 605.088 477.5 608.954 477.5Z" fill="#DDE3E9"/>
<path fillRule="evenodd" clipRule="evenodd" d="M608.954 473.5C610.611 473.5 611.954 472.157 611.954 470.5C611.954 468.843 610.611 467.5 608.954 467.5C607.297 467.5 605.954 468.843 605.954 470.5C605.954 472.157 607.297 473.5 608.954 473.5Z" fill="#F2F2F2"/>
<rect x="408" y="404" width="225" height="39" rx="4" fill="white"/>
<g clip-path="url(#clip14_0_73)">
<rect x="417" y="415.7" width="167" height="5.85" rx="2.925" fill="#DDE3E9"/>
<rect x="417" y="425.45" width="112.096" height="5.85" rx="2.925" fill="#DDE3E9"/>
</g>
<path fillRule="evenodd" clipRule="evenodd" d="M608.954 430.5C612.82 430.5 615.954 427.366 615.954 423.5C615.954 419.634 612.82 416.5 608.954 416.5C605.088 416.5 601.954 419.634 601.954 423.5C601.954 427.366 605.088 430.5 608.954 430.5Z" fill="#DDE3E9"/>
<path fillRule="evenodd" clipRule="evenodd" d="M608.954 426.5C610.611 426.5 611.954 425.157 611.954 423.5C611.954 421.843 610.611 420.5 608.954 420.5C607.297 420.5 605.954 421.843 605.954 423.5C605.954 425.157 607.297 426.5 608.954 426.5Z" fill="#F2F2F2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M809.986 381.376C806.041 378.701 800.796 378 796.076 378C777.64 378 760.311 384.84 745.341 395.032C737.138 400.616 729.8 407.728 723.322 415.132C719.582 419.407 716.248 424.03 713.887 429.173C712.294 432.644 711.201 436.261 710.46 439.991C709.557 444.537 708.839 449.175 708.515 453.797C708.387 455.617 707.33 465.274 710.356 465.438C710.338 465.676 710.334 465.903 710.353 466.106C703.782 476.38 699.723 488.42 695.958 499.835C692.683 509.769 689.764 519.786 687.87 530.063C685.375 543.592 683.737 557.326 682.958 571.05C682.791 573.999 682.676 576.95 682.577 579.903C682.493 582.422 682.408 584.941 682.325 587.461C682.233 590.284 681.736 593.534 682.185 596.34C682.576 598.784 684.691 598.414 684.785 595.982C684.898 593.045 684.879 590.102 685.008 587.163C685.179 583.262 685.355 579.361 685.546 575.461C686.875 548.369 691.86 521.675 701.061 496.084C704.785 485.728 709.051 475.925 714.535 466.345C719.356 457.922 725.156 449.767 731.084 442.173C736.845 434.792 742.836 427.583 749.895 421.33C755.624 416.256 761.926 411.835 768.404 407.722C776.631 402.498 784.843 397.401 793.755 393.391C798.388 391.307 803.108 389.441 807.777 387.44C808.617 387.081 809.517 386.732 810.325 386.315C813.02 384.925 812.133 382.832 809.986 381.376" fill="#C1DEE2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M735.818 476C743.295 476 749.949 476.972 756.838 479.943C762.785 482.508 768.205 485.903 773.467 489.599C780.868 494.798 786.698 500.848 790.779 508.865C793.217 513.654 795.006 520.431 793.368 525.655C791.44 531.807 786.144 536.939 779.169 535.855C774.856 535.185 770.903 532.33 767.625 529.643C763.703 526.428 760.564 522.563 757.972 518.27C753.744 511.267 751.26 503.351 747.668 496.033C745.964 492.56 744.317 489.063 742.275 485.762C741.265 484.128 740.189 482.509 738.656 481.294C737.836 480.644 734.378 479.52 735.7 478.061C716.31 478.315 699.132 493.207 695.409 511.641C695.063 513.359 694.792 515.091 694.505 516.82C694.325 517.911 694.398 521.937 693.422 522.634C691.27 524.172 692.174 519.499 692.267 518.826C692.506 517.087 692.76 515.35 693.027 513.615C694.481 504.181 698.681 495.411 705.685 488.683C713.694 480.99 724.501 476 735.818 476" fill="#89C5CC"/>
<path fillRule="evenodd" clipRule="evenodd" d="M98.9379 508.736C117.604 540.052 139.345 570.374 152.401 604.613C151.875 600.577 151.317 596.545 150.692 592.52C147.38 571.179 143.262 549.994 138.936 528.835C136.733 518.062 134.402 507.327 132.012 496.594C130.727 490.829 129.457 485.061 128.145 479.302C127.827 477.906 127.554 475.469 127.157 473C139.845 514.637 152.081 556.305 161.031 598.942C162.205 604.538 163.205 610.124 164.024 615.7C164.304 614.428 164.58 613.156 164.881 611.887C168.503 596.68 173.935 581.594 180.403 567.374C183.495 560.575 187.046 553.924 191.228 547.726C193.836 543.863 199.986 539.271 202.364 535.314C189.355 559.176 184.657 589.032 177.145 614.973C175.312 621.304 173.467 627.624 171.659 633.955C182.987 611.237 200.563 592.571 225 584.483C195.42 604.027 177.678 638.254 165.722 673.26C165.683 673.675 165.636 674.09 165.595 674.506C169.114 667.829 173.545 661.789 179.551 657.56C192.407 648.504 206.667 651.142 219.137 658.91C209.35 652.689 191.663 658.354 183.428 664.677C177.533 669.203 172.495 675.275 168.12 681.2C167.072 682.62 165.641 684.277 164.13 686.044C162.012 699.795 158.56 713.452 153.672 727C154.479 723.111 153.896 716.892 154.12 713.993C154.144 713.679 154.164 713.365 154.188 713.053C153.445 716.019 152.727 718.951 152.036 721.837C153.41 716.331 154.156 710.583 154.739 704.776C154.889 702.281 155.036 699.785 155.19 697.29C155.141 692.553 154.946 687.799 154.616 683.036C153.447 678.408 152.137 674.042 151.056 670.411C147.159 657.31 141.444 644.76 134.411 633.051C127.994 622.366 120.312 612.688 111.445 603.935C106.664 599.217 101.661 594.725 96.7289 590.17C94.9453 588.523 91.7572 584.474 89 582.363C109.08 593.434 129.749 605.41 144.398 623.248C142.68 616.653 140.815 610.151 138.842 603.78C128.831 571.454 116.191 537.953 98.9379 508.736Z" fill="#DDE3E9"/>
<path fillRule="evenodd" clipRule="evenodd" d="M119 686C119 721.899 121.843 751 160 751C198.157 751 201 721.899 201 686" fill="#C5CFD6"/>
<rect x="642" y="168" width="6" height="25" rx="3" fill="#DDE3E9"/>
<rect x="656" y="152" width="6" height="41" rx="3" fill="#DDE3E9"/>
<rect x="670" y="144" width="6" height="49" rx="3" fill="#DDE3E9"/>
<rect x="684" y="152" width="6" height="41" rx="3" fill="#DDE3E9"/>
<rect x="698" y="136" width="6" height="57" rx="3" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M150 442.256C150 431.117 159.002 422 170 422V442.256L156.332 457C152.444 453.395 150 448.107 150 442.256Z" fill="#F2F2F2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M169.471 442H189.668C189.668 447.221 187.538 452.113 184.171 455.668C180.468 459.556 175.195 462 169.471 462C164.198 462 159.372 459.891 155.668 456.557L169.471 442Z" fill="#AFB9C5"/>
<path fillRule="evenodd" clipRule="evenodd" d="M190 442C190 431.002 180.998 422 170 422V442H190ZM160 422L168 440L150 432C151.78 427.334 155.777 423.78 160 422Z" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M800.766 451.179C798.845 453.219 796.123 454.5 793.095 454.5C787.278 454.5 782.562 449.799 782.562 444C782.562 438.201 787.278 433.5 793.095 433.5V414C776.546 414 763 427.503 763 444C763 460.497 776.546 474 793.095 474C801.788 474 809.645 470.334 815 464.502L800.766 451.179Z" fill="#F2F2F2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M793 414V433.5C798.799 433.5 803.5 438.201 803.5 444H823C823 427.503 809.497 414 793 414Z" fill="#AFB9C5"/>
<path fillRule="evenodd" clipRule="evenodd" d="M803.097 444C803.097 447.407 801.492 450.435 799 452.391L811.262 468C818.399 462.412 823 453.749 823 444H803.097Z" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M610.051 175.504C608.573 177.068 606.479 178.05 604.15 178.05C599.675 178.05 596.048 174.446 596.048 170C596.048 165.554 599.675 161.95 604.15 161.95V147C591.42 147 581 157.352 581 170C581 182.648 591.42 193 604.15 193C610.837 193 616.88 190.189 621 185.718L610.051 175.504Z" fill="#F2F2F2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M604 147V161.95C608.446 161.95 612.05 165.554 612.05 170H627C627 157.352 616.648 147 604 147Z" fill="#AFB9C5"/>
<path fillRule="evenodd" clipRule="evenodd" d="M612.073 170C612.073 172.555 610.869 174.827 609 176.293L618.196 188C623.55 183.809 627 177.312 627 170H612.073Z" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M246.007 192.986C246.003 192.996 245.999 193.006 245.993 193.018C245.999 193.008 246.007 192.968 246.007 192.986" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M245.998 193.001C245.998 193.003 245.996 193.007 245.996 193.011C245.996 193.001 246.014 192.971 245.998 193.001" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M246.067 192.832C246.053 192.872 246.035 192.91 246.019 192.95C246.027 192.93 246.035 192.914 246.043 192.894C245.835 193.414 245.967 193.076 246.067 192.832" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M246.022 192.953C246.014 192.971 246.006 192.991 245.998 193.009C245.94 193.121 246.022 192.953 246.022 192.953" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M245.999 193.002C245.999 193 245.999 193 246.001 192.998C245.999 193 245.999 193 245.999 193.002" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M245.99 193.016C245.978 193.04 246.046 192.924 245.99 193.016Z" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M245.998 193.002L246.002 192.998C246 193 246 193.002 245.998 193.002" fill="#C5CFD6"/>
<rect x="198" y="141" width="95" height="63" rx="4" fill="#DDE3E9"/>
<path fillRule="evenodd" clipRule="evenodd" d="M234 159L206 204H262L234 159Z" fill="#AFB9C5"/>
<path fillRule="evenodd" clipRule="evenodd" d="M261.5 171L237 204H286L261.5 171Z" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M272 171C276.971 171 281 166.971 281 162C281 157.029 276.971 153 272 153C267.029 153 263 157.029 263 162C263 166.971 267.029 171 272 171Z" fill="white"/>
<path fillRule="evenodd" clipRule="evenodd" d="M722.993 619.986C722.997 619.996 723.001 620.006 723.007 620.018C723.001 620.008 722.993 619.968 722.993 619.986" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M723.002 620.001C723.002 620.003 723.004 620.007 723.004 620.011C723.004 620.001 722.986 619.971 723.002 620.001" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M722.933 619.832C722.947 619.872 722.965 619.91 722.981 619.95C722.973 619.93 722.965 619.914 722.957 619.894C723.165 620.414 723.033 620.076 722.933 619.832" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M722.978 619.953C722.986 619.971 722.994 619.991 723.002 620.009C723.06 620.121 722.978 619.953 722.978 619.953" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M723.001 620.002C723.001 620 723.001 620 722.999 619.998C723.001 620 723.001 620 723.001 620.002" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M723.01 620.016C723.022 620.04 722.954 619.924 723.01 620.016Z" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M723.002 620.002L722.998 619.998C723 620 723 620.002 723.002 620.002" fill="#C5CFD6"/>
<rect width="142" height="94" rx="4" transform="matrix(-1 0 0 1 794 543)" fill="#DDE3E9"/>
<path fillRule="evenodd" clipRule="evenodd" d="M741.274 570L782.329 637H700.219L741.274 570Z" fill="#AFB9C5"/>
<path fillRule="evenodd" clipRule="evenodd" d="M698.944 587.946L735.239 637H662.649L698.944 587.946Z" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M683.5 588C676.044 588 670 581.956 670 574.5C670 567.044 676.044 561 683.5 561C690.956 561 697 567.044 697 574.5C697 581.956 690.956 588 683.5 588Z" fill="white"/>
<path fillRule="evenodd" clipRule="evenodd" d="M302.181 472.584C309.455 476.971 316.602 479.091 319.957 478.226C328.37 476.056 329.144 445.257 322.634 433.115C316.125 420.974 282.661 415.681 280.974 439.738C280.388 448.088 283.892 455.539 289.068 461.619L279.787 504.909H306.747L302.181 472.584Z" fill="#B28B67"/>
<path fillRule="evenodd" clipRule="evenodd" d="M269.22 431.73C268.349 430.867 267.874 429.634 267.463 428.464C267.037 427.248 266.622 426.02 266.339 424.754C265.773 422.226 265.767 419.318 267.57 417.355C269.015 415.781 271.184 415.074 273.186 414.921C274.52 414.819 275.889 415.005 277.168 415.426C278.436 415.843 279.53 416.675 280.759 417.191C280.806 414.466 281.273 411.615 282.654 409.289C283.983 407.05 286.103 405.794 288.516 405.462C290.993 405.121 293.44 405.701 295.657 406.901C296.212 407.201 296.763 407.516 297.289 407.873C297.73 408.171 298.188 408.531 298.705 408.652C299.282 408.787 299.567 408.454 299.942 408.033C300.381 407.54 300.876 407.105 301.4 406.72C303.716 405.016 306.755 404.316 309.438 405.337C310.674 405.807 311.877 406.606 312.715 407.707C313.463 408.689 313.996 410.246 315.028 410.929C315.466 411.22 315.775 410.835 316.174 410.551C316.773 410.124 317.344 409.652 317.95 409.237C318.801 408.653 319.723 408.217 320.71 407.988C322.155 407.654 324.152 407.732 324.565 409.626C324.72 410.337 324.602 411.098 324.551 411.815C324.483 412.799 324.411 413.783 324.325 414.766C324.261 415.512 324.179 416.233 324.038 416.966C323.963 417.356 323.728 418.084 323.895 418.476C324.105 418.965 325.07 418.687 325.482 418.704C326.297 418.737 327.115 418.88 327.868 419.228C328.452 419.499 329.066 419.896 329.312 420.565C329.464 420.976 329.424 421.399 329.352 421.822C329.266 422.33 329.365 422.599 329.429 423.112C330.523 422.573 334.314 421.375 334.791 423.337C334.95 423.99 334.588 424.728 334.312 425.279C333.828 426.246 333.194 427.129 332.545 427.972C331.192 429.729 329.577 431.245 327.839 432.541C329.875 433.447 330.407 436.119 328.643 437.711C327.865 438.414 326.818 438.571 325.836 438.526C325.477 438.509 324.959 438.371 324.676 438.434C324.524 438.467 324.361 438.596 324.15 438.611C322.764 438.706 321.2 438.372 319.845 438.064C317.432 437.516 315.146 436.371 313.28 434.628C312.801 434.181 312.406 433.924 311.762 433.93C311.197 433.936 310.643 434.091 310.079 434.105C308.586 434.143 307.24 433.413 305.854 432.927C305.77 434.801 305.236 436.865 304.47 438.55C303.846 439.925 302.542 440.125 301.26 440.245C297.161 440.631 293.048 440.2 288.945 440.206C292.917 441.105 297.022 441.475 300.959 442.532C302.739 443.01 301.38 444.211 300.619 445.043C299.366 446.413 298.434 448.111 297.788 449.899C295.845 447.364 292.41 445.694 289.367 446.473C286.005 447.333 283.637 451.883 285.787 455.155C287.035 457.054 289.289 457.787 291.165 458.603C289.702 460.125 289.348 462.373 288.467 464.267C288.033 465.201 287.423 466.257 286.452 466.583C286.092 466.703 285.671 466.714 285.387 467.007C285.036 467.37 284.953 467.776 284.504 468.088C282.714 469.333 279.919 469.237 278.332 467.612C276.898 466.142 277.271 463.817 278.469 462.327C276.562 461.531 273.087 460.508 273.845 457.535C269.713 457.26 259.679 450.553 265.225 445.652C262.181 443.93 259.385 439.723 261.34 436.014C262.846 433.158 266.347 431.882 269.22 431.73Z" fill="#191847"/>
<path fillRule="evenodd" clipRule="evenodd" d="M240.046 646.548H326.829L338.2 785.939H209.017L240.046 646.548Z" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M240.046 646.548H266.737L282.712 785.939H209.017L240.046 646.548Z" fill="black" fill-opacity="0.1"/>
<path fillRule="evenodd" clipRule="evenodd" d="M374.51 674.164C364.758 694.861 349.519 745.102 349.519 745.102L362.456 751.017C362.456 751.017 395.281 698.204 415.342 662.102C414.407 670.229 413.455 679.379 412.573 688.998C410.483 711.784 412.572 761.014 413.696 775.234C414.403 784.172 426.539 782.3 427.671 775.211C427.863 774.011 428.645 769.796 429.812 763.507C435.533 732.67 450.507 651.964 450.533 632.202C450.544 624.251 435.02 617.107 425.767 622.667C419.412 615.881 407.383 611.97 400.473 623.18C396.08 630.306 385.642 650.538 374.51 674.164Z" fill="#B28B67"/>
<path fillRule="evenodd" clipRule="evenodd" d="M350.444 726.502L394.847 621.241C405.484 604.118 435.308 624.725 431.68 634.657C423.445 657.204 381.56 730.199 379.107 736.916L350.444 726.502Z" fill="#1F28CF"/>
<path fillRule="evenodd" clipRule="evenodd" d="M351.144 738.717C350.457 737.768 349.116 737.545 348.217 738.295C346.379 739.831 343.57 742.332 342.58 744.047C341.061 746.681 339.023 752.239 339.023 752.239C342.076 754.003 393.893 783.94 393.893 783.94C393.893 783.94 400.114 778.1 395.831 774.874C391.549 771.647 388.763 769.432 388.763 769.432L369.75 743.217C369.419 742.761 368.777 742.668 368.33 743.012L364.295 746.122C364.295 746.122 358.88 745.649 356.213 744.108C354.522 743.131 352.441 740.507 351.144 738.717Z" fill="#E4E4E4"/>
<path fillRule="evenodd" clipRule="evenodd" d="M413.724 768.164C412.655 767.686 411.381 768.164 410.978 769.263C410.153 771.513 408.97 775.085 408.97 777.065C408.97 780.106 409.982 785.939 409.982 785.939C413.507 785.939 473.34 785.939 473.34 785.939C473.34 785.939 475.81 777.769 470.489 777.117C465.168 776.466 461.649 775.941 461.649 775.941L432.085 762.752C431.57 762.522 430.968 762.763 430.753 763.284L428.812 767.997C428.812 767.997 423.886 770.297 420.806 770.297C418.854 770.297 415.742 769.066 413.724 768.164Z" fill="#E4E4E4"/>
<path fillRule="evenodd" clipRule="evenodd" d="M453.645 640.29C453.645 670.155 439.473 739.817 439.464 746.393L408.97 746.416C408.97 746.416 415.665 653.178 413.718 652.173C411.771 651.169 333.904 659.953 310.551 659.953C276.875 659.953 262.944 638.702 261.813 599.335H328.524C342.107 600.789 412.957 615.09 439.269 620.006C450.533 622.11 453.645 632.063 453.645 640.29Z" fill="#2B44FF"/>
<path fillRule="evenodd" clipRule="evenodd" d="M362.609 613.121C341.275 657.583 251.469 627.561 251.469 627.561C251.469 619.857 254.523 612.133 257.73 604.021C261.168 595.323 264.784 586.178 265 576.134C265.398 557.654 268.851 501.663 283.261 482.749C283.524 481.894 283.79 481.037 284.06 480.178L285.058 480.648C285.213 480.487 285.37 480.33 285.528 480.178L316.971 485.043C316.971 499.275 326.072 512.77 334.265 524.918C336.258 527.874 338.198 530.75 339.94 533.538C342.221 537.189 344.796 540.906 347.434 544.714C360.795 564.002 375.791 585.649 362.609 613.121Z" fill="#C1DEE2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M322.319 604.716C324.422 593.857 325.786 586.607 326.412 582.967C343.163 601.909 352.84 611.49 355.443 611.71C360.34 612.123 363.957 607.778 364.988 609C366.69 614.058 361.881 626.721 352.689 628.562C348.3 629.441 341.507 620.383 338.708 617.173C337.608 615.911 332.145 611.759 322.319 604.716ZM351.255 546.818C355.597 546.818 357.929 548.615 360.497 552.239C363.064 555.864 365.494 572.957 361.372 572.957C357.25 572.957 339.979 566.35 339.979 561.907C339.979 557.465 351.763 555.584 351.763 552.239C351.763 548.895 346.912 546.818 351.255 546.818Z" fill="#B28B67"/>
<path fillRule="evenodd" clipRule="evenodd" d="M278.175 501.22C267.146 547.233 271.639 586.04 313.552 621.241C313.059 623.009 312.764 624.066 312.764 624.066C263.567 589.657 263.543 547.959 278.175 501.22Z" fill="black" fill-opacity="0.2"/>
<path fillRule="evenodd" clipRule="evenodd" d="M618.823 401.65C611.538 406.041 604.38 408.162 601.02 407.296C592.594 405.125 591.82 374.302 598.339 362.151C604.858 349.999 638.372 344.703 640.061 368.779C640.647 377.134 637.139 384.592 631.955 390.676L641.25 434H614.25L618.823 401.65Z" fill="#B28B67"/>
<path fillRule="evenodd" clipRule="evenodd" d="M613.728 348.146C617.287 347.562 626.868 347.161 628.635 347.161C629.764 347.161 630.988 347.419 631.657 346.383C632.204 345.533 632.004 344.098 632.167 343.112C632.357 341.968 632.627 340.838 632.899 339.711C633.675 336.504 634.849 333.453 636.49 330.589C639.571 325.215 644.084 321.005 649.781 318.556C656.073 315.851 663.192 315.232 669.959 315.78C677.201 316.367 683.757 318.758 690.595 321.008C697.111 323.152 703.935 323.995 710.75 322.949C717.617 321.894 722.805 318.172 728.596 314.64C734.525 311.024 741.301 308.659 748.31 309.203C754.853 309.71 760.883 312.412 766.293 316.021C771.355 319.397 775.532 323.46 777.89 329.177C780.427 335.327 780.424 342.078 776.253 347.514C770.206 355.392 758.981 357.43 749.643 357.227C744.241 357.11 738.936 356.124 733.836 354.331C727.035 351.938 721.157 347.884 714.795 344.594C711.809 343.05 708.722 341.782 705.487 340.869C702.347 339.983 699.255 339.576 696.413 341.472C693.406 343.479 690.711 345.45 687.271 346.706C683.971 347.91 680.476 348.584 676.96 348.557C670.119 348.504 663.376 346.373 656.732 344.945C651.314 343.781 645.517 342.621 639.993 343.74C637.688 344.207 634.322 345.171 633.489 347.567C647.5 350.106 653.003 367.434 649.053 380.154C646.921 387.02 634.106 395.046 629.124 391.437C625.967 389.15 627.884 386.148 629.124 384.166C631.499 380.371 632.312 375.496 627.917 372.854C624.126 370.575 620.14 375.987 620.064 375.981C619.023 375.899 610.02 370.807 603.817 363.377C597.697 363.74 596.769 359.705 598.23 356.405C599.691 353.106 608.811 348.953 613.728 348.146Z" fill="#191847"/>
<path fillRule="evenodd" clipRule="evenodd" d="M659.213 529L616.941 667.467L596.464 785.223H580.408L602.046 529H659.213Z" fill="#997659"/>
<path fillRule="evenodd" clipRule="evenodd" d="M674.336 529C671.465 605.026 674.844 644.241 675.486 651.148C676.129 658.055 684.928 702.842 705.76 787.542L688.651 781.655C655.729 703.973 644.51 663.6 640.734 653.399C636.958 643.199 626.929 601.732 610.648 529H674.336Z" fill="#B28B67"/>
<path fillRule="evenodd" clipRule="evenodd" d="M702.761 780.204C703.831 779.725 705.106 780.203 705.509 781.303C706.334 783.556 707.517 787.132 707.517 789.115C707.517 792.159 706.504 798 706.504 798C702.979 798 643.146 798 643.146 798C643.146 798 640.677 789.819 645.998 789.167C651.319 788.515 654.838 787.989 654.838 787.989L684.401 774.784C684.916 774.554 685.519 774.795 685.734 775.317L687.675 780.035C687.675 780.035 692.601 782.338 695.681 782.338C697.632 782.338 700.744 781.106 702.761 780.204Z" fill="#E4E4E4"/>
<path fillRule="evenodd" clipRule="evenodd" d="M597.168 780.204C598.238 779.725 599.513 780.203 599.916 781.303C600.74 783.556 601.923 787.132 601.923 789.115C601.923 792.159 600.911 798 600.911 798C597.386 798 537.553 798 537.553 798C537.553 798 535.083 789.819 540.404 789.167C545.725 788.515 549.245 787.989 549.245 787.989L578.808 774.784C579.323 774.554 579.926 774.795 580.14 775.317L582.082 780.035C582.082 780.035 587.007 782.338 590.087 782.338C592.039 782.338 595.15 781.106 597.168 780.204Z" fill="#E4E4E4"/>
<path fillRule="evenodd" clipRule="evenodd" d="M664.83 529L646.857 599.547H591.959L600.144 529H664.83Z" fill="#69A1AC"/>
<path fillRule="evenodd" clipRule="evenodd" d="M674.94 529C683.811 555.642 678.31 599.547 678.31 599.547H622.289L606.884 529H674.94Z" fill="#89C5CC"/>
<path fillRule="evenodd" clipRule="evenodd" d="M736.067 564.484C731.873 558.331 703.604 475.535 703.604 475.535L679.222 479.055C679.222 479.055 719.759 565.272 722.075 569.282C725.084 574.491 722.419 583.048 720.612 588.851C720.333 589.748 720.074 590.58 719.86 591.323C723.652 592.415 725.095 590.248 726.616 587.963C728.335 585.383 730.153 582.652 735.569 584.299C737.661 584.935 739.671 585.752 741.635 586.55C748.418 589.308 754.65 591.841 761.81 585.912C762.945 584.972 763.902 581.899 760.295 580.109C751.31 575.651 738.117 567.491 736.067 564.484ZM525.951 560.205L553.19 525.038L566.217 541.669L536.114 565.594C529.704 579.69 525.657 585.96 523.973 584.404C522.553 583.092 522.88 581.39 523.181 579.822C523.416 578.601 523.635 577.46 523 576.65C521.551 574.8 515.124 576.879 509.11 579.113C503.096 581.347 504.104 578.102 505.2 576.329C510.401 570.78 517.318 565.405 525.951 560.205Z" fill="#B28B67"/>
<path fillRule="evenodd" clipRule="evenodd" d="M619.56 416.904L609.695 416.608C602.045 472.289 529.204 519.748 527.231 540.438C526.507 548.026 532.321 550.993 529.902 553.613L543.709 561.003C545.482 558.235 550.642 562.117 559.647 557.629C568.653 553.141 628.471 480.309 619.56 416.904Z" fill="#DB2721"/>
<path fillRule="evenodd" clipRule="evenodd" d="M635.611 403.212C637.772 402.753 639.896 404.133 640.356 406.294L641.83 413.225C661.917 424.604 712.7 459.904 735.296 535.729C737.67 543.694 736.058 548.366 734.771 552.098C733.89 554.652 733.16 556.766 733.962 559.194L718.209 566.012C717.951 564.172 715.689 563.063 712.77 561.632C708.527 559.551 702.896 556.789 700.019 550.112C697.292 543.782 693.497 535.931 689.06 527.227C690.464 539.383 689.729 550.847 686.012 560.779C676.74 585.557 600.91 570.469 590.058 548.046C584.267 536.08 588.506 524.755 594.113 509.778C601.23 490.765 610.55 465.867 604.356 426.3L601.841 414.475C601.381 412.314 602.76 410.191 604.921 409.732L635.611 403.212Z" fill="#FF4133"/>
<defs>
<clipPath id="clip0_0_73">
<rect width="837.341" height="272.541" fill="white" transform="translate(73.3297 444.965)"/>
</clipPath>
<clipPath id="clip1_0_73">
<rect width="73" height="21.6" fill="white" transform="translate(313 204.2)"/>
</clipPath>
<clipPath id="clip2_0_73">
<rect width="73" height="16.8" fill="white" transform="translate(313 262.6)"/>
</clipPath>
<clipPath id="clip3_0_73">
<rect width="73" height="16.8" fill="white" transform="translate(313 312.6)"/>
</clipPath>
<clipPath id="clip4_0_73">
<rect width="73" height="16.8" fill="white" transform="translate(313 362.6)"/>
</clipPath>
<clipPath id="clip5_0_73">
<rect width="73" height="21.6" fill="white" transform="translate(349 230.2)"/>
</clipPath>
<clipPath id="clip6_0_73">
<rect width="73" height="16.8" fill="white" transform="translate(379 288.6)"/>
</clipPath>
<clipPath id="clip7_0_73">
<rect width="73" height="16.8" fill="white" transform="translate(349 338.6)"/>
</clipPath>
<clipPath id="clip8_0_73">
<rect width="73" height="16.8" fill="white" transform="translate(379 388.6)"/>
</clipPath>
<clipPath id="clip9_0_73">
<rect width="167" height="18.8" fill="white" transform="translate(417 269.1)"/>
</clipPath>
<clipPath id="clip10_0_73">
<rect width="167" height="15.6" fill="white" transform="translate(417 321.7)"/>
</clipPath>
<clipPath id="clip11_0_73">
<rect width="167" height="15.6" fill="white" transform="translate(417 368.7)"/>
</clipPath>
<clipPath id="clip12_0_73">
<rect width="167" height="15.6" fill="white" transform="translate(417 509.7)"/>
</clipPath>
<clipPath id="clip13_0_73">
<rect width="167" height="15.6" fill="white" transform="translate(417 462.7)"/>
</clipPath>
<clipPath id="clip14_0_73">
<rect width="167" height="15.6" fill="white" transform="translate(417 415.7)"/>
</clipPath>
</defs>
</svg>


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

<svg width="100vw" height="427" viewBox="0 0 324 427" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M126 362C168.526 362 203 329.093 203 288.5C203 247.907 168.526 215 126 215C83.4741 215 49 247.907 49 288.5C49 329.093 83.4741 362 126 362Z" fill="#C5CFD6"/>
<path fillRule="evenodd" clipRule="evenodd" d="M245.711 284.58C249.43 297.608 258.696 322.302 271.509 350.66L283.685 347.107C273.033 281.853 264.168 238.651 259.09 225.502C255.735 216.814 230.353 217.832 233.273 235.313C234.498 242.643 239.343 262.273 245.711 284.58ZM195.667 238.361C175.812 242.475 134.644 257.017 122.888 261.664C115.5 264.584 120.263 274.488 126.566 273.622C127.633 273.475 131.41 273.052 137.044 272.422C155.142 270.397 192.412 266.228 220.679 262.16C235.563 260.017 227.556 232.138 212.102 235.088C206.903 236.081 201.373 237.179 195.667 238.361Z" fill="#B28B67"/>
<path fillRule="evenodd" clipRule="evenodd" d="M259.869 218.138C257.839 211.514 165.562 188 165.562 188H158V195.047L221.587 227.416C221.503 228.461 221.554 229.565 221.759 230.729C221.3 254.726 231.571 272.653 241.739 290.402C248.389 302.008 254.994 313.539 258.528 326.641L281.889 323.156C281.209 321.416 280.133 313.568 278.661 302.839C274.952 275.785 268.729 230.409 260 218.403C259.97 218.361 259.939 218.32 259.907 218.278C259.896 218.231 259.883 218.185 259.869 218.138Z" fill="#1F28CF"/>
<path fillRule="evenodd" clipRule="evenodd" d="M163.283 246.64C157.465 245.476 152.107 244.436 147.523 243.632C117.909 238.438 109.274 222.586 114.38 188H168.942C177.855 190.56 224.174 209.985 248.207 220.316C264.113 227.154 259.099 251.804 250.091 258.219C250.042 258.613 249.88 258.88 249.591 259C215.44 273.154 186.318 272.098 167.617 271.42C159.784 271.136 153.78 270.918 150 271.912L144.077 253.228L163.283 246.64Z" fill="#2B44FF"/>
<path fillRule="evenodd" clipRule="evenodd" d="M129.127 260.695C129.081 259.525 128.094 258.589 126.93 258.713C124.806 258.939 121.672 259.38 120.147 260.124C117.716 261.31 113.447 264.395 113.447 264.395C114.822 267.215 138.171 315.088 138.171 315.088C138.171 315.088 145.668 313.878 144.112 309.367C142.557 304.855 141.603 301.835 141.603 301.835L140.615 273.15C140.596 272.587 140.115 272.151 139.553 272.186L135.14 272.463C135.14 272.463 131.379 269.419 130.177 266.955C129.446 265.455 129.204 262.655 129.127 260.695Z" fill="#E4E4E4"/>
<path fillRule="evenodd" clipRule="evenodd" d="M268.45 344.284C267.378 343.813 266.104 344.29 265.705 345.391C264.977 347.398 264 350.409 264 352.106C264 354.811 264.901 360 264.901 360C268.039 360 321.303 360 321.303 360C321.303 360 323.502 352.732 318.765 352.152C314.028 351.573 310.895 351.106 310.895 351.106L284.68 339.419C284.165 339.189 283.563 339.43 283.348 339.951L281.663 344.039C281.663 344.039 277.278 346.085 274.537 346.085C272.868 346.085 270.246 345.074 268.45 344.284Z" fill="#E4E4E4"/>
<path fillRule="evenodd" clipRule="evenodd" d="M155.935 75.2443C162.411 79.1475 168.774 81.0333 171.76 80.2635C179.25 78.333 179.938 50.9351 174.143 40.1339C168.349 29.3328 138.558 24.625 137.057 46.0255C136.536 53.4529 139.654 60.0814 144.262 65.4901L136 104H160L155.935 75.2443Z" fill="#B28B67"/>
<path fillRule="evenodd" clipRule="evenodd" d="M142.418 70.3075C139.406 56.9065 130.825 47.7714 132.135 41.7817C133.446 35.792 139.121 34.3321 139.121 34.3321C139.121 34.3321 142.057 22.4572 158.056 24.2304C174.055 26.0036 183.819 32.6478 179.602 47.2679C175.726 47.2679 171.046 45.866 164.576 48.2679C161.496 49.411 160.17 55.358 160.17 55.358H157.246C157.246 55.358 152.989 48.3006 148.851 50.1712C144.713 52.0418 146.97 59.2586 146.97 59.2586L145.529 70.3075H142.418Z" fill="#191847"/>
<path fillRule="evenodd" clipRule="evenodd" d="M244.679 194.635L212.781 171.211L205.73 188.642L237.317 201.741C246.251 212.235 251.246 216.61 252.304 214.865C253.195 213.394 252.498 212.017 251.856 210.749C251.356 209.76 250.89 208.838 251.233 207.989C252.018 206.049 258.019 206.254 263.705 206.691C269.392 207.128 267.735 204.598 266.364 203.349C260.559 199.874 253.331 196.97 244.679 194.635ZM77.3979 235.908C80.3284 229.963 90.3079 172.02 90.3079 172.02L111.205 172.102C111.205 172.102 91.8506 234.583 90.3079 238.406C88.304 243.372 91.708 250.587 94.0161 255.48C94.3732 256.237 94.704 256.938 94.9846 257.567C91.7819 259 90.2434 257.268 88.6215 255.442C86.7896 253.379 84.8511 251.197 80.2879 253.319C78.5249 254.14 76.8567 255.109 75.2268 256.057C69.5968 259.329 64.4248 262.336 57.389 257.994C56.2736 257.306 55.0513 254.715 58.0046 252.69C65.3623 247.645 75.9653 238.815 77.3979 235.908Z" fill="#B28B67"/>
<path fillRule="evenodd" clipRule="evenodd" d="M149.695 84.332L158.342 82.8489C190.425 110.564 203.603 163.809 242.93 192.015L233.464 203.748C165.24 195.3 148.33 130.355 149.695 84.332Z" fill="#E87613"/>
<path fillRule="evenodd" clipRule="evenodd" d="M112 193C112 193 164.008 193 188.511 193C192.008 193 191.349 187.952 190.843 185.404C185.011 156.004 162.241 124.312 162.241 82.4607L140.172 79C121.917 108.358 115.605 144.505 112 193Z" fill="#DDE3E9"/>
<path fillRule="evenodd" clipRule="evenodd" d="M103.397 214C99.9582 222.259 96.5863 229.465 93.409 235H77C75.2346 177.919 96.8454 133.996 114.932 107.513C110.916 107.226 107.291 105.545 105 101.411C96.9336 86.8561 99.8467 78.8424 108.467 76.2083C113.207 74.7598 117.666 75.7485 123.002 76.932C127.369 77.9004 132.325 78.9993 138.504 79C138.506 79 138.508 79 138.51 79C139.109 79 139.654 79.0401 140.149 79.1169L147.472 79.5347C147.472 79.5347 177.205 180.305 163.872 214H103.397Z" fill="#FF9B21"/>
<path fillRule="evenodd" clipRule="evenodd" d="M103.397 214C107.909 203.164 112.535 190.516 116.987 177.454C118.645 191.839 121.405 206.286 126 214H103.397Z" fill="black" fill-opacity="0.1"/>
</svg>

        </div>
    )
  }

  function Terms_of_Service(props){
    return(
  <div style={{display:"flex" , flex:1 , justifyContent:"center" ,flexDirection:"column" ,alignItems:"center"  }} >

<h2><strong>Terms and Conditions</strong></h2>

<p>Welcome to www.smorentel.com!</p>

<p>These terms and conditions outline the rules and regulations for the use of smorentel's Website, located at https://www.smorentel.com.</p>

<p>By accessing this website we assume you accept these terms and conditions. Do not continue to use www.smorentel.com if you do not agree to take all of the terms and conditions stated on this page.</p>

<p>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>

<h3><strong>Cookies</strong></h3>

<p>We employ the use of cookies. By accessing www.smorentel.com, you agreed to use cookies in agreement with the smorentel's Privacy Policy. </p>

<p>Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>

<h3><strong>License</strong></h3>

<p>Unless otherwise stated, smorentel and/or its licensors own the intellectual property rights for all material on www.smorentel.com. All intellectual property rights are reserved. You may access this from www.smorentel.com for your own personal use subjected to restrictions set in these terms and conditions.</p>

<p>You must not:</p>
<ul>
  <li>Republish material from www.smorentel.com</li>
  <li>Sell, rent or sub-license material from www.smorentel.com</li>
  <li>Reproduce, duplicate or copy material from www.smorentel.com</li>
  <li>Redistribute content from www.smorentel.com</li>
</ul>

<p>This Agreement shall begin on the date hereof. Our Terms and Conditions were created with the help of the <a href="https://www.termsfeed.com/terms-conditions-generator/">TermsFeed Free Terms and Conditions Generator</a>.</p>

<p>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. smorentel does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of smorentel,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, smorentel shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>

<p>smorentel reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>

<p>You warrant and represent that:</p>

<ul>
  <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
  <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
  <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
  <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
</ul>

<p>You hereby grant smorentel a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</p>

<h3><strong>Hyperlinking to our Content</strong></h3>

<p>The following organizations may link to our Website without prior written approval:</p>

<ul>
  <li>Government agencies;</li>
  <li>Search engines;</li>
  <li>News organizations;</li>
  <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
  <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
</ul>

<p>These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.</p>

<p>We may consider and approve other link requests from the following types of organizations:</p>

<ul>
  <li>commonly-known consumer and/or business information sources;</li>
  <li>dot.com community sites;</li>
  <li>associations or other groups representing charities;</li>
  <li>online directory distributors;</li>
  <li>internet portals;</li>
  <li>accounting, law and consulting firms; and</li>
  <li>educational institutions and trade associations.</li>
</ul>

<p>We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of smorentel; and (d) the link is in the context of general resource information.</p>

<p>These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site.</p>

<p>If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to smorentel. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.</p>

<p>Approved organizations may hyperlink to our Website as follows:</p>

<ul>
  <li>By use of our corporate name; or</li>
  <li>By use of the uniform resource locator being linked to; or</li>
  <li>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site.</li>
</ul>

<p>No use of smorentel's logo or other artwork will be allowed for linking absent a trademark license agreement.</p>

<h3><strong>iFrames</strong></h3>

<p>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</p>

<h3><strong>Content Liability</strong></h3>

<p>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>

<h3><strong>Your Privacy</strong></h3>

<p>Please read Privacy Policy</p>

<h3><strong>Reservation of Rights</strong></h3>

<p>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>

<h3><strong>Removal of links from our website</strong></h3>

<p>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</p>

<p>We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</p>

<h3><strong>Disclaimer</strong></h3>

<p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>

<ul>
  <li>limit or exclude our or your liability for death or personal injury;</li>
  <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
  <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
  <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
</ul>

<p>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>

<p>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
  </div>
    );
}

  
  function Privacy_Policy(props){
    return(
  <div style={{display:"flex" , flex:1 , justifyContent:"center" ,flexDirection:"column" ,alignItems:"center" , maxWidth:"100vw"  }} >

<h1>Privacy Policy</h1>
<p>Last updated: June 14, 2022</p>
<p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
<p>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the <a href="https://www.termsfeed.com/privacy-policy-generator/" target="_blank">TermsFeed Privacy Policy Generator</a>.</p>
<h1>Interpretation and Definitions</h1>
<h2>Interpretation</h2>
<p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
<h2>Definitions</h2>
<p>For the purposes of this Privacy Policy:</p>
<ul>
<li>
<p><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</p>
</li>
<li>
<p><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Digiglee india pvt ltd, Connaught Palace , Delhi.</p>
</li>
<li>
<p><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</p>
</li>
<li>
<p><strong>Country</strong> refers to: Delhi,  India</p>
</li>
<li>
<p><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>
</li>
<li>
<p><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</p>
</li>
<li>
<p><strong>Service</strong> refers to the Website.</p>
</li>
<li>
<p><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</p>
</li>
<li>
<p><strong>Third-party Social Media Service</strong> refers to any website or any social network website through which a User can log in or create an account to use the Service.</p>
</li>
<li>
<p><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</p>
</li>
<li>
<p><strong>Website</strong> refers to smorentel, accessible from <a href="https://www.smorentel.com" rel="external nofollow noopener" target="_blank">https://www.smorentel.com</a></p>
</li>
<li>
<p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
</li>
</ul>
<h1>Collecting and Using Your Personal Data</h1>
<h2>Types of Data Collected</h2>
<h3>Personal Data</h3>
<p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
<ul>
<li>
<p>Email address</p>
</li>
<li>
<p>First name and last name</p>
</li>
<li>
<p>Phone number</p>
</li>
<li>
<p>Address, State, Province, ZIP/Postal code, City</p>
</li>
<li>
<p>Usage Data</p>
</li>
</ul>
<h3>Usage Data</h3>
<p>Usage Data is collected automatically when using the Service.</p>
<p>Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
<p>When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</p>
<p>We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</p>
<h3>Information from Third-Party Social Media Services</h3>
<p>The Company allows You to create an account and log in to use the Service through the following Third-party Social Media Services:</p>
<ul>
<li>Google</li>
<li>Facebook</li>
<li>Twitter</li>
<li>LinkedIn</li>
</ul>
<p>If You decide to register through or otherwise grant us access to a Third-Party Social Media Service, We may collect Personal data that is already associated with Your Third-Party Social Media Service's account, such as Your name, Your email address, Your activities or Your contact list associated with that account.</p>
<p>You may also have the option of sharing additional information with the Company through Your Third-Party Social Media Service's account. If You choose to provide such information and Personal Data, during registration or otherwise, You are giving the Company permission to use, share, and store it in a manner consistent with this Privacy Policy.</p>
<h3>Tracking Technologies and Cookies</h3>
<p>We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:</p>
<ul>
<li><strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.</li>
<li><strong>Flash Cookies.</strong> Certain features of our Service may use local stored objects (or Flash Cookies) to collect and store information about Your preferences or Your activity on our Service. Flash Cookies are not managed by the same browser settings as those used for Browser Cookies. For more information on how You can delete Flash Cookies, please read &quot;Where can I change the settings for disabling, or deleting local shared objects?&quot; available at <a href="https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_" rel="external nofollow noopener" target="_blank">https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main Where can I change the settings for disabling or deleting local shared objects</a></li>
<li><strong>Web Beacons.</strong> Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).</li>
</ul>
<p>Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser. You can learn more about cookies on <a href="https://www.termsfeed.com/blog/cookies/#What_Are_Cookies" target="_blank">TermsFeed website</a> article.</p>
<p>We use both Session and Persistent Cookies for the purposes set out below:</p>
<ul>
<li>
<p><strong>Necessary / Essential Cookies</strong></p>
<p>Type: Session Cookies</p>
<p>Administered by: Us</p>
<p>Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</p>
</li>
<li>
<p><strong>Cookies Policy / Notice Acceptance Cookies</strong></p>
<p>Type: Persistent Cookies</p>
<p>Administered by: Us</p>
<p>Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</p>
</li>
<li>
<p><strong>Functionality Cookies</strong></p>
<p>Type: Persistent Cookies</p>
<p>Administered by: Us</p>
<p>Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</p>
</li>
</ul>
<p>For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.</p>
<h2>Use of Your Personal Data</h2>
<p>The Company may use Personal Data for the following purposes:</p>
<ul>
<li>
<p><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</p>
</li>
<li>
<p><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</p>
</li>
<li>
<p><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</p>
</li>
<li>
<p><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</p>
</li>
<li>
<p><strong>To provide You</strong> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</p>
</li>
<li>
<p><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</p>
</li>
<li>
<p><strong>For business transfers:</strong> We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</p>
</li>
<li>
<p><strong>For other purposes</strong>: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</p>
</li>
</ul>
<p>We may share Your personal information in the following situations:</p>
<ul>
<li><strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service,  to contact You.</li>
<li><strong>For business transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</li>
<li><strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</li>
<li><strong>With business partners:</strong> We may share Your information with Our business partners to offer You certain products, services or promotions.</li>
<li><strong>With other users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside. If You interact with other users or register through a Third-Party Social Media Service, Your contacts on the Third-Party Social Media Service may see Your name, profile, pictures and description of Your activity. Similarly, other users will be able to view descriptions of Your activity, communicate with You and view Your profile.</li>
<li><strong>With Your consent</strong>: We may disclose Your personal information for any other purpose with Your consent.</li>
</ul>
<h2>Retention of Your Personal Data</h2>
<p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
<p>The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</p>
<h2>Transfer of Your Personal Data</h2>
<p>Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.</p>
<p>Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</p>
<p>The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</p>
<h2>Disclosure of Your Personal Data</h2>
<h3>Business Transactions</h3>
<p>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>
<h3>Law enforcement</h3>
<p>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>
<h3>Other legal requirements</h3>
<p>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>
<ul>
<li>Comply with a legal obligation</li>
<li>Protect and defend the rights or property of the Company</li>
<li>Prevent or investigate possible wrongdoing in connection with the Service</li>
<li>Protect the personal safety of Users of the Service or the public</li>
<li>Protect against legal liability</li>
</ul>
<h2>Security of Your Personal Data</h2>
<p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
<h1>Children's Privacy</h1>
<p>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.</p>
<p>If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.</p>
<h1>Links to Other Websites</h1>
<p>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</p>
<p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
<h1>Changes to this Privacy Policy</h1>
<p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
<p>We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.</p>
<p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
<h1>Contact Us</h1>
<p>If you have any questions about this Privacy Policy, You can contact us:</p>
<ul>
<li>
<p>By email: contact@smorentel.com</p>
</li>
<li>
<p>By phone number: +91 8405905399</p>
</li>
</ul>
  </div>
    );
}