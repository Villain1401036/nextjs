import React, { useContext, useEffect, useState } from 'react'
import { convertToJson, latestworkobj, ongoingwork, Shopname, user } from '../constants'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import { fade, makeStyles  } from '@material-ui/core/styles';
import {Avatar, Chip, Slider, Switch, TextField, useMediaQuery } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'; 
import InputBase from '@material-ui/core/InputBase';




import { CLR_HEAD, CLR_RCARD1, CLR_RCARD2, CLR_RCARD3, } from '../themes.js'

import router, { useRouter } from 'next/router';
import { AuthContext } from '../context';
import {  FormGroup ,Modal, Tab, Tabs } from 'react-bootstrap';


import {FiMapPin , FiFilter} from 'react-icons/fi';
import { FaArrowLeft, FaHome, FaSearch} from 'react-icons/fa';
import { getlocal, getobjlocal, localkeys, storelocal } from '../localstore';


const useStyles = makeStyles((theme) => ({
  
 
	paper: {
     marginRight: theme.spacing(2),
   },
logo:{
	height:50+"%",
	width:10+"%",

},
  root: {
    width:100+"vw",
    flexGrow: 1 ,
	elevation: 0,

  },

  
	appbar:{ 
    boxShadow:0+"vw",
    elevation: 0,
    width:100+"vw" ,
    height: 30+"vw",
    borderBottom:"1px solid white",
    backgroundColor: CLR_HEAD,
		// height:10+"vw",
    boxShadow: "0px 0px",
    '@media (min-width:845px)': { // eslint-disable-line no-useless-computed-key
      height: 5+"vw"
    },
    '@media (max-width:360px)': { // eslint-disable-line no-useless-computed-key
      // height: 15+"vw"
    }

	},

   namebar:{
     zIndex:2000,display:"flex",height:"13vw", alignItems:"center" , borderBottomWidth:1 ,
      borderBottomStyle:"solid", borderColor:"lightgrey", position:"sticky",top:0,backgroundColor:"white" 
   ,'@media (min-width:845px)': { // eslint-disable-line no-useless-computed-key
    height: 5+"vw"
  },
  '@media (max-width:360px)': { // eslint-disable-line no-useless-computed-key
    
  }

  
  },
  labelname:{
    fontSize: 7+"vw",
    '@media (min-width:845px)': { // eslint-disable-line no-useless-computed-key
      fontSize: 3+"vw"
    },
    '@media (max-width:360px)': { // eslint-disable-line no-useless-computed-key
      fontSize: 7+"vw"
    }
  },
  toolbar:{ 
    
    // height:10+"vw",
    
  	elevation: 0,
    width:100+"vw" ,
		backgroundColor: CLR_HEAD,
    height:100+"%",
    '@media (min-width:845px)': { // eslint-disable-line no-useless-computed-key
      height: 5+"vw"
    },
    '@media (max-width:360px)': { // eslint-disable-line no-useless-computed-key
      // height: 15+"vw"
    }

	},
  createbtn: {
    backgroundColor:"white",
    width: 10+"vw" ,
    height: 50+"%" ,
    margin:1+"vw", 
    fontWeight:"bold",
    fontSize: 50+"%"

  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color:"white",
    width:100+"%"
  },
	search: {
    width:40+"%",height:70+"%",backgroundColor:"white",borderRadius:"5vw" , flex:1 , display:"flex",alignItems:"center" ,
   

    '@media (max-width:600px)': { // eslint-disable-line no-useless-computed-key
      height: 0+"vw",
      width:"0vw"
    },
  

 },
	searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center' ,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: { 
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]:{
      width: '12ch' ,
      '&:focus': {
        width: '20ch',
      },
    },
  },
  drawerroot :{
    backgroundColor:CLR_HEAD,
    width:60+"vw",  

    flex:1 , 
    display:"flex",
    flexDirection:"column",
   
    '@media (min-width:845px)': { // eslint-disable-line no-useless-computed-key
      width:50+"vw",
    },
  },
  drawButt:{
    width:60+"vw",
    paddingBlock:3+"%",
    paddingInline:"20%",
    opacity:100,
    textAlign:"right",
    color:CLR_RCARD2,
    '@media (min-width:845px)': { // eslint-disable-line no-useless-computed-key
      width:50+"vw",
      
    },

  
  
    
  },
  drawButtinner:{
    fontSize: 150+"%"
  },
  type:{
    fontSize:40+"px",
    color:CLR_RCARD2
  },

  menuback:{
    //backgroundColor:"purple",
    width:7+"vw",
    height:7+"vw",
    //borderRadius:5+"vw"
  },



}));

