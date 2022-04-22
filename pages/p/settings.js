
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
          backgroundColor:"white",
          
      },
      nbuttonroot:
     
      {
        display:"flex",
        backgroundColor:"white",
        color:CLR_HEAD ,
         margin:2+"vw" ,
         height:10+"vw",
         
         borderRadius:2+"vw",
         borderColor:CLR_HEAD,
         borderStyle:"solid",
         borderWidth:1+"px",
         
         justifyContent:"center",
         alignItems: "center",
        
        }
  }));


export default function SettingsPage(props){

  const classes = useStyles();
  const [isloaded,setIsLoaded] = React.useState(true);

	return(
		<div className={classes.container}>

      
  
		  <ButtonAppBar />
         
        <div style={{marginTop:8+"vw",padding:2+"vw"}}>

        <h1 style={{color:CLR_RCARD2 ,color:CLR_HEAD}}>Settings</h1>
        <div style={{fontSize:5+"vw"}}>Accounts</div>
         <NavButton name="Personal Info" onClick={()=>{ }}/>
         <NavButton name="Business Account" onClick={()=>{ }}/>

         <div style={{fontSize:5+"vw"}}>Start renting</div>
         <NavButton name="Get Started" onClick={()=>{ }}/>
         <NavButton name="Learn About Renting" onClick={()=>{ }}/>
         <NavButton name="Promote" onClick={()=>{ }}/>

         <div style={{fontSize:5+"vw"}}>Support</div>
         <NavButton name="How It Works" onClick={()=>{ }}/>
         <NavButton name="Safety" onClick={()=>{ }}/>
         <NavButton name="Contact Support" onClick={()=>{ }}/>
         <NavButton name="Give Feedback" onClick={()=>{ }}/>

         <div style={{fontSize:5+"vw"}}>Legal</div>
         <NavButton name="erms of Service" onClick={()=>{ }}/>
      </div>
		</div>
	);

}

function NavButton(props){
    const classes = useStyles();
    return(
        <div className={classes.nbuttonroot} onClick={props.onClick}> <a >{props.name}</a> </div> 
    )
}
