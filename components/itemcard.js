//task card for a new task that has been posted
import { Button, Card, CardMedia ,divField } from '@material-ui/core';
import { Bookmark, BookmarkBorder,Favorite , FavoriteBorder, BookmarkBorderSharp, divFormat } from '@material-ui/icons';
import { useRouter } from 'next/dist/client/router';
import router from 'next/router';
import React, { memo } from 'react';
import { convertToJson, geturlFormdata, pushitem, s3rooturl } from '../constants';
import { bidtask, postdata } from '../networking/postdata';
import { makeStyles } from '@material-ui/core/styles';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Image from 'next/image'
import { getobjlocal } from '../localstore';


const useStyles = makeStyles((theme) => ({

  image:{
    overflowY : "scroll" ,
    display:"grid" , 
    gridTemplateColumns: "auto auto" ,
    gridColumnGap:0+"vw" ,
    gridRowGap: .5+"vw",
    margin:"auto",
    
    '@media (min-width:845px)': { // eslint-disable-line no-useless-computed-key
      width:50+"vw",
      overflow:"hidden",
      gridTemplateColumns: "auto auto auto" ,
      gridRowGap: 1+"vw",
      gridColumnGap:1+"vw" ,
    },
    '@media (max-width:360px)': { // eslint-disable-line no-useless-computed-key
      
    }
  }

  ,
  imgcard:{ 
    height:30+"vw",
    width:30+"vw",
    padding:2+"vw",
    objectFit:"cover" ,
     backgroundColor: "white",
  

     '@media (min-width:845px)': { // eslint-disable-line no-useless-computed-key
      minHeight:10+"vw",
   maxHeight:20+"vw" , 
     
    },

    wallimg:{
      height:50+"vh",
      width:78
    }
    
   }
}));

 function Itemcard(props){

const classes = useStyles();

  const [isloaded,setIsLoaded] = React.useState(true);
  const [save,setSave] = React.useState(props.fav);
 const router = useRouter();

//  console.log( props.itemobj.itemKey ,props.fav);
 React.useEffect (()=>{


   if (!isloaded){
      setSave(props.fav)
    setIsLoaded(true)
   }
 
});

const bidhandler = () =>{

   
  open(props.maplink)

}

const addtofav = async () =>{
  //code to save the itemid somewhere in the cloud and in the app
   
  var urlForm = geturlFormdata('wishlist','update',{"updatetype":"wishlist_add","customer_key":getobjlocal("userdata")[0]["userkey"]},{"item_key":props.itemobj.itemKey } )
 
  var formData = new FormData()
  formData.append("item_key",props.itemobj.itemKey )
  var data = await postdata(urlForm.url , "item" , formData , {} ).then(
    ()=>{
      console.log("added to fav");
    }
  )


}

const removefromfav = async () =>{
  //code to save the itemid somewhere in the cloud and in the app
  var urlForm = geturlFormdata('wishlist','update',{"updatetype":"wishlist_remove","customer_key":getobjlocal("userdata")[0]["userkey"]},{"item_key":props.itemobj.itemKey } )
 
  var formData = new FormData()
  formData.append("item_key",props.itemobj.itemKey )
  var data = await postdata(urlForm.url , "item" , formData , {} ).then(
    ()=>{
      console.log("added to fav");
    }
  )
}

const heightimage = () =>{
  // console.log(window.innerWidth);
    if ( window.innerWidth < 600){
      return window.innerWidth/2
    }else{
      return window.innerWidth/6
    }
 }

 const widthtimage = () =>{
  // console.log(window.innerWidth);
  if ( window.innerWidth < 600){
    return window.innerWidth/2 
  }else{
    return window.innerWidth/4
  }
 }

	return(
		
            <div >
                {/*<div name="name">{props.name}</div>*/}
           <div style={{zIndex:0,borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey" ,borderTop:"1px solid lightgrey" }}>
                <Image 
              className={{zIndex:0 }}
        height={heightimage()}
        width={widthtimage()}
        objectFit='cover'
        
         src={ s3rooturl +"/images-prod-a" + convertToJson(props.itemobj.metadata).images[0].split(".")[0] + "x400"+".webp" }
        
         onError={({ currentTarget }) => {
          //  console.log(currentTarget);
          currentTarget.onerror = null; // prevents looping
          currentTarget.srcset="/images/no-image.png"
          // currentTarget.alt="no image"
          
        }}


        onClick={() => { pushitem(props.itemobj);console.log(props.itemobj)
           ;
           router.push(`/itempage`)
           
           }}    
      /></div>
        <div style={{ padding:1+"vw" , borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey" , borderBottom:"1px solid lightgrey"}}>
        <span style={{ flex:1 }}>{props.name}</span>
        <div name="price"style={{flex:1,flexDirection:"row",display:"flex"}}>
          <span><span style={{ flex:1 }}>price: </span><span style={{ flex:1,fontWeight:"bold",color:"red" }}>{props.price}</span></span>
          
          <span style={{flex:1,flexDirection:"row-reverse",flexDirection:"row",display:"flex"}}>
          <span style={{flex:1,display:"flex"}}></span>
          { !props.hidefavbutton &&
          <span style={{}}>
          {
            !save?<FaRegHeart size={20} color='grey' onClick={()=>{
              
              addtofav()
              setSave(!save)
            }}/>:<Favorite color='error' fontSize="medium" onClick={()=>{
              
              removefromfav()
              setSave(!save)
            }}/>
          }</span>
        }
         
          </span>

          </div>
         
          
                <div name="description" style={{}}>{props.description}</div>
                
                 <div name="distance">{props.distance}</div>


                <span name="discount"style={{ fontWeight:"bold",fontStyle:"italic" ,color:"green" }}>{"upto 50% cashback"}</span>
                
                </div>
                { props.hidefavbutton && <div style={{backgroundColor:"grey", textAlign:"center" }} onClick={()=>removefromfav()}><div className='btn' > remove from Favorites</div></div>}
                
                
             
            </div>

        
	);

	return(
		
    <div variant='outlined'  style={{ width:100+"vw",display:"flex",borderBottom:"1px solid lightgrey" }} >
        {/*<div name="name">{props.name}</div>*/}
        <CardMedia
component="img"
className={classes.imgcard}
image={s3rooturl + convertToJson(props.itemobj.metadata).images[0].split(".")[0] + "x400"+".webp"}
alt="green iguana"
onClick={() => { pushitem(props.itemobj);console.log(props.itemobj)
   ;router.push("/itempage") }}
/>
<div style={{ margin:1+"vw"}}>

<div name="price"style={{flex:1,flexDirection:"row"}}>
  <span style={{ flex:1 }}>price: </span><span style={{ flex:1,fontWeight:"bold",color:"red" }}>{props.price}</span>
  
  <span style={{flex:1,flexDirection:"row-reverse"}}>
  <span style={{}}>
  {
    !save?<FavoriteBorder fontSize="large" onClick={()=>{
      
      addtofav()
      setSave(!save)
    }}/>:<Favorite color='error' fontSize="large" onClick={()=>{
      
      removefromfav()
      setSave(!save)
    }}/>
  }</span>
  </span>

  </div>
 
  
        <div name="description" style={{}}>{props.description}</div>
        
         <div name="distance">{props.distance}</div>

        <span name="discount"style={{ fontWeight:"bold",fontStyle:"italic" ,color:"green" }}>{"upto 50% cashback"}</span>
        </div>
        
        

    </div>


);


}




export default Itemcard