const headerimg = "https://upload.wikimedia.org/wikipedia/commons/2/28/Red_rose.jp"

export default function ButtonAppBar(props) {
  const classes = useStyles();
	const [drawerState,setDrawerState] = React.useState(false);
  const router = useRouter()

  const [isloaded,setIsloaded] = React.useState(false);
  const [locfocus , setLocfocus] = React.useState(false);

  const [filteropen , setFilteropen] = React.useState(false);
  const authContext = useContext(AuthContext);
  const [refresh , setRefresh] = React.useState(false);


    const [location ,setLocation] = useState("");//get from the database
  const toogleDstate = () => {
      setDrawerState(!drawerState); 
	}

  React.useEffect(() => {

    // Update the document title using the browser API
    if ( !isloaded){
        setLocation(getlocal("place"))
        setIsloaded(true)
    }
     
    
  });

  

   
   
  // 

  // console.log(convertToJson(getobjlocal("userdata")[0]["metadata"])["photoURL"]);
 
return (
   <>
      <AppBar position="sticky" className={classes.appbar} >
        <Toolbar className={classes.toolbar} >    
         

          <img src='/images/SMOR-512.png' style={{ height:80+"%" ,objectFit:"cover"}} onClick={()=> { authContext.setModel(!authContext.modelopen) }}></img>
       
          {false?
            <div></div>:
            <>
            
					
            { !props.disablesearchbar && <div className={classes.search }  onClick={()=>router.push("/searchpage")}>
			 <FaSearch color={CLR_HEAD} overlineThickness={1}  style={{height:70+"%",width:15+"%"}} />
				 </div> }
            
					
           <div style={{marginLeft: 2+"vw", display:"flex",flex:1, flexDirection:"row"}} >
           { props.placebutt &&
            <>{
              locfocus? <div><InputBase
              placeholder="Location"
              style={{color: CLR_HEAD , backgroundColor: CLR_RCARD1 , borderRadius:3+"px" , paddingRight:5+"%" ,paddingLeft:5+"%" , textAlign:"center"  }}
              
              
              onChange={(e)=>{if(e.target.value){setLocation(e.target.value)}; }}

              onKeyPress={(event)=>{ if(event.key === 'Enter'){
                 
                storelocal("place",location);
             
                setLocfocus(false)
                
              }}}
            ></InputBase></div>:
            <div style={{ maxWidth: 40+"vw" ,  display: "flex",flex:1, flexDirection:"row-reverse",borderStyle:"solid", borderWidth:0.5+"px", borderRadius:2+"px"}} >
             <div style={{ borderStyle:"solid", borderWidth:0.5+"px", borderRadius:2+"px"}} ><FiMapPin fontSize={"large"}  style={{height:100+"%", marginLeft:5+"px" , marginRight: 5+"px" }} onClick={()=>{ }} /></div>
           
            <div
              style={{overflow: "hidden", textOverflow:"ellipsis",whiteSpace: "nowrap",color: CLR_RCARD2 , padding: 5+"px" , flex:1, textAlign:"center"}}
              onClick={()=>{ router.push('/searchpage');
                setLocfocus(true) } } 
            >{location}</div>

            </div>

            }
            </>
          }

               </div>
				 </>
          }
					
          <IconButton edge="start"  color="inherit" aria-label="menu" onClick={()=>toogleDstate()} >

 { authContext.isLoggedIn ? <Avatar src={convertToJson(getobjlocal("userdata")[0]["metadata"])["photoURL"]} /> : <MenuIcon /> }

<Drawer anchor={"right"} open={drawerState}  onClose={()=>console.log("closed")} variant='temporary'>
   <Drawercomponent />
        </Drawer>
</IconButton >
        </Toolbar>
      </AppBar>
      <>
      
        <Modal  style={{zIndex:2000}}  show={filteropen} backdrop={"static"} children={<EditFilter onClickgetfilter={(data)=>{ setLocation(getlocal("place"))}} closemodal={()=>{setFilteropen(false)}} filters={{"place":"" , "distance":34 ,"price":34 ,"tags":"asd~dfsd" ,"category":"asdasd~dsfsd"}} />} >
  
         </Modal>
      
        </>
      </>
  
  );

  
}



