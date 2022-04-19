import Head from 'next/head'
import React , {useContext, useEffect, useState} from 'react'
import ButtonAppBar from '../../components/headbar'

import { onRefresh, Shopname, user } from '../../constants'
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
import { FaArrowLeft }  from 'react-icons/fa'


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



   
  const [place , setPlace] = useState([]);
  const [item , setItem] = useState([]);
  
  const [wsplace,setWsplace] = useState(new Wsocket("ws://localhost:8082/search", (e)=>{setPlace(e.split("*"))}));
  const [wsitem,setWsitem] = useState(new Wsocket("ws://localhost:8082/search", (e)=>{setItem(e.split("*"))}));


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
    // var searchitems = new Wsocket("ws://127.0.0.1:8000" )
    // searchitems.connect()
    
    if (!loaded ) {
    // var  ws = new WebSocket("ws://127.0.0.1:8000")
      //setWs( new Wsocket("ws://127.0.01:8000/") )
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

  })

 
  return (
   
    <div style={{backgroundColor: CLR_HEAD,padding:10,}}>

      <div style={{backgroundColor:CLR_HEAD , flex:1 ,display:"flex", flexDirection:"row" }}>

          <div   style={{height:8+"vw" ,width:8+"vw" ,marginRight:4+"vw" }} onClick={()=>{router.back()}}>
            <FaArrowLeft color='white'  size={8+"vw"}/>
          </div>
           
          <div style={{  alignItems:"center", backgroundColor:"white",width:70+"vw",borderRadius:15+"vw" }}>
            {
              !placesearch ?
               <div onClick={()=>{wsplace.connect() ; setPlacesearch(true) }} style={{flex:1, height:10+"vw" , justifyContent:"center", alignItems:"center", alignContent:"center"}}><><span style={{ fontSize:25, color:"black"}}>{place}</span></></div> 
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
         
         { !placesearch && <div size={25} name='filter' style={{ height:40,color:CLR_RCARD1}} onClick={()=>{setFilteropen(true); Keyboard.dismiss() ;}}></div> }

      </div>

       {
         placesearch?
<div style={{flex:1 ,borderTopColor:CLR_HEAD, borderTopWidth:10 , display:"flex", flexDirection:"column"}}>{place.map((v)=> <SearchResbut value={v} ></SearchResbut>)}</div>
         :
         <>
         <div style={{backgroundColor:CLR_HEAD,height:2+"vw" }}>
         <div style={{flex:1 ,paddingLeft:30,paddingRight:30 ,flexDirection:"row", justifyContent:"flex-start", alignItems:"center", backgroundColor:"white", marginTop:15 ,paddingTop:10,borderTopRightRadius:7+"vw",borderTopLeftRadius:7+"vw"}}
       
         >
             <div size={20} name='search' style={{marginRight:23 ,color:CLR_RCARD1}} onClick={()=>{navigation.pop()}}></div>

           <InputBase placeholder='Looking for ...'   style={{ borderBottomWidth:1 , borderBottomColor:CLR_RCARD1 , color:'black' ,  flex:1 ,fontSize:25 , fontWeight:"300"}}  autoFocus onFocus={()=>{wsitem.connect() }} onChange={(e)=>{if (e.target.value.length > 2) {wsitem.send(e.target.value);   console.log(e.target.value);
           }}}></InputBase>
           <div size={20} name='cross' style={{color:CLR_RCARD1}} ></div>
           
         </div>
         
         <div style={{flex:1 ,borderTopColor:CLR_HEAD, borderTopWidth:10 , display:"flex", flexDirection:"column",overflow:"scroll"}}>{item.map((v)=> <SearchResbut value={v} ></SearchResbut>)}</div>
       
       </div>
       
       </>
       }

    </div>

  )

  
}

function SearchResbut(props){

    return(
        
        <div  onClick={()=>{ console.log(props.value) }} style={{  height: 20+"vw", width:100+"%", backgroundColor:"white", borderBottomWidth:.5 , borderBottomColor:CLR_RCARD1  , marginTop:10}}>{props.value}</div> 
            
        
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
