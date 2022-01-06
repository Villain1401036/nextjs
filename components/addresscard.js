//task card for a new task that has been posted
import { Button, Card, divField } from '@material-ui/core';
import { divFormat } from '@material-ui/icons';
import React from 'react'


export default function Addresscard(props){

//const classes = useStyles();

  const [isloaded,setIsLoaded] = React.useState(true);

	return(
		<div>
            <Card  onClick={() => console.log("")}>
                <div name="address">{props.address}</div>
                <div name="city">{props.city}</div>
                <div name="locality">{props.locality}</div>
                <div name="state">{props.state}</div>
                <div name="country">{props.country}</div>
                <div name="pincode">{props.pincode}</div>
                <div name="pincode">{props.pincode}</div>
                <div name="phone">{props.phone}</div>
                <button name="maplink" onClick={() => open(props.maplink)}></button>
                
                <button name="editaddress" onClick={() => {console.log("edit me!");}}>Edit address</button>
            </Card>

            

		</div>
	);



}

