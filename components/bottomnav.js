import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { FaCog, FaEdit, FaHeart, FaHome, FaUser } from 'react-icons/fa';
import { Paper, withStyles } from '@material-ui/core';
import router from 'next/router';
import { CLR_HEAD, CLR_RCARD1, CLR_RCARD2 } from '../themes';
import { styled } from '@material-ui/styles';
import { AuthContext } from '../context';



const EBottomNavigationAction = styled(BottomNavigationAction)(`
  color: red
`)



 function SimpleBottomNavigation(props) {
  const [value, setValue] = React.useState(0);

  const authContext = React.useContext(AuthContext);

  return(<></>)
  return (
    <>
    <div style={{height:14+"vw",width:"100%"}}></div>
    <Paper style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} >
      <div style={{height:13+"vw" ,width:"100%",background:CLR_HEAD,flex:1,display:"flex",color:CLR_RCARD1,
          
    }}>
 
       <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center"}} onClick={()=>{(authContext.accounttype?router.push('/home'):router.push('/home'))}} >
         <FaHome size={25} />
       </div>
       <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center"}} onClick={()=>router.push('/settings')}  >
         <FaCog size={25} />
       </div>
       
       <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center"}} onClick={()=>router.push('/profile')}  >
         <FaUser size={25} />
       </div>
     
       <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center"}} onClick={()=>router.push('/home')} >
         <FaHome size={25} />
       </div>

      </div>
      
      </Paper>
</>


  
  );
}
export default SimpleBottomNavigation;