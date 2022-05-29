import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { CLR_HEAD, CLR_RCARD1, CLR_RCARD2, CLR_RCARD3 } from '../../themes';
import { useRouter } from 'next/router';
import { Button, Carousel, CarouselItem, Stack } from 'react-bootstrap';
import { Chip } from '@material-ui/core';
import { ArrowDownward, ArrowDropDown, ArrowDropDownCircle, ArrowForward, Search } from '@material-ui/icons';
import { getlocal, storelocal } from '../../localstore';
import { getallCategories } from '../../utils';



//import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position:'sticky'
  }, 
	appbar:{
    flex:1,
    flexDirection:"column",
    display:"flex",
	  flexGrow:1,
		backgroundColor:CLR_HEAD,
		justifyContent:'center',
		top: 10+"vw",
	
		zIndex:5,
		overflowX: 'hidden',
		//height:5+"vw",
		maxWidth:100+"vw",

		
		

	
    '@media (min-width:845px)': { // eslint-disable-line no-useless-computed-key
		top: 5+"vw",
		scrollbarWidth:"thin",
    // height:0
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
		padding:1+"vw",
		margin:1+"vw",
		
		fontSize:100+"%",
		paddingRight:10,
		borderWidth:0,
		borderRadius:1+"vw",
		"&:hover, &:focus": {
			backgroundColor:CLR_HEAD,
			color:CLR_RCARD1
		  },
		

	},
	ops:{
		alignItems:'center' ,
		display:'flex',
		flexDirection:'row',
		//top: 7+'vw',
		position:'sticky',
		justifyContent:"center",
		'& > *': {
      margin: theme.spacing(1),
    },
	},
  menuButton: {
    marginRight: theme.spacing(2),
  },
page:{
    
    
    backgroundColor:CLR_RCARD3,
    '@media (min-width:845px)': { // eslint-disable-line no-useless-computed-key
		
       height:0,
		   hidden:true,

    },
    '@media (max-width:360px)': { // eslint-disable-line no-useless-computed-key
		
       
		//height:10+"vw",

    }

},

  title: {
    flexGrow: 1,
  },

  prevsearchroot:{
      padding:2+"vw",
      marginTop:"2vw",
      flex:1,
      flexDirection:"column",
      display:"flex",
  }
  ,

    hexagon :{
        top: 30+"vh",
        left: 40+"%",
  
        margin: "0 auto",
        backgroundColor: CLR_RCARD2,
        
        width: 85.6+"px",
        height: 100+"px",
      
  }
,


}));

export default function BannerComponent(props) {
  const classes = useStyles();


  const hidebc = ()=>{

    if(window.innerWidth > 600){
        return true
    }

  }

  return (
    
		<div className={classes.appbar}>
	             
                 <Carousel style={{width:100+"%"}}  hidden={hidebc()}  indicators={false}  >
                 <CarouselItem >
                 <div className={classes.page}>
                     <img src={'/freebessimagelight.png'} style={{ width:100+"%" ,objectFit:"cover"}} />
                 </div>
                 </CarouselItem>  

                 <CarouselItem >
                 <div className={classes.page}>
                     <img src={'/freebessimagelight.png'} style={{ width:100+"%" ,objectFit:"cover"}} />
                 </div>
                 </CarouselItem>  
{/* <CarouselItem >
<div className={classes.page}> <img src={'/freebeesappimg_11zon.jpg'} style={{ width:100+"%" , objectFit:"cover"}} />
                 </div>
</CarouselItem>  
<CarouselItem >
<div className={classes.page}> <img src={'/freebeesappimg_11zon.jpg'} style={{ width:100+"%" , objectFit:"cover"}} />
                 </div>

</CarouselItem>  
<CarouselItem >
<div className={classes.page}> <img src={'/freebeesappimg_11zon.jpg'} style={{ width:100+"%" , objectFit:"cover"}} />
                 </div>

</CarouselItem>   */}
                 </Carousel>
                 {/* <PrevSearches /> */}
                 <SeeCat onClick={()=>{ }}/>

                
	            	</div>
		
   
  );
}

function Page(props) {
  const classes = useStyles();
  const router = useRouter(); 
	return (
		<div  className={classes.page} >
		<div  onClick={() => router.push("/")} >
       {props.name}
    </div>
    </div>
	);

}


function PrevSearches(props){
    const classes = useStyles();
    const router = useRouter(); 
      return (
          <div className={classes.prevsearchroot}  >
            <div style={{ marginBottom: 2+"vw" , borderRadius: 2+ "vw" , borderColor:CLR_RCARD2 ,  backgroundColor:CLR_HEAD , color:CLR_RCARD2  }}>Your Previous Searches</div>

              <Button style={{padding:1+"vw" ,borderRadius: 1+ "vw" , borderColor:CLR_RCARD2 ,  backgroundColor:CLR_HEAD , color:CLR_RCARD2  }} >Clothes in bokaro <ArrowForward fontSize={"small"} /></Button> 
              <Button style={{padding:1+"vw" ,borderRadius: 1+ "vw" , borderColor:CLR_RCARD2 ,  backgroundColor:CLR_HEAD , color:CLR_RCARD2  }} >Clothes in bokaro <ArrowForward fontSize={"small"} /></Button> 
              <Button style={{padding:1+"vw" ,borderRadius: 1+ "vw" , borderColor:CLR_RCARD2 ,  backgroundColor:CLR_HEAD , color:CLR_RCARD2  }} >Clothes in bokaro <ArrowForward fontSize={"small"} /></Button> 
         
      
      </div>
      );
}

function SeeCat(props){
    const classes = useStyles();
    const router = useRouter(); 


     const listcats = getallCategories()
     const categories = listcats.map((item) => <Chip key={item} label={item}  variant="outlined" style={{color:CLR_RCARD2, padding:2+"vw", margin:.5+"vw" , borderColor:CLR_RCARD2}}  onClick={()=>{   storelocal( "category",item)  ; router.push("/c/itemswindow?items="+item) }} /> )
      return (
          <div className={classes.prevsearchroot}  >

              
            <div style={{ marginBottom: 2+"vw" ,  borderRadius: 2+ "vw" , borderColor:CLR_RCARD2 ,  backgroundColor:CLR_HEAD , color:CLR_RCARD2  }}>You are looking for ... <Search onClick={props.onClick} /></div>
            <div style={{minHeight:10+"vh"}}>{categories}</div>
            
                  
           
      </div>
      );
}
