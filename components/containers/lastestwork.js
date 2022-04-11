import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { getdata } from '../../networking/getdata';
import { Button, Chip, Icon, Slider, TextField } from '@material-ui/core';
import Taskcard from '../taskcard';
import { ArrowDropDown, ArrowDropUp, HomeOutlined, MapSharp, Refresh } from '@material-ui/icons';
import { callwithcache, convertToJson, geturlFormdata, latestworkobj, setValuesfrommap } from '../../constants';
import { CLR_RCARD, CLR_RCARD1 } from '../../themes';
import { Form, FormGroup } from 'react-bootstrap';
import { BinaryWriter } from 'google-protobuf';
import { BinaryReader } from 'google-protobuf';
import { handleEnterKeyPress } from '../../utils';


const taskmap = new Map();
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
}));//this will be a container for all the recent work that is going on

export default function Latestwork(props){

    const [loaded,setLoaded] = React.useState(false); 
    
    const [tasklist,setTasklist] = React.useState([]);
    const classes = useStyles();
    const [hidden, setHidden] = React.useState();

    const [filter, setFilter] = React.useState(latestworkobj);
    //const filter = {"place": "" , "lat": "" , "lon":"" , "distance":"" , "tags":"" , "category" :"" , "price":"" }
    const [filterops, setFilterops] = React.useState(false);

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
       if (!loaded){
          
       refreshlatest(filter);
       setLoaded(true)
       //setVal(opentasklist);
        
       }
    });
    
     
    
     
      
     



    const changefilter = f =>{

       setFilter(f);
      setFilterops(false);
      refreshlatest(f);
        
      // setFilter({"place": place , "lat": lat , "lon":lon , "distance":distance , "tags":tags , "category" :category , "price":price })
    }
   

    const refreshlatest =  (f) =>{ 
        //call the function to update with the latest tasks
        var urlForm
       if (props.type == "customer" ){
          urlForm = geturlFormdata("task" , "get" , {"customerid":64 } ,{}   ) //localStorage.getItem("customerid") }  )
        } 
        else{
          urlForm = geturlFormdata("task" , "get" , { "lat":f.lat , "lon":f.lon ,"distance":f.distance  , "place":f.place , "category":f.category , "tags":f.tags  , "price" : f.price} ,{}   ) 
        }
       
        var url = urlForm.url
         
        callwithcache(getdata, url, "tasks").then((value) =>{
          taskmap.clear()
          setLoaded(true);
           
          setValuesfrommap(value,refreshlatest ,setTasklist , taskmap , "taskId" )}).catch((err) =>{
             
          }
          )
  
    }


      const filllatest =  tasklist.map( (item) =>  <Taskcard key={item.taskId}  image={convertToJson(item.metadata).images[0]} description={item.description} place={item.place} price={item.price} scheduled_at={item.scheduled_at} maplink={item.location} taskobj={item} ></Taskcard>  )
      
      const filterplace = <Filterbox name={filter.place}/> 
      const filterdistance = <Filterbox name={filter.distance}/> 
      const filtertags =   filter.tags.split("~").map( (item) => <Chip label={item}  onClick={()=>{ }}  size="small"/> )
      const filtercategory = <Filterbox name={filter.category}/> 
      const filterprice = <Filterbox name={filter.price}/>
      
     
      
      
      

	return(
		<div style={{top:13+"vw" ,position:"static",backgroundColor:"white " }} >
                
                <div style={{    display:"flex" , flexDirection: "row"  }}>

                <Button onClick={async()=>{refreshlatest(filter)}} title="latesttask" style={{alignItems:"center"}} >
               <div >LATEST TASKS</div>
               <Refresh  />
             </Button>

             <div style={{display:"flex"  }}></div>
          <div style={{display:"flex" ,flex:1, flexDirection: "row-reverse"  }}>
          
             <Button onClick={()=>{ setHidden(!hidden) }} title="latesttask"  >
               
               { !hidden ?<ArrowDropDown  />:<ArrowDropUp/> }
             </Button>

             <div style={{minWidth:20+"vw",height:100+"%",textAlign:"center",alignItems:"center"}} >
             <Button  style={{margin:"auto", backgroundColor:"white"}} onClick={()=>{ setFilterops(!filterops) ; console.log("filter") }} >change filters</Button>

             </div>
             </div>
             </div>

              { filterops && <div style={{width:100+"vw", minHeight:20+"vw", overflowX:"scroll", minHeight:20+"vw" }}>



                 <EditFilter  filters={filter}  onClickgetfilter={async(f) => { changefilter(f);console.log(filter)}} /> 
                  
              </div> }
{/* 
             <div style={{width:100+"vw",  minHeight:2+"vw" , display:"flex", flexWrap:"wrap"}}>
                 
           
                 <Filtershow label="place" data={filterplace}/>
                  <Filtershow label="tags" data={filtertags}/>
                  <Filtershow label="category" data={filtercategory}/>
                  <Filtershow label="price" data={filterprice}/>
                  <Filtershow label="distance" data={filterdistance}/>

      

                  
             </div> */}

             { !hidden ?<div style={{overflowY : "scroll" , display:"grid",	gridTemplateColumns:"auto auto", }} >{filllatest}
             </div>:<></>}
             
             </div>
	);

}

function Filtershow(props){
  return(
    <>
    <div style={{marginRight:2+"vw"}}>
               <span >{props.label}:</span>
                 {props.data}
                 </div>
    </>
  )
}
function Filterbox(props){
  return(
    <>
    
    <Chip label={props.name}  size="small"/>
    {/* <div style={{ borderStyle:"solid" , borderRadius:1+"vw", borderWidth:.5+"vw" , padding:1+"vw", fontSize:80+"%" , borderColor:"lightgrey" , marginLeft:1+"vw" }}>{props.name}</div> */}
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



   const filtertags =   tags.split("~").map( (item) => <Chip label={item}  onClick={()=>{ }}  size="small"/> )

   const filtercategory =   categorys.split("~").map( (item) => <Chip label={item}  onClick={()=>{ }}  size="small"/> )
   
   var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

     const getloc = () => { navigator.geolocation.getCurrentPosition( (pos) => {
    var crd = pos.coords;
  
    setLocation([crd.latitude,crd.longitude])
     
  } , (e) =>{console.log(e)} , options ) }
   
 
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


      />

<h5>tags</h5> <div>{filtertags}</div>
<TextField  id="tags" label="add new tag"    style={{margin:2+"vh"}} onChange={(e) => setTag(e.target.value) } onKeyPress={(e)=>{handleEnterKeyPress(e,setTags,alltags,tag,"tags")}}></TextField>

<h5>categories</h5> <div>{filtercategory}</div>
<TextField  id="category" label="add new category"     style={{margin:2+"vh"}} onChange={(e) => setCategory(e.target.value) } onKeyPress={(e)=>{handleEnterKeyPress(e,setCategorys,allcat,category,"category")}}></TextField>
<div>
<button  id="location" label="location"   style={{margin:2+"vh"}} onClick={getloc} >current Location</button>
</div>
</FormGroup >

<button onClick={()=>{ props.onClickgetfilter(passdata()) }} >Save Filters</button>
         </>
  )
}