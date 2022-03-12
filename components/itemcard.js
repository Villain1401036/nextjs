//task card for a new task that has been posted
import { Button, Card, CardMedia ,divField } from '@material-ui/core';
import { Bookmark, BookmarkBorder,Favorite , FavoriteBorder, BookmarkBorderSharp, divFormat } from '@material-ui/icons';
import { useRouter } from 'next/dist/client/router';
import router from 'next/router';
import React from 'react';
import { convertToJson, pushitem, s3rooturl } from '../constants';
import { bidtask, postdata } from '../networking/postdata';
import { makeStyles } from '@material-ui/core/styles';

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
    minHeight:30+"vw",
   maxHeight:50+"vw" , 
    objectFit:"cover" ,
     backgroundColor: "lightgrey",
     '@media (min-width:845px)': { // eslint-disable-line no-useless-computed-key
      minHeight:10+"vw",
   maxHeight:20+"vw" , 
     
      
     
    },
   }
}));

export default function Itemcard(props){

const classes = useStyles();

  const [isloaded,setIsLoaded] = React.useState(true);
  const [save,setSave] = React.useState(false);
 const router = useRouter();
const bidhandler = () =>{

  console.log("post request for opening a bid");
  open(props.maplink)

}

const addtofav = () =>{
  //code to save the itemid somewhere in the cloud and in the app
console.log("ADDED TO FAV");
}

const removefromfav = () =>{
  //code to save the itemid somewhere in the cloud and in the app
  console.log("REMOVED FROM FAV");
}
	return(
		
            <Card variant='outlined'  style={{ width:48+"vw"}} >
                {/*<div name="name">{props.name}</div>*/}
                <CardMedia
        component="img"
        className={classes.imgcard}
        image={s3rooturl + convertToJson(props.itemobj.metadata).images[0]}
        alt="green iguana"
        onClick={() => {console.log(props.itemobj); pushitem(props.itemobj); router.push("/itempage") }}
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
                
                

            </Card>

        
	);



}

