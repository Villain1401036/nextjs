
import React, { useContext } from 'react'
import ButtonAppBar, { NameHead } from '../components/headbar'
import Footer from '../components/footer'




import { Shopname ,onRefresh} from '../constants'

import { AuthContext } from '../context'
import Logincontainer from '../components/containers/logincontainer'
import Bookingcontainer from '../components/containers/bookingreq'
import router from 'next/router'




export default function Orderpage(props){

   const authContext = useContext(AuthContext);

  const [isloaded,setIsLoaded] = React.useState(true);


  
	return(


<>
{ authContext.isLoggedIn && 
  (
		<div style={{flex:1,display:"flex" , flexDirection:"column",flexGrow:1,alignItems:"fill",minHeight:100+"vh"}}>
        
        
        <NameHead label={"Your Rented Items"}  onClick={()=>{router.back()}} onHomeClick={()=>{router.push('/home')}}/>
			  
      
         <Bookingcontainer />
         
        <div style={{flex:1,display:"flex" ,flexDirection:"column",alignItems:"flex-end"}}>
        <Footer />
       
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
