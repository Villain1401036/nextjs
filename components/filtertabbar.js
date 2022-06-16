import React, { useEffect, useState } from 'react'
import { Shopname } from '../constants'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { CLR_FBAR, CLR_HEAD, CLR_RCARD1, CLR_RCARD2 } from '../themes';
import router, { useRouter } from 'next/router';
//import MenuIcon from '@material-ui/icons/Menu';

import { MdClear } from 'react-icons/md';
import { Chip, InputBase } from '@material-ui/core';
import e from 'cors';
import { getlocal, storelocal } from '../localstore';
import { Modal, ModalBody, ModalDialog } from 'react-bootstrap';
import Wsocket from '../Wsocket';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position:'sticky'
  }, 
	appbar:{
		// flexGrow: 1,
		// backgroundColor:CLR_RCARD2,
		// /justifyContent:'center',
		top: 10+"vw",
		position:'sticky',
		opacity: 1.0,
		zIndex:60,
		height:window.innerWidth* .15,
		overflowX: 'hidden',
		alignItems:"center",
		//height:5+"vw",
		
		scrollbarWidth:"none",
		
		overflowX: 'scroll',

	
    '@media (min-width:600px)': { // eslint-disable-line no-useless-computed-key
		top: window.innerWidth* .05,
		scrollbarWidth:"thin",
		overflowX: 'hidden',
		height:5+"vw",
		//height:3+"vw",
		
	

    },
    '@media (max-width:360px)': { // eslint-disable-line no-useless-computed-key
		top: 15+"vw",
		scrollbarWidth:"thin",
		overflowX: 'scroll',
		
		//height:10+"vw",

    }
	},
	link:{
		padding:.5+"vw",
		margin:.5+"vw",
		fontWeight: "bold" ,
		fontSize:120+"%",
		
		borderWidth:0,
		borderRadius:1+"vw",
		"&:hover, &:focus": {
			
			backgroundColor:CLR_HEAD,
			color:CLR_RCARD2,
			transition: "backgroundColor "+2+"s"
		  },
		

	},
	ops:{
		alignItems:'center' ,
		display:'flex',
		flexDirection:'row',
		//top: 7+'vw',
		position:'sticky',
		height:100+"%",
		'& > *': {
      margin: theme.spacing(1),
    },
	},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  filterchip:{
	 fontWeight:"600" , borderWidth:"2px" ,height:"60%"
  }
}));

export default function FilterTabbar(props) {

  const classes = useStyles();
  const [sortfilter , setSortfilter] = useState(false);
  const [placefilter , setPlacefilter] = useState(false);
  const [categoryfilter , setCategoryfilter] = useState(false);
  const [datefilter , setDatefilter] = useState(false);
  const [change , setChange ] = useState(false);
//   const makefilters = 

  const onClickfilter = () =>{
    
  }

  useEffect(()=>{
	  
  })

  return (
    <>
		<div className={classes.appbar}>
	             <div className={classes.ops}>
					 		
				 			{getlocal("sortorder") != null?<Chip label={getlocal("sortorder")} variant='outlined' className={classes.filterchip} style={{borderColor:CLR_HEAD  }}  deleteIcon={<MdClear size={30} /> }  onDelete={()=>{ localStorage.removeItem("sortorder") ; setChange(!change) }} onClick={() => { setSortfilter(true) ; } } />:<Chip label="SortBy" variant='outlined' className={classes.filterchip} style={{borderColor:"lightgrey" , fontWeight: "200" }}  deleteIcon={<MdClear size={30} /> } onClick={() => { setSortfilter(true); } } /> }
							
							{getlocal("place") != null ?<Chip label={getlocal("place")} variant='outlined' className={classes.filterchip} style={{borderColor:CLR_HEAD  }}  deleteIcon={<MdClear size={30} /> } onDelete={()=>{ localStorage.removeItem("place") ; setChange(!change) }} onClick={() => { setPlacefilter(true); } } />:<Chip label="Location" variant='outlined' className={classes.filterchip} style={{borderColor:"lightgrey" , fontWeight: "200"  }}  deleteIcon={<MdClear size={30} /> }  onClick={() => { setPlacefilter(true); } } /> }
							
							{getlocal("category") != null ?<Chip label={getlocal("category").split(" > ")[getlocal("category").split(" > ").length - 1 ]} variant='outlined' className={classes.filterchip} style={{borderColor:CLR_HEAD  }}  deleteIcon={<MdClear size={30} /> } onDelete={(event)=>{ event.tar }}  onClick={() => { setCategoryfilter(true); } } />:<Chip label="Category" variant='outlined' className={classes.filterchip} style={{borderColor:"lightgrey",fontWeight: "200"  }}  deleteIcon={<MdClear size={30} /> } onClick={() => { setCategoryfilter(true); } } /> }
							
							{/* {datefilter ?<Chip label="26 - 27" variant='outlined' className={classes.filterchip} style={{borderColor:CLR_HEAD }}  deleteIcon={<MdClear size={30} /> } onDelete={(event)=>{ event.tar }} />:<Chip label="Dates" variant='outlined'  className={classes.filterchip} style={{borderColor:"lightgrey"  }}  deleteIcon={<MdClear size={30} /> } onDelete={(event)=>{ event.tar }} /> } */}
							
							<div className='btn' style={{display:"inline",whiteSpace: "nowrap" , fontWeight:"bold"}} onClick={()=>{ localStorage.removeItem("place"); localStorage.removeItem("category"); setChange(!change) }} >clear filters</div>
							
							
	            	</div>
					
		</div>
		<Modal onBackdropClick={()=> console.log("ASDasd") }  style={{zIndex:20000, display:"flex" , paddingTop:"15vw"   }}  show={(placefilter || categoryfilter || sortfilter)} 
		 onHide={()=>{setPlacefilter(false) ; setCategoryfilter(false)}} >
          
		   
			  {placefilter && <Placemodal closemodal={()=>{setPlacefilter(false)}} onfilterChange={props.onfilterChange} />}
			
			  {categoryfilter && <Categorymodal closemodal={()=>{setCategoryfilter(false)}} onfilterChange={props.onfilterChange} />}

			  {sortfilter && <Sortmodal closemodal={()=>{setSortfilter(false)}} onfilterChange={props.onfilterChange} />}

		</Modal>
		</>
   
  );
}

