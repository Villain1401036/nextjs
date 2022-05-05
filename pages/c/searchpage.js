import Head from 'next/head'
import React , {useContext, useEffect, useState} from 'react'
import ButtonAppBar, { EditFilter } from '../../components/headbar'

import { onRefresh, Shopname, siterooturl, user } from '../../constants'
import { fade, makeStyles  } from '@material-ui/core/styles';
import Profilesummary from '../../components/containers/profilesummary'
import { useRouter } from 'next/router'
import { AuthContext } from '../../context'
import Logincontainer from '../../components/containers/logincontainer'
import { Button } from '@material-ui/core';
import { InputBase } from '@mui/material';
import { display } from '@mui/system';
import { CLR_HEAD, CLR_RCARD1 } from '../../themes';
import Wsocket from '../../Wsocket';
import { FaArrowLeft, FaCross, FaCut, FaFilter, FaRemoveFormat, FaSearch }  from 'react-icons/fa'
import { MdClear }  from 'react-icons/md'
import { getlocal, getobjlocal, storelocal } from '../../localstore';
import { Modal } from 'react-bootstrap';



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
    search: {
        position: 'relative',
        borderRadius: 4+"vw",
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%' ,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
       searchdiv: {
       padding: theme.spacing(0, 2),
       height: '100%',
       
       pointerEvents: 'none',
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center' ,
     },
     inputRoot:{
         backgroundColor:"white",
         flex:1,
         display:"flex",
         flexDirection:"row",
         width:98+"vw",
         margin:1+"vw",
         borderRadius:1+"vw",
         borderColor:CLR_RCARD1,
         borderWidth:1,
         borderStyle:"solid",
         paddingLeft:10


     }
}));






