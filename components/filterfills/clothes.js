import { InputBase } from '@mui/material';
import React from 'react';
import { ChooseText, EditText } from './fillutils';

export default function ClothesInfo(props){

    const [isloaded,setLoaded] = React.useState()
    
    return (
        <>
         
          {/* <EditText label="brand" placeholder="brand" /> */}
          <ChooseText label="brand" placeholder="brand" items={["Adidas","Avro","Nike","H&M","Jockey","Rupa","Panther","Safari","Wrogn"]} 
           item="brand" onselectitemSingle={(val)=>{console.log(val);}}  singleitem onselectmany={(data)=>{props.onselectmany(data) }} allreadyselected={props.alreadyselecteditems} />
        </>
    ) ;

}
