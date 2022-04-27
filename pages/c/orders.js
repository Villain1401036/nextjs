
import React, { useContext } from 'react'
import ButtonAppBar, { NameHead } from '../../components/headbar'
import Footer from '../../components/footer'




import { Shopname ,onRefresh} from '../../constants'

import { AuthContext } from '../../context'
import Logincontainer from '../../components/containers/logincontainer'
import Bookingorders from '../../components/containers/allbookings'
import { FaArrowLeft } from 'react-icons/fa'
import { CLR_HEAD } from '../../themes'
import router from 'next/router'




export default function Orderpage(props){

   const authContext = useContext(AuthContext);

  const [isloaded,setIsLoaded] = React.useState(true);

  React.useEffect(()=>{
    if(!isloaded){
      console.log("isloaded called");
      
      setIsLoaded(true);
    }
    onRefresh(authContext);
    
  })  
  

	return(


<>
{ authContext.isLoggedIn && 
  (
		<div style={{flex:1,display:"flex" , flexDirection:"column",flexGrow:1,alignItems:"fill",minHeight:100+"vh"  }}>

        <NameHead label="booking" onClick={()=>router.back()} onHomeClick={()=>{router.push('/c/home')}} />
			  <div style={{minHeight:80+"vw"}}>
        <Bookingorders />
        </div>
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


