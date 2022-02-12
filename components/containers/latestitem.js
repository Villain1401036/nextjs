
import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { getdata } from '../../networking/getdata';
import { Button, Chip, Slider, TextField } from '@material-ui/core';
import Taskcard from '../taskcard';
import { ArrowDropDown, ArrowDropUp, DockRounded, Filter, Fireplace, MapSharp, Refresh } from '@material-ui/icons';
import { callwithcache, geturlFormdata, latestworkobj, setValuesfrommap } from '../../constants';
import { CLR_RCARD, CLR_RCARD1 } from '../../themes';
import { Form, FormGroup } from 'react-bootstrap';
import Itemcard from '../itemcard';


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

//this will be a container for all the recent work that is going on

export default function Latestitem(props){

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
       console.log(filter);
       refreshlatest(filter);
       //setLoaded(true)

       }
    });
    



    const changefilter = (f) =>{

       setFilter(f);
      setFilterops(false);
      refreshlatest(f);
        
      // setFilter({"place": place , "lat": lat , "lon":lon , "distance":distance , "tags":tags , "category" :category , "price":price })
    }

  
   

    const refreshlatest =  (f) =>{ 
        //call the function to update with the latest tasks

        console.log(f);
        var urlForm = geturlFormdata("item", "get" ,{ "gettype": "t" ,"tags": f.tags , "category":f.category , "place" : f.place } , {} )
        var url = urlForm.url
        console.log(url);

        callwithcache(getdata, url, "items").then((value) =>{
          setLoaded(true);
          console.log(value);
          setValuesfrommap(value,refreshlatest ,setTasklist , taskmap , "itemId")}).catch((err) =>{
            console.log(err);
          }
          )
          
    }


      const filllatest =  tasklist.map( (item) =>  <Itemcard key={item.taskId}  name={item.itemId} itemobj={item} description={item.description} place={item.place} price={item.price} scheduled_at={item.scheduled_at} maplink="https://www.google.com/maps?q=23,88" ></Itemcard>  )
      
      const filterplace = <Filterbox name={filter.place}/> 
      const filterdistance = <Filterbox name={filter.distance}/> 
      const filtertags =   filter.tags.split("~").map( (item) => <Filterbox name={item}/> )
      const filtercategory = <Filterbox name={filter.category}/> 
      const filterprice = <Filterbox name={filter.price}/>
      
     
      
      
      

	return(
		<div style={{top:13+"vw" ,position:"static",backgroundColor:CLR_RCARD1 }} >
                
                <div style={{    display:"flex" , flexDirection: "row"  }}>

                <Button onClick={async()=>{refreshlatest(filter)}} title="latesttask" style={{alignItems:"center"}} >
               <div >LATEST ITEMS</div>
               <Refresh  />
             </Button>

             <div style={{display:"flex"  }}></div>
          <div style={{display:"flex" ,flex:1, flexDirection: "row-reverse"  }}>
          
             <Button onClick={()=>{ setHidden(!hidden) }} title="latesttask"  > 
               
               { !hidden ?<ArrowDropDown  />:<ArrowDropUp/> }
             </Button>

             <div style={{minWidth:20+"vw",height:100+"%",textAlign:"center",alignItems:"center"}} >
             <div  style={{margin:"auto"}} onClick={()=>{ setFilterops(true) ; console.log("filter") }} >change filters</div>

             </div>
             </div>
             </div>

              { filterops && <div style={{width:100+"vw", minHeight:20+"vw", overflowX:"scroll", minHeight:20+"vw" }}>



                 <EditFilter  filters={filter}  onClickgetfilter={async(f) => { changefilter(f);console.log(filter)}} /> 
                  
              </div> }

             <div style={{width:100+"vw", overflowX:"scroll", minHeight:2+"vw" , display:"flex"}}>
                 
             <div style={{   display:"flex",flexDirection:"row"}}>
               <div >place:</div>
                 {filterplace}
                 </div>

                  <div>tags:</div>
                  {filtertags}
                  <div>category:</div>
                  {filtercategory}
                  <div>price:</div>
                  {filterprice}
                  <div>distance:</div>
                  {filterdistance}

                  
             </div>

             { !hidden ?<div style={{overflowY : "scroll" , display:"grid" , gridTemplateColumns: "auto auto" , gridColumnGap:0+"vw" , gridRowGap: .5+"vw"}} >{filllatest}
             </div>:<></>}
             
             </div>
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
      console.log("passdata");
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
       console.log(alltags);
       
       var s = ""
       alltags.forEach( (item) =>  {s = s + "~" + item})
       setTags(s.slice(1))

        console.log("asdaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        ;document.getElementById("tags").value = ""
     }
   }

   const handleKeyPressc =(e) => {
    
    var key=e.keyCode || e.which;
     if (key==13){
       
       allcat.add(category)
       console.log(allcat);
       
       var s = ""
       allcat.forEach( (item) =>  {s = s + "~" + item})
       setCategorys(s.slice(1))

        console.log("asdaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        ;document.getElementById("category").value = ""
     }
   }
   const filtertags =   tags.split("~").map( (item) => <Chip label={item}  onClick={()=>{console.log(item);}}  size="small"/> )

   const filtercategory =   categorys.split("~").map( (item) => <Chip label={item}  onClick={()=>{console.log(item);}}  size="small"/> )
   
   var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

     const getloc = () => { navigator.geolocation.getCurrentPosition( (pos) => {
    var crd = pos.coords;
  
    // console.log('Your current position is:');
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);
    setLocation([crd.latitude,crd.longitude])
    console.log(location);
  } , (e) =>{console.log(e)} , options ) }
   
 
  return (
    <>

      <FormGroup style={{textAlign:"center"}}>
        <div style={{margin:2+"vh"}}>
<TextField  id="place" label="place"   onChange={(e)  => setPlace(e.target.value) }  ></TextField>
</div>
      <div style={{ fontWeight:"bold" }}>Under <span style={{ fontSize:8+"vw" , color:"blue" }}>{distance}</span> Kms</div>
<Slider style={{width:80+"vw"}} onChange={(e,value) => {console.log(value);setDistance(value)}} min={1} max={50} defaultValue={5} aria-label="Default" valueLabelDisplay="auto"/>

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
