
import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { getdata } from '../../networking/getdata';
import { Button, Chip, Slider, TextField } from '@material-ui/core';

import { callwithcache, geturlFormdata, latestworkobj, setValuesfrommap } from '../../constants';
import { Form, FormGroup } from 'react-bootstrap';
import Itemcard from '../itemcard';

import { FaArrowLeft, FaFilter, FaSearch } from 'react-icons/fa';
import { getlocal, storelocal } from '../../localstore';
import { CLR_HEAD } from '../../themes';
import router from 'next/router';
import Footer from '../footer';

const useStyles = makeStyles((theme) => ({


  itemsbucket:{
    width:100+"vw",
    overflowY : "scroll" ,
    // flex:1,
    display:"flex" , 
    flexDirection:"column",
    // gridTemplateColumns: "100vw" ,
    // gridColumnGap:1+"vw" ,
    //  gridRowGap: 1+"vw",
    
    // marginBottom:1+"vw",
    // margin: 1+"vw",
    height:100+"vh",
    
    '@media (min-width:845px)': { // eslint-disable-line no-useless-computed-key
      width:75+"vw",
      overflow:"hidden",
     
      gridTemplateColumns: "18vw 18vw 18vw 18vw" ,
      gridRowGap: 1+"vw",
      gridColumnGap:1+"vw" ,
    },
    '@media (max-width:360px)': { // eslint-disable-line no-useless-computed-key
      
    }
  }
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
        
       loadmore(filter);
       setLoaded(true)
       taskmap.clear()

       }
      //  taskmap.clear()
    });
    



    const changefilter = (f) =>{

       setFilter(f);
      setFilterops(false);
      loadmore(f);
        
      // setFilter({"place": place , "lat": lat , "lon":lon , "distance":distance , "tags":tags , "category" :category , "price":price })
    }

  
   

    const refreshlatest =  (f) =>{
        //call the function to update with the latest tasks

         


        var urlForm = geturlFormdata("item", "get" ,{ "gettype": "cp" ,"tags": f.tags , "category":getlocal("category") , "place" : getlocal("place"), "Xtime":"current" } , {} )
        var url = urlForm.url
         

        callwithcache(getdata, url, "items").then((value) =>{
          setLoaded(true);
           
          setXtime(getXtime(value))
          //taskmap.clear() //for clearing every thing

          setValuesfrommap(value,refreshlatest ,setTasklist , taskmap , "itemId")}).catch((err) =>{
             
          }
          )
          
    }
    const listInnerRef = React.useRef();
    const loadmore =  (f ) =>{
      //call the function to update with the latest tasks

       


      var urlForm = geturlFormdata("item", "get" ,{ "gettype": "cp" ,"tags": f.tags , "category":getlocal("category") , "place" : getlocal("place") , "xtime": xtime} , {} )
      var url = urlForm.url
       

      callwithcache(getdata, url, "items").then((value) =>{
        setLoaded(true);
         
        //taskmap.clear() //for clearing every thing
        console.log(tasklist , taskmap);
        setXtime(getXtime(value))
        setValuesfrommap(value,refreshlatest ,setTasklist , taskmap , "itemId")}).catch((err) =>{
           
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
      //const filllatest =  fill_pairs(tasklist).map( (item) => <div style={{display:"flex"}}><div style={{width:"50vw"}}> <Itemcard key={item[0].itemId}  name={item[0].itemId} itemobj={item[0]} description={item[0].description} place={item[0].place} price={item[0].price} scheduled_at={item[0].scheduled_at} maplink="https://www.google.com/maps?q=23,88" ></Itemcard></div><div style={{width:"50vw"}}>  <Itemcard key={item[1].itemId}  name={item[1].itemId} itemobj={item[1]} description={item[1].description} place={item[1].place} price={item[1].price} scheduled_at={item[1].scheduled_at} maplink="https://www.google.com/maps?q=23,88" ></Itemcard></div></div>   )
      
      const filllatest =  tasklist.map( (item) => <Itemcard key={item.itemId}  name={item.itemId} itemobj={item} description={item.description} place={item.place} price={item.price} scheduled_at={item.scheduled_at} maplink="https://www.google.com/maps?q=23,88" ></Itemcard>  )
      
      const filterplace = <Filterbox name={filter.place}/> 
      const filterdistance = <Filterbox name={filter.distance}/> 
      const filtertags =   filter.tags.split("~").map( (item) => <Filterbox name={item}/> )
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
          if (scrollTop + clientHeight <= scrollHeight  && scrollTop + clientHeight >= scrollHeight  ) {
            // TO SOMETHING HERE
            console.log('Reached bottom')
            console.log(scrollHeight , clientHeight + scrollTop);
            if (xtime == 0 ){
              console.log("no more entries");
            }else{
              loadmore(filter)
            }
            
          }
        }
      };

	return(
		<div   style={{top:13+"vw" ,position:"static",backgroundColor:'white' ,  justifyContent:"center" ,height:100+"vh" }} >
                
                
              { filterops && <div style={{width:100+"vw", minHeight:20+"vw", overflowX:"scroll" }}>

                 <EditFilter  filters={filter}  onClickgetfilter={async(f) => { changefilter(f);console.log(filter)}} /> 
                  
              </div> }
             
              <div style={{padding:2+"vw" , display:"flex" ,flexDirection:"row", position:"sticky",top:0 , height:15+"vw" , backgroundColor:"white"}}>
              <div style={{ width: 32 , height:100+"%",margin:5}} onClick={()=>{router.back()}}><FaArrowLeft color={CLR_HEAD}  size={8+"vw"}/></div> 
                <span><span style={{fontWeight:"bold"}}>{getlocal("category")}</span> in <span style={{fontWeight:"bold"}} >{getlocal("place")}</span></span> 
              
              <div style={{ height:10+"vw" , display:"flex" ,flexDirection:"row-reverse" ,flex:1 }}>
              <div style={{ width: 32 , height:100+"%",margin:5}} ><FaFilter color={CLR_HEAD}  size={8+"vw"}/></div> 
                <div style={{ width: 32 , height:100+"%",margin:5}} onClick={()=>{router.push('/c/searchpage')}}><FaSearch color={CLR_HEAD}  size={8+"vw"}/></div> 
                
                </div>
               </div>
               {/* <Button onClick={()=>{ gobottom()}} >bottom</Button> */}
             { tasklist.length > 0 ?
                 <div ref={listInnerRef} className={classes.itemsbucket} id="itemswin" onScroll={() => {onScroll();}} >  {filllatest} {xtime == 0 && <Footer /> }</div> :<div style={{position:"fixed",bottom:0}}><Footer /></div>}

              {/* <Button onClick={()=>{ loadmore(filter)}} >Load more</Button> */}
             
              
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
   const filtertags =   tags.split("~").map( (item) => <Chip label={item}  onClick={()=>{ }}  size="small"/> )

   const filtercategory =   categorys.split("~").map( (item) => <Chip label={item}  onClick={()=>{ }}  size="small"/> )
   
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