const SearchContainer = (props) => {

  const [placefill , setPlacefill] = useState();
  const [itemfill , setItemfill] = useState();


   
  const [place , setPlace] = useState([]);
  const [item , setItem] = useState([]);

  
  const [wsplace,setWsplace] = useState(new Wsocket(`wss://api.smorentel.com/searchplace`, (e)=>{setPlace(e.split("*"))}));
  const [wsitem,setWsitem] = useState(new Wsocket(`wss://api.smorentel.com/search`, (e)=>{setItem(e.split("*")) }));

  //  const [wsplace,setWsplace] = useState(new Wsocket(`ws://localhost:8082/search`, (e)=>{setPlace(e.split("*"))}));
  // const [wsitem,setWsitem] = useState(new Wsocket(`ws://localhost:8082/search`, (e)=>{setItem(e.split("*")) }));


  const [loaded , setLoaded] = useState(false); 
  
  const [filteropen , setFilteropen] = useState(false);
  
  const [placesearch , setPlacesearch] = useState(false);

  const router = useRouter();
  
  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      }, 2000),
    )  
    await setDefaultTheme({ theme: 'default', darkMode: null })
    navigateAndSimpleReset('Main')
  }

  
  
  useEffect(() => {
    // var searchitems = new Wsocket("wss://127.0.0.1:8000" )
    // searchitems.connect()
    

    if (!loaded ) {

     
      setPlacefill(getlocal("place"))
    // var  ws = new WebSocket("wss://127.0.0.1:8000")
      //setWs( new Wsocket("wss://127.0.01:8000/") )
   //ws.binaryType = 'arraybuffer';
   // ws.onopen = () =>{
   //   ws.send('2 clot');
   // }

  //  ws.onmessage = (msg) =>{
  //    console.log(msg);
  //    var msgstr = Buffer.from(msg.data ).toString()
  //    console.log(
  //     msgstr
  //    );
  //    //setItem(msgstr.split("*"))
  //    //setPlace(msgstr.split("*"))
  //  }


    }
    setLoaded(true)
    storelocal("place","bokaro")
    window.onpopstate = ()=> {
      if(loaded) {
        console.log("fuck me");
        
      }

    }

  })


 
  return (
   
    <div style={{backgroundColor: CLR_HEAD}}>

      <div style={{backgroundColor:CLR_HEAD , flex:1 ,display:"flex", flexDirection:"row",padding:10 }}>

          <div   style={{height:8+"vw" ,width:8+"vw" ,marginRight:4+"vw" }} onClick={()=>{router.replace(router.asPath)}}>
            <FaArrowLeft color='white'  size={8+"vw"}/>
          </div>
           
          <div style={{  alignItems:"center", backgroundColor:"white",width:70+"vw",borderRadius:15+"vw" }}>
            {
              !placesearch ?
               <div onClick={()=>{wsplace.connect() ; setPlacesearch(true) }} style={{flex:1, height:10+"vw" , justifyContent:"center", alignItems:"center",display:"flex",  alignContent:"center",paddingLeft:4+"vw",paddingRight:4+"vw"}}><span style={{ overflow: "hidden", textOverflow:"ellipsis",whiteSpace: "nowrap",color:"black" ,  }}>{placefill}</span></div> 
              :<div style={{ justifyContent:"flex-start", alignItems:"center"}}>
                <InputBase placeholder='Place' style={{ flexDirection:"row",fontSize:20,height:10+"vw" , color:'black' , paddingLeft:10+"vw"}}
                  autoFocus
                 onKeyPress={(e)=>{ console.log(e.key);  if (e.key=='Enter'){

                    console.log("enter");
                    wsplace.close(); setPlacesearch(false);
                    console.log(place);
                 }else{
                 
                 }}}
                  onChange={(e)=>{  wsplace.send(e.target.value);console.log(e.target.value);}} 
                  
                  ></InputBase>
                 
              </div>
            }
            
      
            
          </div>
         
         { !placesearch && <div size={25} name='filter' style={{height:8+"vw" ,width:8+"vw" ,marginLeft:4+"vw" ,color:CLR_RCARD1}} onClick={()=>{setFilteropen(true);}}>
         <FaFilter color='white'  size={8+"vw"}/>
         </div> }

      </div>

       {
         placesearch?
<div style={{flex:1 ,borderTopColor:"white", borderTopWidth:10 , display:"flex", flexDirection:"column",marginTop:10+"px"}}>{place.map((v)=> <SearchResbut value={v} onClick={(e)=>{setPlacefill(e);setPlacesearch(false),storelocal("place",e)}} ></SearchResbut>)}</div>
         :
         <>
         <div style={{backgroundColor:CLR_HEAD,height:2+"vw" }}>
         <div style={{flex:1 ,paddingLeft:2+"vw",paddingRight:2+"vw" ,flexDirection:"row",display:"flex", justifyContent:"flex-start", alignItems:"center", backgroundColor:"white", marginTop:15 ,paddingTop:10,borderTopRightRadius:7+"vw",borderTopLeftRadius:7+"vw"}}>
             {/* <div size={20} name='search' style={{marginRight:23 ,color:CLR_RCARD1}} onClick={()=>{navigation.pop()}}></div> */}
             <div  name='cross' style={{color:CLR_RCARD1,marginLeft:2+"vw",marginRight:2+"vw"}} ><FaSearch color={CLR_HEAD} overlineThickness={1} size={6+"vw"}/></div>
           <InputBase placeholder='Looking for ...' id='iteminput' style={{ borderBottomWidth:1 , borderBottomColor:CLR_RCARD1 , color:'black' ,  flex:1 ,fontSize:5+"vw" , fontWeight:"300"}}  autoFocus onFocus={()=>{wsitem.connect() }} 
           onChange={(e)=>{if (e.target.value.length >= 0) {wsitem.send(e.target.value);setItemfill(e.target.value) ; console.log(e.target.value);}}}
           onKeyPress={(e)=>{ console.log(e.key);  if (e.key=='Enter'){
            wsitem.close();
            console.log("enter");
            console.log(itemfill);
            storelocal( "category",itemfill);router.push(`/c/itemswindow?place=${getlocal("place")}&item=${itemfill}`)
          
         }else{
         
         }}}
           ></InputBase>
           <div  name='cross' style={{color:CLR_RCARD1,marginLeft:2+"vw",marginRight:2+"vw"}}  onClick={()=>{setItem([]);document.getElementById("iteminput").value = ""}} >
           <MdClear color={CLR_HEAD}  size={6+"vw"}/>
           </div>
           
         </div>
         
         <div style={{flex:1 ,borderTopColor:CLR_HEAD, borderTopWidth:10 , display:"flex", flexDirection:"column",overflow:"scroll"}}>{item.map((v)=> <SearchResbut value={v} onClick={(e)=>{ storelocal( "category",e)   ;router.push(`/c/itemswindow?place=${getlocal("place")}&item=${e}`)}}></SearchResbut>)}</div>
       
       </div>
       
       </>
       }
       
<Modal onBackdropClick={()=> console.log("ASDasd") } onHide={()=>{setFilteropen(false)}} style={{zIndex:2000 , flexDirection:"column-reverse",display:"flex"}}  show={filteropen}  children={<EditFilter onClickgetfilter={(data)=>{ setLocation(getlocal("place"))}} closemodal={()=>{setFilteropen(false)}} filters={{"place":"" , "distance":34 ,"price":34 ,"tags":"asd~dfsd" ,"category":"asdasd~dsfsd"}} />} >
       {/* <EditFilter filters={{"place":"bokaro" , "distance":34 ,"price":34 ,"tags":"asd~dfsd" ,"category":"asdasd~dsfsd"}} />
         */}
         </Modal>
    </div>

  )

  
}

function SearchResbut(props){

    return(
        
        <div  onClick={()=>{ console.log(props.value); props.onClick(props.value); }} style={{  height: 10+"vw", width:100+"%", backgroundColor:"white", borderBottomWidth:0 , borderBottomColor:CLR_RCARD1  , padding:20}}>{props.value}</div> 
            
        
    );
}

function FilterComp(props){
  
   const [value, setValue] = useState(50)
  ///filters for distance  , price , 
  return(
  
  <Scrolldiv style={{flex:1,minHeight:800, borderRadius:25+"vw",margin:20 , backgroundColor:"white"}}>
   
      <Slider
      
      style={{width: 400, height: 40}}
      minimumValue={0}
      maximumValue={100}
      
      maximumTrackTintColor="#000000" 

      onValueChange={(v)=>{console.log(v);
      ;setValue(v)}}
      

      />
      
  </Scrolldiv>
  );
}

export default SearchContainer
