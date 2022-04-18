import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { CLR_HEAD, CLR_RCARD1, CLR_RCARD2, CLR_RCARD3 } from '../../themes';
import { useRouter } from 'next/router';
import { Button, Carousel, CarouselItem, Stack } from 'react-bootstrap';




//import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position:'sticky'
  }, 
	appbar:{
		flexGrow: 1,
		backgroundColor:CLR_HEAD,
		justifyContent:'center',
		top: 10+"vw",
		
		opacity: 1.0,
		zIndex:5,
		overflowX: 'hidden',
		//height:5+"vw",
		maxWidth:100+"vw",
		
		

	
    '@media (min-width:845px)': { // eslint-disable-line no-useless-computed-key
		top: 5+"vw",
		scrollbarWidth:"thin",
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
      marginTop:"2vw"
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

  return (
    
		<div className={classes.appbar}>
	             
                 <Carousel style={{width:100+"%"}}   indicators={false}  >
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

                 </Carousel>
             
                 <SeeCat onClick={()=>{ }}/>

                
	            	</div>
		
   
  );
}



