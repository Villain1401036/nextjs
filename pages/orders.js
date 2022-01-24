
import React, { useContext } from 'react'
import ButtonAppBar from '../components/headbar'
import Footer from '../components/footer'




import { Shopname ,onRefresh} from '../constants'

import Allordercontainer from '../components/containers/allordercontainer'
import { AuthContext } from '../context'
import Logincontainer from '../components/containers/logincontainer'
import Latestwork from '../components/containers/lastestwork'




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
			
        <Latestwork type={"customer"} />
        

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
