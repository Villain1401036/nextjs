
import { Button, makeStyles } from '@material-ui/core';
import React from 'react'
import ButtonAppBar from '../../components/headbar';
import { CLR_FBAR, CLR_HEAD, CLR_RCARD1, CLR_RCARD2 } from '../../themes';




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
          
          height:100+'%',
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
      appbar:{
          
          backgroundColor:"white",
  
          top: 12+"vw",
          position:'sticky',
          
      
      
      
  
      },
      container:{
          minHeight:100+"vh",
          backgroundColor:CLR_FBAR,
          
      },
      nbuttonroot:
     
      {
        display:"flex",
        backgroundColor:CLR_HEAD,
        color:CLR_RCARD2 ,
         margin:2+"vw" ,
         height:10+"vw",
         
         borderRadius:2+"vw",
         borderColor:CLR_RCARD2,
         borderStyle:"solid",
         borderWidth:1+"px",
         
         justifyContent:"center",
         alignItems: "center",
        
        }
  }));


export default function SettingsPage(props){

  const classes = useStyles();
  const [isloaded,setIsLoaded] = React.useState(true);
  React.useEffect(()=>{
    if(!isloaded){
      console.log("isloaded called");
      
      setIsLoaded(true);
    }
  
    
  })  
	return(
		<div className={classes.container}>

      
  
		  <ButtonAppBar />
         
        <div style={{marginTop:0+"vw",padding:2+"vw"}}>

        <h1 style={{color:CLR_RCARD2, margin:5+"vw" ,position:"sticky",top:0}}>Settings</h1>
      <NavButton onClick={()=>{ }}/>

      </div>
		</div>
	);

}

function NavButton(props){
    const classes = useStyles();
    return(
        <div className={classes.nbuttonroot} onClick={props.onClick}> <a >Profile</a> </div> 
    )
}
