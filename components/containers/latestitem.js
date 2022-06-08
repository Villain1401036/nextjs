
import React, { useEffect, useState } from 'react'

import Autowhatever from "react-autowhatever";

import { makeStyles } from '@material-ui/core/styles';
import { getdata, getdata_post } from '../../networking/getdata';
import { Button, Chip, InputBase, Slider, TextField } from '@material-ui/core';

import { callwithcache, convertToJson, geturlFormdata, latestworkobj, setValuesfrommap } from '../../constants';
import { Col, Form, FormGroup, Modal, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import Itemcard from '../itemcard';

import { FaArrowLeft, FaFilter, FaSearch } from 'react-icons/fa';
import { getlocal, getobjlocal, storelocal } from '../../localstore';
import { CLR_HEAD, CLR_RCARD1, CLR_RCARD2 } from '../../themes';
import router from 'next/router';
import Footer from '../footer';
import { MdClear } from 'react-icons/md';
import { sortlist, sortmap } from '../../utils';
import FilterTabbar from '../filtertabbar';
import Wsocket from '../../Wsocket';
import { getuserdata } from '../../utils/signinUtils';




const useStyles = makeStyles((theme) => ({
  appbar:{ display:"flex" ,flexDirection:"row", position:"sticky",top:0 , 
  height:window.innerWidth*.15 , backgroundColor:"white", alignItems:"center",
  zIndex:2900,  flex:1,
  '@media (min-width:600px)': { // eslint-disable-line no-useless-computed-key
    height:window.innerWidth*.05
  },
  '@media (min-width:800px)': { // eslint-disable-line no-useless-computed-key
    // height:window.innerWidth*.05
  },
  '@media (max-width:360px)': { // eslint-disable-line no-useless-computed-key
    
  }}
  ,
  itemsbucket:{
    zIndex:0,
    height:window.innerHeight - window.innerWidth*(.15 + .15),
    
    // height:window.outerHeight - window.outerWidth*.15,
    // marginTop:window.innerHeight*.15,
    width:100+"vw",
    overflowY : "scroll" ,
    
    // flex:1,
    display:"grid" , 
    gridTemplateColumns: "50vw 50vw" ,
      // gridRowGap: 1+"vw",
      // gridColumnGap:1+"vw" ,
    // gridTemplateColumns: "100vw" ,
    // gridColumnGap:1+"vw" ,
    //  gridRowGap: 1+"vw",
    
    // marginBottom:1+"vw",
    // margin: 1+"vw",
    '@media (min-width:600px)': { // eslint-disable-line no-useless-computed-key
      

      // overflow:"scroll",
      height:window.innerHeight - window.innerWidth*(.05+.05),
    
    },
    
    '@media (min-width:800px)': { // eslint-disable-line no-useless-computed-key
      
      // overflow:"scroll",
      // height:window.innerHeight - window.innerWidth*(.1+.05),
      
      
      "*":{
        "-ms-overflow-style": "none"
    },
      "::-webkit-scrollbar": {
        display: "none"
    },
    justifyContent:"center",
    display:"grid",
      gridTemplateColumns: "20vw 20vw 20vw 20vw" ,
      gridRowGap: 1+"vw",
      gridColumnGap:1+"vw" ,
      
    },
    '@media (max-width:360px)': { // eslint-disable-line no-useless-computed-key
      
    }
  },
  poplist:{
    top:window.innerWidth*.16 ,
    '@media (min-width:600px)': { // eslint-disable-line no-useless-computed-key
      top:window.innerWidth*.05 ,
    }
  }
}));

const taskmap = new Map();

//this will be a container for all the recent work that is going on

export default function Latestitem(props){

    const [loaded,setLoaded] = React.useState(false); 
    
    
  const [filteropen , setFilteropen] = useState(false);
  

    const [tasklist,setTasklist] = React.useState([]);
    const classes = useStyles();
    const [hidden, setHidden] = React.useState();

    const [filter, setFilter] = React.useState(latestworkobj);
    //const filter = {"place": "" , "lat": "" , "lon":"" , "distance":"" , "tags":"" , "category" :"" , "price":"" }
    const [filterops, setFilterops] = React.useState(false);

      const [xtime , setXtime] = useState(999999999999);
   //parameters to be passed in to get things filtered  
    // var place = filter.place
    // var lat = filter.lat
    // var lon = filter.lon
    // var distance = filter.distance
    // var tags = filter.tags
    // var category = filter.category
    // var price = filter.price
    


    // before call the request check if there is some filters or not in the 
       useEffect (()=>{
      //   const handleRouteChange = () => {
      //     console.log("router event");
      //     setTasklist([])
          
      // }
      // router.events.on('routeChangeStart', handleRouteChange)
     
       if (!loaded){
        // console.log(getlocal("userdata"));
        // console.log(getlocal("access_token"));
        // console.log(getlocal("refresh_token"));
         if(getlocal("userdata") != undefined){
          //  console.log(getlocal("userdata"));
          //  console.log(getlocal("access_token"));
          //  console.log(getlocal("refresh_token"));
           getuserdata("email",getobjlocal("userdata")[0]["email"])
       }else{
        console.log("no user LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
       }
        
        loadmore(filter);
       setLoaded(true)
       taskmap.clear()

       }

       window.onpopstate = ()=> {
       
          // console.log("fuck me 2 times");
        //   router.push()
        
      
        }
     
    });
    

   

    const changefilter = (f) =>{

       setFilter(f);
      setFilterops(false);
      loadmore(f,true);
        
      // setFilter({"place": place , "lat": lat , "lon":lon , "distance":distance , "tags":tags , "category" :category , "price":price })
    }

  
    const parseFilter = (allfilters) =>{
        
    }
    
    const listInnerRef = React.useRef();

    const loadmore =  (f , applyfill ) =>{
      //call the function to update with the latest tasks
   /// sorts - price ++ , price -- , 
      var urlForm = geturlFormdata("item", "getform" ,{ "gettype": "cp" ,"tags": f.tags , "category":( getlocal("category") != null ? getlocal("category").split(",")[0] : "clothes" ) , "place" : ( getlocal("place") != null ? getlocal("place").split(",")[0] : "jharkhand" ) , "xtime": xtime} , {} )
      var url = urlForm.url + (getlocal("sortorder") != null ? `&sortby=${sortmap[getlocal("sortorder")]}`:"")
       //var url = `http://127.0.0.1:8082/item/getform?place=bokaro&xtime=${xtime}&item=${getlocal("category")}`

       var formdata = makeformdata(navsdataclothes)
      formdata.append("category|array|&&", getlocal("category") )

      if ( applyfill != undefined ){
        console.log(")))))))))))))))))))))))))))))))))))))))))))))))))))))))))))");
        formdata.set("created_at|bigint|<",xtime)
        // formdata.set("price")
      }
      
      

      callwithcache(getdata_post, url, "items",formdata).then((value) =>{
        // setLoaded(true);
         
        //taskmap.clear() //for clearing every thing
        console.log(xtime,tasklist , taskmap);
        setXtime(getXtime(value))
        setValuesfrommap(value,loadmore ,setTasklist , taskmap , "itemId")}).catch((err) =>{
           console.log(err);
        }
        )
        
  }

  const getXtime = (list) =>{

    var xtimes = 999999999999
    if (list.length == 0){
      return 0
    }
    list.forEach(element => {
      if  ( element['createdAt'] < xtimes){
          xtimes = element['createdAt']
      } 
    
    });
    return xtimes

  }
  

      const fill_pairs = (list) =>{
         
         var reslist = []
        var tl = Math.floor(list.length/2) 
        for (var i = 0 ; i< tl ;i++ ){

            reslist.push([list[i*2],list[i*2+1]])

        }
        if (list.length%2 != 0){
          reslist.push([list[list.length -1 ],list[list.length -1 ]])
        }
        
        return reslist
      }
      
      
      // const filllatest =  fill_pairs(tasklist).map( (item) => <div key={item[0].itemId} style={{display:"flex"}}><div style={{width:"50vw"}}> <Itemcard key={item[0].itemId}  name={item[0].itemId} itemobj={item[0]} description={item[0].description} place={item[0].place} price={item[0].price} scheduled_at={item[0].scheduled_at} maplink="https://www.google.com/maps?q=23,88" ></Itemcard></div><div style={{width:"50vw"}}>  <Itemcard key={item[1].itemId}  name={item[1].itemId} itemobj={item[1]} description={item[1].description} place={item[1].place} price={item[1].price} scheduled_at={item[1].scheduled_at} maplink="https://www.google.com/maps?q=23,88" ></Itemcard></div></div>   )
   
  const [wsitem,setWsitem] = useState(new Wsocket(`wss://api.smorentel.com/search`, (e)=>{if(e !== ""){setItem(e.split("*")) }else{ setItem([]) }  }));
      
      const wishdata = (getlocal("userdata") != null ? convertToJson(getobjlocal("userdata")[0]["metadata"] )["wishdata"]: [] )
      console.log(wishdata);
     
      

      const filllatest =  tasklist.map( (item) => <Itemcard key={item.itemId} fav={(wishdata.includes(item.itemKey))} name={item.itemId} itemobj={item} description={item.description} place={item.place} price={item.price} scheduled_at={item.scheduled_at} maplink="https://www.google.com/maps?q=23,88" ></Itemcard> )
      

      const [item , setItem] = useState([]);
      const [itemfill , setItemfill] = useState();

      const filterplace = <Filterbox name={filter.place}/> 
      const filterdistance = <Filterbox name={filter.distance}/> 
      const filtertags =   filter.tags.split("~").map( (item) => <Filterbox key={item} name={item}/> )
      const filtercategory = <Filterbox name={filter.category}/> 
      const filterprice = <Filterbox name={filter.price}/>
      
     
      const gobottom = () =>{
        console.log("bottom up");
        var myDiv = document.getElementById("itemswin");
          myDiv.scrollTop = myDiv.scrollHeight;
          console.log(myDiv.scrollHeight,myDiv.scrollTop);
      }
      
      const onScroll = () => {
        
        if (listInnerRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
          // console.log(scrollHeight , clientHeight + scrollTop);
          // console.log(scrollHeight , clientHeight + scrollTop);
          if (scrollTop + clientHeight +1  > scrollHeight   ) {
            // TO SOMETHING HERE
            console.log('Reached bottom')
            console.log(scrollHeight , clientHeight + scrollTop);
            if (xtime == 0 ){
              console.log("no more entries");
            }else{
              loadmore(filter,true)
            }
            
          }
        }
      };
    

      var tagsarr = ["body","reply","skin","compare"]
      var colorarr = ["red", "green" , "blue" , "yellow"]
      // tagsarr = "body~reply"
      const gettags = (arr) =>{
        console.log(typeof(arr));
        var arrl = []
        
        if( typeof(arr) == "string" ){
            arrl = arr.split("~")
        }else {
          arrl = arr
        }



        var  resarr = []
        for (var i=0 ; i < arrl.length ; i++){
           resarr.push({"label":arrl[i] , selected:false})
        }
        return resarr
      }


      const [navsdataclothes , setNavsdataclothes] = useState({
        "price":{ type:"chip" , data:[{"label":"123", selected:false },{"label":"200", selected:false }] , datatype:"integer" , operation:"<",ismeta:false},
        "distance":{ type:"check" , data:[{"label":"20", selected:false },{"label":"200", selected:false }] , datatype:"integer" , operation:"<",ismeta:false },
        
        "tags":{ type:"chip" , data:gettags(tagsarr) , datatype:"array" , operation:"&&",ismeta:false},
        "color":{type:"chip" , data:gettags(colorarr) , datatype:"in-array" , operation:"??", ismeta:true }
              });

      // const ndc = { 
      //   "price":{ type:"chip" , data:[{"label":"123123", selected:false },{"label":"12313", selected:false }] , datatype:"integer" , operation:"<",ismeta:true},
      //   "distance":{ type:"check" , data:[{"label":"433", selected:false },{"label":"4334", selected:false }] ,datatype:"array"},
      //   "tags":{ type:"chip" , data:[{"label":"full", selected:false },{"label":"half", selected:false }] , datatype:"array"},
    
      //         }


        const settFilterObject = (filters ) =>{
          
                const applyfilter = {}
                const filterslist =  Object.keys(filters)
                
                for (let j = 0; j < filterslist.length; j++) {
              
                  var arr = filters[filterslist[j]]["data"]
                  
              
                  for (let index = 0; index < arr.length; index++) {
              
                  if (arr[index]["selected"]){
                      if ( filterslist[j] in  applyfilter ){
                        applyfilter[filterslist[j]].push(arr[index]["label"])
                      }else{
                        applyfilter[filterslist[j]] = [arr[index]["label"]]
                      }
                      
                  }
                }
                  
                } 
              
                console.log(applyfilter);

                
                return applyfilter
              
              }

    const reload = () =>{
      document.getElementById('iteminput').blur() ;
      taskmap.clear() 
      
      // wsitem.close();
      document.getElementById('iteminput').blur()
      document.getElementById('iteminput').value = ''
      setItem([])
      if(tasklist.length > 0 ){
       listInnerRef.current.scrollTop = 0
      }
      
      loadmore(filter);
      router.push(`/itemswindow?place=${getlocal("place")}&item=${getlocal('category')}`)
    }
            
         
	return(
    <>
		<div style={{backgroundColor:'white' ,  justifyContent:"center"  }} onScroll={ ()=>{ }}   >
                
              
              <div className={classes.appbar}>
              
              <FaArrowLeft color={CLR_HEAD}  style={{  height:50+"%" ,marginInline:4+"%"}} onClick={()=>{router.back()}}/>
               
              {/* <span><span style={{fontWeight:"bold"}}>{getlocal("category")}</span> in <span style={{fontWeight:"bold"}} >{getlocal("place")}</span></span>  */}
              <img src='/images/SMOR-192.png' style={{ height:80+"%" ,objectFit:"cover"}} onClick={()=> {router.push('/home')}}></img>
              
          <div style={{flex:1,display:"flex" , flexDirection:"column" , justifyContent:"flex-start" , height:"100%"}}>
         <div style={{flex:1 , minWidth:50+"vw" ,marginInline:"2vw" ,backgroundColor:"lightgrey",flexDirection:"row",display:"flex", justifyContent:"flex-start", alignItems:"center",  marginBlock:5+"%" ,borderRadius:7+"vw"}}>
            
             <div  name='search' style={{color:CLR_RCARD1,marginLeft:2+"vw",marginRight:2+"vw"}} ><FaSearch color={CLR_HEAD}  /></div>

           <InputBase placeholder='Looking for ...' id='iteminput'  
           style={{ borderBottomWidth:1 , borderBottomColor:CLR_RCARD1 , color:'black' ,  flex:1 }}  
          //  autoFocus 
           onFocus={()=>{wsitem.connect() }} 
           onChange={(e)=>{if (e.target.value.length >= 0) {wsitem.send(e.target.value);setItemfill(e.target.value) ; console.log(e.target.value);}}}
           onKeyPress={(e)=>{ console.log(e.key);  if (e.key=='Enter'){
            wsitem.close();
            console.log("enter");
            console.log(itemfill);
            storelocal( "category",itemfill) ;
            document.getElementById('iteminput').blur()
            router.push(`/itemswindow?place=${getlocal("place")}&item=${itemfill}`)
          
         }else{
         
         }}}
           ></InputBase>
          {item.length > 0 ? <div className={classes.poplist} style={{ position:"absolute",  width:50+"vw" , borderRadius:2+"vw" , backgroundColor:"lightgrey" ,border:"1px solid lightgrey",  display:"flex", flexDirection:"column",overflow:"scroll"}}>
            {item.map((v)=> 
            <SearchResbut value={v} 
            onClick={(e)=>{ storelocal( "category",e)  ;
             document.getElementById('iteminput').blur() ;
             taskmap.clear() 
             
             wsitem.close();
             document.getElementById('iteminput').blur()
             document.getElementById('iteminput').value = ''
             setItem([])
             if(tasklist.length > 0 ){
              listInnerRef.current.scrollTop = 0
             }
             
             loadmore(filter);
             router.push(`/itemswindow?place=${getlocal("place")}&item=${getlocal('category')}`)
            }
            }
             ></SearchResbut>)
             }</div>:<></>}
       
           </div>
           
           
           </div>

              <div style={{ height:100+"%" ,  display:"flex" , flex:1 , flexDirection:"row-reverse", alignItems:"center"}}>
           
              
                  <FaFilter color={CLR_HEAD} style={{  height:50+"%" ,width:50+"%" , marginInline:2+"vw" }} onClick={()=>setFilteropen(true)}/>
               
                  {/* <FaSearch color={CLR_HEAD}  style={{  height:50+"%" ,width:50+"%"}} onClick={()=>{router.push('/searchpage')}}/> */}

                
              </div>

               </div>

               
               <FilterTabbar onfilterChange={()=>{ console.log("asdhaosidj;askd'");reload()  }} />
              
             { tasklist.length > 0 ?
                 <div ref={listInnerRef} className={classes.itemsbucket}  id="itemswin" onScroll={() => {onScroll()}} >  {filllatest} {xtime == 0 && <></> }</div> :<div style={{position:"fixed",bottom:0}}></div>}
      
                
             

        </div>
             <Modal onHide={()=>{setFilteropen(false)}} style={{zIndex:5000 , flexDirection:"column-reverse",display:"flex" }}  show={filteropen}  
             
             children={
             
             <EditFilter onClickgetfilter={(data)=>{setNavsdataclothes(data);settFilterObject(data) }} closemodal={()=>{setFilteropen(false)}} 
             filters={{"place":"" , "distance":34 ,"price":34 ,"tags":"asd~dfsd" ,"category":"asdasd~dsfsd"}}
              navsdata={navsdataclothes}  onFilterapply={()=>{ taskmap.clear() ;setXtime(999999999999) ; loadmore(filter) ;setFilteropen(false) }}/> } 
                    
                    />
       

             </>
	);


}


export function Headerbar(props){

  const [loaded,setLoaded] = React.useState(false); 
  

  const classes = useStyles();
  

     useEffect (()=>{
   
     if (!loaded){
   
       if(getlocal("userdata") != undefined){
     
         getuserdata("email",getobjlocal("userdata")[0]["email"])
     }else{
      console.log("no user LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
     }
      
  
     setLoaded(true)
 

     }

     window.onpopstate = ()=> {
  
    
      }
   
  });

    
  
const [wsitem,setWsitem] = useState(new Wsocket(`wss://api.smorentel.com/search`, (e)=>{if(e !== ""){setItem(e.split("*")) }else{ setItem([]) }  }));
    
    const wishdata = (getlocal("userdata") != null ? convertToJson(getobjlocal("userdata")[0]["metadata"] )["wishdata"]: [] )
    console.log(wishdata);
   

    const [item , setItem] = useState([]);
    const [itemfill , setItemfill] = useState();
  
return(
  <>
  
              
            
            <div className={classes.appbar}>
            
            <FaArrowLeft color={CLR_HEAD}  style={{  height:50+"%" ,marginInline:4+"%"}} onClick={()=>{router.back()}}/>
             
            {/* <span><span style={{fontWeight:"bold"}}>{getlocal("category")}</span> in <span style={{fontWeight:"bold"}} >{getlocal("place")}</span></span>  */}
            <img src='/images/SMOR-192.png' style={{ height:80+"%" ,objectFit:"cover"}} onClick={()=> {router.push('/home')}}></img>
            
        <div style={{flex:1,display:"flex" , flexDirection:"column" , justifyContent:"flex-start" , height:"100%"}}>
       <div style={{flex:1 , minWidth:50+"vw" ,marginInline:"2vw" ,backgroundColor:"lightgrey",flexDirection:"row",display:"flex", justifyContent:"flex-start", alignItems:"center",  marginBlock:5+"%" ,borderRadius:7+"vw"}}>
          
           <div  name='search' style={{color:CLR_RCARD1,marginLeft:2+"vw",marginRight:2+"vw"}} ><FaSearch color={CLR_HEAD}  /></div>

         <InputBase placeholder='Looking for ...' id='iteminput'  
         style={{ borderBottomWidth:1 , borderBottomColor:CLR_RCARD1 , color:'black' ,  flex:1 }}  
        //  autoFocus 
         onFocus={()=>{wsitem.connect() }} 
         onChange={(e)=>{if (e.target.value.length >= 0) {wsitem.send(e.target.value);setItemfill(e.target.value) ; console.log(e.target.value);}}}
         onKeyPress={(e)=>{ console.log(e.key);  if (e.key=='Enter'){
          wsitem.close();
          console.log("enter");
          console.log(itemfill);
          storelocal( "category",itemfill) ;
          document.getElementById('iteminput').blur()
          router.push(`/itemswindow?place=${getlocal("place")}&item=${itemfill}`)
        
       }else{
       
       }}}
         ></InputBase>
        {item.length > 0 ? <div className={classes.poplist} style={{ position:"absolute",  width:50+"vw" , borderRadius:2+"vw" , backgroundColor:"lightgrey" ,border:"1px solid lightgrey",  display:"flex", flexDirection:"column",overflow:"scroll"}}>
          {item.map((v)=> 
          <SearchResbut value={v} 
          onClick={(e)=>{ storelocal( "category",e)  ;
           document.getElementById('iteminput').blur() ;
           taskmap.clear() 
           
           wsitem.close();
           document.getElementById('iteminput').blur()
           document.getElementById('iteminput').value = ''
           setItem([])
         
           router.push(`/itemswindow?place=${getlocal("place")}&item=${getlocal('category')}`)
          }
          }
           ></SearchResbut>)
           }</div>:<></>}
     
         </div>
         
         
         </div>

            <div style={{ height:100+"%" ,  display:"flex" , flex:1 , flexDirection:"row-reverse", alignItems:"center"}}>
     
            </div>

             </div>

           </>
);


}

function Filterbox(props){
  return(
    <>
    
    <div style={{ borderStyle:"solid" , borderRadius:1+"vw", borderWidth:.5+"vw" , padding:1+"vw", fontSize:80+"%" , borderColor:"lightgrey" , marginLeft:1+"vw" }}>{props.name}</div>
    </>
  )
}


function EditFilter(props){

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
   const filtertags =   tags.split("~").map( (item) => <Chip label={item} key={item}  onClick={()=>{ }}  size="small"/> )

   const filtercategory =   categorys.split("~").map( (item) => <Chip label={item} key={item} onClick={()=>{ }}  size="small"/> )
   
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
   
  

 
  // var navsdata = { 
  //           "price":{ type:"chip" , data:[{"label":"123123", selected:false },{"label":"12313", selected:true }]},
  //           "distance":{ type:"check" , data:[{"label":"433", selected:false },{"label":"4334", selected:true }]},

  //                 }
 
  
  
  
  var navs =  Object.keys(props.navsdata)

  const Navbuttons = navs.map(item => <Navbutt key={item} eventKey={item} name={item} /> )
  
/////used to make a new filter page for approfriate filter
  const spawnFilter = (filtertype) => {
    var  navsdata = props.navsdata
 if ( navsdata[filtertype].type == "check"){
   const makecheckfilters = navsdata[filtertype]["data"].map(item => <Checkbox label={item.label} key={filtertype+item.label} isSelected={item.selected} filter={filtertype} onChange={(filter,label,val)=>{console.log(filter,label,val);  props.onClickgetfilter( changeFilterObject(props.navsdata,filter,label,val))  }} />)
   return makecheckfilters
 }
 else if(navsdata[filtertype].type == "chip"){
   const makechipfilters = navsdata[filtertype]["data"].map(item => <SelectChip label={item.label} key={filtertype+item.label} isSelected={item.selected} filter={ filtertype} onselect={(filter,label,val)=>{console.log(filter,label,val); props.onClickgetfilter( changeFilterObject(props.navsdata,filter,label,val)) }} />)
   return makechipfilters
 }
   
  }

////used to change the filters and return new state
const changeFilterObject = (filters , filter, label , value) =>{

  var arr = filters[filter]["data"]
  var idx = 0;
  for (let index = 0; index < arr.length; index++) {
    console.log(arr[index]["label"],label);
    if (arr[index]["label"] == label){
        idx = index
    }
  }
  var resfil = filters
  resfil[filter]["data"][idx]["selected"] = value
  console.log(filters);

  
  return filters

}




  const makefilters = navs.map( item => 
     {if(item  == "price"){
      return ( <Tab.Pane key={item} eventKey={item}>
      <div style={{margin:2+"vw"}}>{item}</div>
      <>{spawnFilter(item)}</>
     </Tab.Pane>)
    }else{
      return ( <Tab.Pane key={item} eventKey={item}>
        <div style={{margin:2+"vw"}}>{item}</div>
        <>{spawnFilter(item)}</>
       </Tab.Pane>)
    }
  }
  )





  return (
    <>
     <div style={{height:8+"vh" ,borderBottom:"1px solid lightgrey" ,display:"flex",alignItems:"center" ,paddingInline:5+"%"}}>
      <div style={{fontWeight:"bolder"}}>Filters</div>
      <div style={{display:"flex" , flexDirection:"row-reverse",flex:1,alignItems:"center",height:100+"%"}}>
         <MdClear color={CLR_HEAD} style={{height:80+"%",width:"10%"}} onClick={()=>{ props.closemodal() }}/>
        </div>
     </div>
    <>
    <Tab.Container id="left-tabs-example" defaultActiveKey="price"  >
    <div style={{flexDirection:"row",display:"flex" ,height:window.innerHeight*.8 ,width:100+"%"}}>
     
        <Nav variant="tabs" className="flex-column" style={{backgroundColor:CLR_HEAD ,borderRadius:0 , width:50+"%", color:CLR_RCARD1 ,height:window.innerHeight*.8}}   >
            {Navbuttons}
        </Nav>
     
      
        <Tab.Content style={{ height:window.innerHeight*.8 ,  width:50+"vw" ,  overflowY:"scroll"}} >
          {makefilters}
        </Tab.Content> 
      
    </div>
   
  </Tab.Container>
  </>
  <div style={{height:10+"vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
     <div className='btn'>100+ items</div>
     <div className='btn'  style={{backgroundColor:CLR_HEAD , color:CLR_RCARD2 , marginRight:4+"vw"}} >Clear filters</div>
     <div className='btn'  style={{backgroundColor:CLR_HEAD , color:CLR_RCARD2 }} onClick={props.onFilterapply} >Apply</div>
  </div>
         
  </>
  )

  return (
    <>

      <FormGroup style={{textAlign:"center"}}>
        <div style={{margin:2+"vh"}}>
<TextField  id="place" label="place"   onChange={(e)  => setPlace(e.target.value) }  ></TextField>
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

<h5>tags</h5> <div>{filtertags}</div>
<TextField  id="tags" label="add new tag"    style={{margin:2+"vh"}} onChange={(e) => setTag(e.target.value) } onKeyPress={(e)=>{handleKeyPress(e)}}></TextField>

<h5>categories</h5> <div>{filtercategory}</div>
<TextField  id="category" label="add new category"     style={{margin:2+"vh"}} onChange={(e) => setCategory(e.target.value) } onKeyPress={(e)=>{handleKeyPressc(e)}}></TextField>
<div>
<button  id="location" label="location"   style={{margin:2+"vh"}} onClick={getloc} >current Location</button>
</div>
</FormGroup >


<button onClick={()=>{ props.onClickgetfilter(passdata()) }} >Save Filters</button>
         </>
  )


}


function Navbutt(props) {

   return(
    <Nav.Item  >
    <Nav.Link style={{borderRadius:0 , width:100+"%"  }}  eventKey={props.eventKey}>{props.name}</Nav.Link>
  </Nav.Item>
   )
}





function Checkbox(props){
   const [selected, setSelected ]= useState(props.isSelected); 

  const onChange = (val) =>{
      
  }

  return (
    <Form>
     <Form.Check 
     key={props.filter+props.label}
        defaultChecked={selected}
        type={"checkbox"}
        id={props.filter+props.label}
        label={`${props.label}`}
        onClick={()=>{console.log(!selected);setSelected(!selected); props.onChange( props.filter , props.label , !selected)  }}
      />
  </Form>
  )
}


function SelectChip(props){

  const [select, setSelect] = useState(props.isSelected);
   return(
     <>{
       !select?
      <Chip label={props.label} variant="outlined"  component="a" id={props.filter+props.label}  key={props.filter+props.label} onClick={()=> {setSelect(!select);props.onselect(props.filter,props.label,!select) }} style={{margin:1+"vw"}} />:
      <Chip label={props.label} component="a"   id={props.filter+props.label} key={props.filter+props.label} onClick={()=> {setSelect(!select);props.onselect(props.filter,props.label,!select) }} style={{margin:1+"vw",backgroundColor:CLR_HEAD ,color:CLR_RCARD2}} />
     }</>
     );
}


function makearrstr (arr){
    
    var s = ""
    arr.map(item => s = s+"~"+item)

    return s.slice(1)
    
}

function makeformdata(filters){
  const applyfilter = {}
  const filterslist =  Object.keys(filters)

  var formdata = new FormData();

  for (let j = 0; j < filterslist.length; j++) {

    var arr = filters[filterslist[j]]["data"]
    
    var s = ""
    for (let index = 0; index < arr.length; index++) {
   
    
    if (arr[index]["selected"]){

          s = s +"~"+ arr[index]["label"]
          
    }
  }

  var  key =  `${filterslist[j]}|${filters[filterslist[j]]["datatype"]}|${filters[filterslist[j]]["operation"]}`
  console.log(key,s.slice(1));
  if (filters[filterslist[j]]["ismeta"]){
    key = 'metadata>'+ key
  }

  if (s.length > 0 ){
    formdata.append(key, s.slice(1) )
  }
 
  }

  var io =  formdata.keys()
  var iov = formdata.values()
  // console.log(io.next() );//("price|integer|< ")
  
  var now = io.next() 
  var nowv = iov.next()

  while (now.value != undefined) {
    console.log(now , nowv )
    now = io.next()
    nowv = iov.next()
  }

  formdata.append("created_at|bigint|<", 999999999999)
  return formdata
}


function SearchResbut(props){

  return(
      
      <div  onClick={()=>{ console.log(props.value); props.onClick(props.value); }} style={{ borderBottom:"1px solid lightgrey" , width:100+"%", backgroundColor:"white", padding:20}}>{props.value}</div> 
          
  );
}
