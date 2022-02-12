
import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { getdata } from '../../networking/getdata';
import { Button, Chip, TextField } from '@material-ui/core';
import Taskcard from '../taskcard';
import { MapSharp } from '@material-ui/icons';
import Addresscard from '../addresscard';
import { FormGroup, Stack } from '@mui/material';
import { Dropdown } from 'react-bootstrap';
import Select from 'react-select'
import router from 'next/router';
import { getfromLS, geturlFormdata, setValue } from '../../constants';
import { put, putverify } from '../../networking/getmedia';
import { postdata } from '../../networking/postdata';
import Webcam from 'react-webcam'
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

export function Confirm(props){

//  / const BarcodeScannerComponent = require('react-webcam-barcode-scanner');

const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false })
     useEffect(() => {

        fetchQR()
  
      })
      
        
     const fetchQR = async() =>{

        var data = Math.floor( Math.random() * 10000000000000000000000000000000000000000)
        var QRCode = require('qrcode')
        QRCode.toCanvas(data.toString(), { errorCorrectionLevel: 'H' }, function (err, canvas) {
            if (err) throw err
          
            var container = document.getElementById('container')
            
              container.replaceChildren(canvas)
            
           
          
          })
     }

     const checkQR = () =>{
            

     }

    const  handleScan = data => {
      
      if (data) {
        var k = document.getElementById('qrreader')
        k.style.display = "none"
       //router.push("/");
      }
    }
   const handleError = err => {
      console.error(err)
    }
       
    return(
        <>
           
            <h3 style={{textAlign:"center"}}>Scan the QR code to verify</h3>
            <div id="container" style={{textAlign:"center" ,padding:1+"vh", marginLeft:10+"vh",marginRight:10+"vh", backgroundColor:"lightgrey"}} ></div>

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