function Drawercomponent(props){

  const classes = useStyles();
  const router = useRouter();
  

const authContext = React.useContext(AuthContext);

useEffect(()=>{
  authContext.checkType()
})

if (authContext.accounttype == true){


  return (
    <div className={classes.drawerroot}>
   <div style={{ display:"flex"  , width:15+"%",margin:"auto",color:CLR_RCARD2}}>
   <img style={{width:100+"%", marginTop:5+"vw"}} src={"/SMOR-192.png"}/>
      <span style={{ marginTop:8+"vw"}}>MOR</span>
   </div>
      

   { authContext.isLoggedIn ?
     <div style={{ display:"flex", flex:1 , flexDirection:"row-reverse" , justifyContent:"center"  }} ></div>: <div style={{ display:"flex", flex:1 , flexDirection:"row-reverse" , minHeight:"15vw" }} ></div>
      }

<div className={classes.drawButt}>

      {authContext.isLoggedIn ?
      <>
      <span className={classes.drawButtinner} style={{paddingRight:50 }} onClick={()=>{ localStorage.removeItem("access_token"); localStorage.removeItem("refresh_token");localStorage.removeItem("userdata") ;authContext.logout() }} >{"logout"}</span>
      <span className={classes.drawButtinner}  onClick={()=>{router.push("/profile")}}>Profile</span> 
      
      </>:
<>
<span className={classes.drawButtinner} style={{paddingRight:50 }} onClick={()=>{ router.push('/login') }} >{"login"}</span>
      <span className={classes.drawButtinner}  onClick={()=>{router.push("/profile")}}></span> 
</>
}

    </div>

  { authContext.isLoggedIn && <>

    <div className={classes.drawButt}>
    <div className={classes.drawButtinner} onClick={()=>{router.push("/wishlist")}}>{"wishlist"}</div>
    </div>

    <div className={classes.drawButt}>
    <div className={classes.drawButtinner} onClick={()=>{router.push("/orders")}}>{"orders"}</div>
    </div>


    <div className={classes.drawButt}>
    <div className={classes.drawButtinner} onClick={()=>{router.push("/address")}}>{"address"}</div>
    </div>

    <div className={classes.drawButt}>
    <div className={classes.drawButtinner} onClick={()=>{router.push("/settings")}}>{"settings"}</div>
    </div >
    </>
      }


    {!authContext.isLoggedIn &&<>
        
    </>
     }
    {/* <div className={classes.drawButt}>
    <div className={classes.drawButtinner} onClick={()=>{router.push("/searchpage")}}>{"searchpage"}</div>
    </div> */}
    </div>
  );
}
else{
  return (
    <div className={classes.drawerroot} >
   <div style={{ display:"flex"  ,marginBlock:"5vh",justifyContent:"center", color:CLR_RCARD2}}>
   <img style={{width:50+"%", marginTop:5+"vw"}} src={"/SMOR-192.png"}/>
      <div style={{ marginTop:8+"vw",textAlign:"bottom"}}>MOR</div>
   </div>
      
     {/* <div style={{ display:"flex", flex:1 , flexDirection:"row-reverse" , justifyContent:"center"  }} >
       
     
      </div> */}

<div className={classes.drawButt}>
      {authContext.isLoggedIn ?
      <>
      <span className={classes.drawButtinner}  onClick={()=>{router.push("/profile")}}>Profile</span> 
      
      </>:
<>
<span className={classes.drawButtinner} style={{paddingRight:50 }} onClick={()=>{ router.push('/login') }} >{"login"}</span>

</>
}

    </div>

{ authContext.isLoggedIn && <>
<div className={classes.drawButt} style={{backgroundColor:CLR_HEAD}}></div>
<>

<div className={classes.drawButt}>
<div className={classes.drawButtinner} onClick={()=>{router.push("/wishlist")}}>{"wishlist"}</div>
</div>

<div className={classes.drawButt}>
<div className={classes.drawButtinner} onClick={()=>{router.push("/orders")}}>{"orders"}</div>
</div>


<div className={classes.drawButt}>
<div className={classes.drawButtinner} onClick={()=>{router.push("/address")}}>{"address"}</div>
</div>

<div className={classes.drawButt}>
<div className={classes.drawButtinner} onClick={()=>{router.push("/settings")}}>{"settings"}</div>
</div >
</>


<div className={classes.drawButt} style={{backgroundColor:CLR_HEAD}}></div>

    
    <div className={classes.drawButt}>
    <div className={classes.drawButtinner} onClick={()=>{router.push("/bookingreqpage")}}>{"Requests"}</div>
    </div>
   
    <div className={classes.drawButt}>
    <div className={classes.drawButtinner} onClick={()=>{router.push("/newItem")}}>{"Post Item"}</div>
    </div>
 { authContext.isLoggedIn && 
    <div className={classes.drawButt}>
    <span className={classes.drawButtinner}  onClick={()=>{ localStorage.removeItem("access_token"); localStorage.removeItem("refresh_token"); localStorage.removeItem("userdata");authContext.logout() }} >{"logout"}</span>
     </div>}
    </>}
    </div>
  );
}



}


