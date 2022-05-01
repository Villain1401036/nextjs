import { Button, InputBase } from "@mui/material";
import { useEffect, useState } from "react";

import { CLR_FBAR, CLR_HEAD, CLR_RCARD1, CLR_RCARD2 } from '../../themes';




import { Modal } from 'react-bootstrap';
import { Chip } from "@material-ui/core";
import { setValue } from "../../constants";
import { getlocal } from "../../localstore";



export function EditText(props){
    const [editing , setEditing] = useState(false);
    const [currvalue, setCurrvalue] = useState(props.value);

    if (props.disabled){
        return (
         
        <div style={{width:90+"%",borderColor:CLR_RCARD1,borderStyle:"solid" ,borderRadius:"2vw", borderWidth:2 , margin:"2vw",padding:"2vw" , backgroundColor:"lightgrey" }}>
        <div style={{display:"flex",}}>
            <div>
        <div style={{ fontSize:9 }}>{props.label}</div>
        <div placeholder='yourname'  style={{ borderColor:"white",borderStyle:"hidden",borderStyle:"hidden", flexDirection:"row",fontSize:15,height:8+"vw" , color:'black'   }}>
            {currvalue}
            
            </div>
            </div>
            <div style={{display:"flex",flex:1}} ></div>
            <FaEdit size={8+"vw"} color={CLR_HEAD} onClick={()=>{console.log("asdas"); }}/>
            </div>
              
    </div>);
    }
    return (
        <>
        {
            editing?
        
        <div style={{width:90+"%",borderColor:CLR_HEAD,borderStyle:"solid" ,borderRadius:"2vw", borderWidth:2, margin:"2vw" ,padding:"2vw" }}>
            <div style={{ fontSize:10 }}>{props.label}</div>
           
            <InputBase placeholder='yourname'  style={{ borderColor:"white",borderStyle:"hidden",borderStyle:"hidden", flexDirection:"row",fontSize:15, color:'black'  }}
                  
                  autoFocus
                  defaultValue={currvalue}
                    onBlur={()=>setEditing(false) }
                 onKeyPress={(e)=>{ console.log(e.key);  if (e.key=='Enter'){
                 }else{
                 }}}
                  onChange={(e)=>{ setCurrvalue(e.target.value); console.log(e.target.value);}} 
                  
                  ></InputBase>
                  
        </div>
    : <div style={{width:90+"%",borderColor:CLR_RCARD1,borderStyle:"solid" ,borderRadius:"2vw", borderWidth:2 , margin:"2vw",padding:"2vw" }}>
    <div style={{ fontSize:9 }}>{props.label}</div>
   
    <div placeholder='yourname'  style={{ borderColor:"white",borderStyle:"hidden",borderStyle:"hidden", flexDirection:"row",fontSize:15,height:8+"vw" , color:'black'   }}
           onClick={()=>{setEditing(true)}}
          
          >{currvalue}</div>
          
</div>
 }
   </>    )
   
}


export function ChooseText(props){

    const [filteropen , setFilteropen] = useState(false);
    const [currvalue, setCurrvalue] = useState(props.value);
    const [selecteditems, setSelecteditems] = useState(""); 

    var selecteditem = new Set()

    useEffect(()=>{
        
    })

    const itemsdisplay =   selecteditems.slice(1).split("~").map((item)=> ( item.length > 0? <Chip label={item}  />:<></>))
    
    const onselectitem =( item ) =>{
  
        if (selecteditem.has(item)){
            selecteditem.delete(item)
        }
        else{
            selecteditem.add(item)

            
        }
  
    }

    const onselectitemSingle = (item) =>{

        props.onselectitemSingle(item)
        setFilteropen(false) 
        setCurrvalue(item)
    }
    
  const listcategory = props.items
  const chipscategory = listcategory.map((item) => <> {!  new Set(selecteditems.slice(1).split("~")).has(item) ? <SelectChip item={item} onselect={(val)=> { if(props.singleitem ) { onselectitemSingle(val) }else{ onselectitem(val) ; console.log( selecteditem ) }} } />:<SelectChip item={item} onselect={(val)=> { if(props.singleitem ) { onselectitemSingle(val) }else{ onselectitem(val) ; console.log( selecteditem ) }} } initval={true} />  }</> )

   const addtoset = (  selecteditems ) =>{
      
       var s1 = new Set(selecteditems.slice(1).split("~"))
       
        s1.forEach((item)=>{ onselectitem(item) } )


   }
   
    return (
        <>
        <div>{itemsdisplay}</div>
        {
            filteropen?
        
        <div style={{width:90+"%",borderColor:CLR_HEAD,borderStyle:"solid" ,borderRadius:"2vw", borderWidth:2, margin:"2vw" ,padding:"2vw" }}>
            <div style={{ fontSize:10 }}>{props.label}</div>
            <div placeholder='yourname'  style={{ borderColor:"white",borderStyle:"hidden",borderStyle:"hidden", flexDirection:"row",fontSize:15,height:8+"vw" , color:'black'   }}
          
          
          >{currvalue}</div>

                  
        </div>
    : <div style={{width:90+"%",borderColor:CLR_RCARD1,borderStyle:"solid" ,borderRadius:"2vw", borderWidth:2 , margin:"2vw",padding:"2vw" }}>
    <div style={{ fontSize:9 }}>{props.label}</div>
   
    <div placeholder='yourname'  style={{ borderColor:"white",borderStyle:"hidden",borderStyle:"hidden", flexDirection:"row",fontSize:15,height:8+"vw" , color:'black'   }}
           onClick={()=>{setFilteropen(true)}}
          
          >{currvalue}</div>
          
</div>
 }



<Modal  style={{zIndex:2000, flex:1 ,display:"flex" , display:"flex", justifyContent:"center",alignItems:"center" ,flexDirection:"row"  }}  
    show={filteropen} 
    backdrop={true} 
    onHide={()=>setFilteropen(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
         > 
             <Modal.Body style={{flex:1 ,display:"flex" ,  flexDirection:"column" ,justifyContent:"center",alignItems:"center" ,}}><div style={{ flex:1 ,display:"flex" ,  flexDirection:"column" ,justifyContent:"center",alignItems:"center" ,backgroundColor:"white" , borderRadius:2+"vw" }}>
              <h2>Select {props.item}</h2>
             <div style={{width:100+"%", display:"flex" , flexWrap:"wrap",justifyContent:"center" , alignItems:"center"}}>

{chipscategory}
</div>
<Button style={{border:"1px solid "+CLR_HEAD , fontSize:"4vw",padding:"1vw" }} onClick={()=>{

        var s = ""
        
        addtoset(selecteditems)
            selecteditem.forEach( (item) =>  {s = s + "~" + item})
    props.onselectmany(s)
    setSelecteditems(s)
    setFilteropen(false)
}}>Submit</Button> 

        </div></Modal.Body>
         </Modal>
         
   </>    )
   
}


function SelectChip(props){

    const [select, setSelect] = useState(props.initval);

     return(
       <>
         
       {
         !select?
        <Chip label={props.item} variant="outlined" component="a" style={{margin:1+"vw"}}  onClick={()=> {setSelect(!select);props.onselect(props.item) }}/>:
        <Chip label={props.item} component="a" color={"primary"} style={{margin:1+"vw"}} onClick={()=> {setSelect(!select);props.onselect(props.item) }}/>
        
       }</>
       );
  }

