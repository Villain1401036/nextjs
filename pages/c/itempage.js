import Head from 'next/head'
import React , {useContext, useEffect} from 'react'
import ButtonAppBar from '../../components/headbar'

import { onRefresh, Shopname, user } from '../../constants'
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router'
import { AuthContext } from '../../context'
import Logincontainer from '../../components/containers/logincontainer'
import Itemcontainer from '../../components/itemcontainer';

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
        
        marginTop:10+"vw",
        
    
        '@media (min-width:845px)': { // eslint-disable-line no-useless-computed-key
          marginTop: 5+"vw"
        },
        '@media (max-width:360px)': { // eslint-disable-line no-useless-computed-key
            marginTop: 15+"vw"
        }
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






export default function ItemPage(props){

const classes = useStyles();
const [profile , setProfile] = React.useState();
const [isloaded,setIsLoaded] = React.useState(false);


const router = new useRouter();


useEffect (()=>{
	if (!isloaded){
		
	}
	
 }); 

const authContext = useContext(AuthContext);
 

onRefresh(authContext);



	return(

<>
{ authContext.isLoggedIn && 
  (
	<div>
	<Head>
		<title>Spook</title>
		<link rel="icon" href="/favicon.ico" />
	</Head>

	<ButtonAppBar itemName={Shopname}/>
	<div >
	<Itemcontainer />

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