function Placemodal (props){

	const [place , setPlace] = useState([]);
	
	const [wsplace,setWsplace] = useState(new Wsocket(`wss://api.smorentel.com/searchplace`, (e)=>{setPlace(e.split("*"))}));
    
	return (
		<div style={{ zIndex:"4444" ,  display:"flex"  , flexDirection:"column",  height:window.innerHeight*.8  }}>
                <InputBase placeholder='Place' style={{ fontSize:20, borderBottom:"1px solid black", margin:"2vw" , color:'black' , paddingLeft:10+"vw"}}
                 onFocus={()=>{wsplace.connect();}}
                 onKeyPress={(e)=>{ console.log(e.key);  if (e.key=='Enter'){

                    console.log("enter");
                    wsplace.close(); 
					// setPlacesearch(false);
                    
                    console.log(place);
                 }else{
                 
                 }}}
                  onChange={(e)=>{  wsplace.send(e.target.value);console.log(e.target.value);}} 
                  
                  ></InputBase>
				  

				  <div style={{ height:window.innerHeight*.7 ,overflow:"scroll" }}>
				  {place.map((v)=> <SearchResbut closemodal={props.closemodal} value={v} onClick={(e)=>{storelocal("place",e);props.onfilterChange()}} ></SearchResbut>)}
				  </div>

				  
                 
              </div>
	)

}

function Categorymodal(props){

	
	return (
		<div style={{ zIndex:"4444" ,  display:"flex"  , flexDirection:"column",  height:window.innerHeight*.8  }}>
              <SearchResbut closemodal={props.closemodal} value={"property"} onClick={(e)=>{storelocal("category",e);props.onfilterChange()}} />
              </div>
	)

}

function Sortmodal(props){

	
	return (
		<div style={{ zIndex:"4444" ,  display:"flex"  , flexDirection:"column",  height:window.innerHeight*.8  }}>
              <SearchResbut closemodal={props.closemodal} value={"price increasing"} onClick={(e)=>{storelocal("sortorder",e); props.onfilterChange() }} />
			  <SearchResbut closemodal={props.closemodal} value={"price decreasing"} onClick={(e)=>{storelocal("sortorder",e); props.onfilterChange() }} />
			  <SearchResbut closemodal={props.closemodal} value={"near you"} onClick={(e)=>{storelocal("sortorder",e); props.onfilterChange() }} />
              </div>
	)

}
function SearchResbut(props){

    return(
        
        <div  onClick={()=>{ console.log(props.value); props.onClick(props.value); props.closemodal() }} 
		style={{  height: 10+"vw", width:100+"%", backgroundColor:"white", borderBottomWidth:0 , borderBottomColor:CLR_RCARD1  , padding:20}}
		
		>{props.value}</div> 
            
        
    );
}

function Link(props) {
  const classes = useStyles();
  const router = useRouter(); 
	return (
		<div  className={classes.link} >
		<div  onClick={() => router.push("/")} >
       {props.name}
    </div>
    </div>
	);

}
