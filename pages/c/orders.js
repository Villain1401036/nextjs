
import React, { useContext } from 'react'
import ButtonAppBar from '../../components/headbar'
import Footer from '../../components/footer'




import { Shopname ,onRefresh} from '../../constants'

import { AuthContext } from '../../context'
import Logincontainer from '../../components/containers/logincontainer'
import Bookingorders from '../../components/containers/allbookings'




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
		<div>

        
			
        <Bookingorders />
        

       <Footer />
		</div>
)
}
{
  !authContext.isLoggedIn && (<Logincontainer />)
}

</>
	);



}
