
import React, { useContext } from 'react'
import ButtonAppBar from '../components/headbar'
import Footer from '../components/footer'




import { Shopname ,onRefresh} from '../constants'

import Allordercontainer from '../components/containers/allordercontainer'
import { AuthContext } from '../context'
import Logincontainer from '../components/containers/logincontainer'
import Latestwork from '../components/containers/lastestwork'
import Bookingorders from '../components/containers/allbookings'
import Bookingcontainer from '../components/containers/bookingreq'




export default function Orderpage(props){

   const authContext = useContext(AuthContext);

  const [isloaded,setIsLoaded] = React.useState(true);

  onRefresh(authContext)
  
	return(


<>
{ authContext.isLoggedIn && 
  (
		<div>
        
        
        <ButtonAppBar  itemName={Shopname}/>
			
        <Bookingcontainer />

        
        

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
