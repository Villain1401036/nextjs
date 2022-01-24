
import React, { useContext } from 'react'
import ButtonAppBar from '../components/headbar'



import { Shopname } from '../constants'
import { makeStyles } from '@material-ui/core/styles';
import Ongoingwork from '../components/containers/ongoingwork';
import Histwork from '../components/containers/histwork'
import Notifications from '../components/containers/notifications'
import { AuthContext } from '../context'
import Logincontainer from '../components/containers/logincontainer'



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
		 
		  height:100+"100%"
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
  

export default function HomePage(props){

  const authContext = useContext(AuthContext);
  const [isloaded,setIsLoaded] = React.useState(true);
  const classes = useStyles();
	
	return(

<>
{ authContext.isLoggedIn && 
	(
		<div >

        
			<div className={classes.contentArea}>
              <ButtonAppBar  itemName={Shopname}/>
			 

			  <Notifications />
			  <Histwork />
			  <Ongoingwork />
			  
			</div>
			
        

       
		</div>

)
}
{
	!authContext.isLoggedIn && (<Logincontainer />)
}

</>
	);



}
