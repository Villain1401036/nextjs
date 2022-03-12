
import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';

//import QrReader from 'react-qr-reader'

import dynamic from 'next/dynamic'

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
		display:'flex',
		flexDirection:'row',
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

export default function Confirm(props){

//  / const BarcodeScannerComponent = require('react-webcam-barcode-scanner');

const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false })

     useEffect(() => {

       // fetchQR()
  
      })
      
        

    const  handleScan = data => {
      
      if (data) {
        var k = document.getElementById('qrreader')
        k.style.display = "none"
        console.log(data);
        props.passcode(data);
       //router.push("/");
      }
    }


   const handleError = err => {
      console.error(err)
    }
       
    return(
        <>
           
            <h1 style={{textAlign:"center"}}>Scan the QR code to verify</h1>

            <div id="details" >
                <div>{props.productId}</div>
            </div>
          <div  id='qrreader' >

            <QrReader
           
          delay={300}
          onError={handleError}
          onScan={handleScan}
          
          style={{ width: '100%' }}
        />
        </div>
        </>
    );

}