function Catdrop(props){
  const classes = useStyles();
  return(
    <>
      <div className={classes.drawButt} ><span >Plumber</span> 
        
      </div>
    </>
  );
}


export function EditFilter(props){

  const[place, setPlace] = React.useState(props.filters.place);
  const[distance, setDistance] = React.useState(props.filters.distance);
  const[price, setPrice] = React.useState(props.filters.price);
  const[pricerange, setPricerange] = React.useState([0,1000]);
  const[tags, setTags] = React.useState(props.filters.tags);
  const[tag, setTag] = React.useState();
  const[categorys, setCategorys] = React.useState(props.filters.category);
  const[category, setCategory] = React.useState(props.filters.category);
  const[location, setLocation] = React.useState();

  const [alltags, setAlltags] = useState(new Set());
  const [allcat, setAllcat] = useState(new Set());

  

  const passdata = () =>{
       
     return ({"place": place , "lat":latestworkobj.lat , "lon": latestworkobj.lon ,  "distance":distance , "tags":tags , "category" :category , "price":price })
  }


  const handleChange = (event, newValue) => {
    setPricerange(newValue);
    setPrice(newValue[0].toString()+"~"+newValue[1].toString());
  };

  const  valuetext = (value) => {
    return `${value}°C`;
  }

  const handleKeyPress =(e) => {

    var key=e.keyCode || e.which;
     if (key==13){
       
       alltags.add(tag)
        
       
       var s = ""
       alltags.forEach( (item) =>  {s = s + "~" + item})
       setTags(s.slice(1))

         
        ;document.getElementById("tags").value = ""
     }
   }

   const handleKeyPressc =(e) => {
    
    var key=e.keyCode || e.which;
     if (key==13){
       
       allcat.add(category)
        
       
       var s = ""
       allcat.forEach( (item) =>  {s = s + "~" + item})
       setCategorys(s.slice(1))

         
        ;document.getElementById("category").value = ""
     }
   }
   const filtertags =   tags.split("~").map( (item) => <Chip label={item} style={{color:CLR_RCARD2 ,backgroundColor:CLR_HEAD }} onClick={()=>{ }}  size="medium"/> )

   const filtercategory =   categorys.split("~").map( (item) => <Chip label={item} style={{color:CLR_RCARD2 ,backgroundColor:CLR_HEAD }}  onClick={()=>{ }}  size="medium"/> )
   
   var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

     const getloc = () => { navigator.geolocation.getCurrentPosition( (pos) => {
    var crd = pos.coords;
  
    //  
    //  
    //  
    //  
    setLocation([crd.latitude,crd.longitude])
     
  } , (e) =>{console.log(e)} , options ) }
   
 
  return (
    
    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
  <Tab eventKey="home" title="Home">
    <>asdasd</>
  </Tab>
  <Tab eventKey="profile" title="Profile">
  <>asddgdsfsdfsdasd</>
  </Tab>
  <Tab eventKey="contact" title="Contact" disabled>
  <>as asd  as d  das ddasd</>
  </Tab>
</Tabs>


  )  



  return (
    <>
     <div style={{textAlign:"center", backgroundColor: "white", borderRadius:5+"px"}}>
      <FormGroup >
        <div style={{margin:2+"vh"}}>
{/* <TextField  id="place" label="place"   onChange={(e)  => {setPlace(e.target.value);storelocal("place",e.target.value) }}  ></TextField> */}
</div>
      <div style={{ fontWeight:"bold" }}>Under <span style={{ fontSize:8+"vw" , color:"blue" }}>{distance}</span> Kms</div>
<Slider style={{width:80+"vw"}} onChange={(e,value) => { setDistance(value)}} min={1} max={50} defaultValue={5} aria-label="Default" valueLabelDisplay="auto"/>

<div style={{ fontWeight:"bold" }}>Under price range INR <span style={{ fontSize:8+"vw" , color:"blue" }}>{pricerange[0]}</span> to <span style={{fontSize:8+"vw" , color:"blue" }}>{pricerange[1]}</span></div>


<Slider
style={{width:80+"vw"}}
        min={50} max={50000}
        getAriaLabel={() => 'Temperature range'}
        value={pricerange}
         onChange={handleChange}
        valueLabelDisplay="auto"
       getAriaValueText={valuetext}

      />

<h5 style={{color:CLR_HEAD }}>tags</h5> <div>{filtertags}</div>
<TextField  id="tags" label="add new tag"    style={{margin:2+"vh" , color:CLR_HEAD}} onChange={(e) => setTag(e.target.value) } onKeyPress={(e)=>{handleKeyPress(e)}}></TextField>

<h5 style={{color:CLR_HEAD }}>categories</h5> <div>{filtercategory}</div>
<TextField  id="category" label="add new category"     style={{margin:2+"vh", color:CLR_HEAD}} onChange={(e) => setCategory(e.target.value) } onKeyPress={(e)=>{handleKeyPressc(e)}}></TextField>
<div>
<button  id="location" label="location"   style={{margin:2+"vh"}} onClick={getloc} >current Location</button>
</div>
</FormGroup >


<button onClick={()=>{ props.onClickgetfilter(passdata()) }} >Save Filters</button>

<button onClick={()=>{ props.closemodal(passdata()) }} >cancel</button>
</div> 
         </>
  )
}


export const NameHead = (props) =>{
  
  const classes = useStyles();
  return(
    <div className={classes.namebar}  >
    <FaArrowLeft  style={{height:"80%",width:10+"%"}} color={CLR_HEAD} onClick={()=>props.onClick()} />
    <div className={classes.labelname}>{props.label}</div>
    <div style={{flex:1,display:"flex",height:"100%", alignItems:"center" , flexDirection:"row-reverse", position:"sticky",top:0,backgroundColor:"white" }} >
    <div size={7+"vw"} style={{margin:3+"vw"}} color={CLR_HEAD} onClick={()=>{props.onHomeClick()}} >
       {props.children}  
     </div>
     </div>
    
</div>

  )
}