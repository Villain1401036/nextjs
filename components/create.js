import { Button, Chip, Input, Switch, TextareaAutosize, TextField } from "@material-ui/core";

import React, { useState } from "react";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import Stack from '@mui/material/Stack';
import { StaticTimePicker } from "@mui/lab";
import { FormGroup, InputBase } from "@mui/material";
import { postdata } from "../networking/postdata";
import { mediaarr, put } from "../networking/getmedia";
import { useRouter } from "next/router";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { geturlFormdata } from "../constants";
import { getallCategories, handleEnterKeyPress } from "../utils";
import { Dropdown } from "react-bootstrap";
import { getlocal, getobjlocal, storelocal } from "../localstore";
import ClothesInfo from "./filterfills/clothes";
import { FaPlus, FaTag } from "react-icons/fa";
import { Modal, ModalBody, ModalDialog } from 'react-bootstrap';
import { categoriesjson } from "../utils/categories";
import { MdClear } from "react-icons/md";





export function Itemform(props){

  const[loaded,setLoaded] = React.useState(false);
 
  const [value, setValue] = React.useState(new Date());

  const [uimages , setUimages ] = useState(false);
  const [categorydone , setCategorydone ] = useState(false);


  const [show , setShow ] = useState(false);

  const[customerkey, setCustomerkey] = React.useState();

  const [title , setTitle ] = React.useState();
  const[description, setDescription] = React.useState();

  const[price, setPrice] = React.useState();
  const[deno, setDeno] = React.useState();

  const[tags, setTags] = React.useState("");
  const[category, setCategory] = React.useState();

  const[negotiable, setNegotiable] = React.useState(false);
  

  const[tag, setTag] = React.useState();
 
  
  const[categorys, setCategorys] = React.useState("");


  const [alltags, setAlltags] = useState(new Set());
const [allcat, setAllcat] = useState(new Set());

 
React.useEffect (()=>{
  if (!loaded){
     
  setLoaded(true)
  //setVal(opentasklist);
  }
});

const gettagsproperarray = (tags) =>{
    console.log(alltags);
    if (tags.length == 0){
        return []
    }else{
     return  tags.split("~")
    }
}

const filtertags =  gettagsproperarray(tags).map( (item) =>  <Chip label={item} key={item} onClick={()=>{ }} onDelete={()=>{console.log(item);}} deleteIcon={<MdClear size={100+"%"}/> } size="small"/> )

const filtercategory =   categorys.split("~").map( (item) => <Chip label={item} key={item}  onClick={()=>{ }}  size="small"/> )

const [files, setFiles] = React.useState([]); 

const router = useRouter();

const handleupload = (file) =>{
if(typeof window != 'undefined'){
  
    
    put(file)
 
 }
}

const makearr =() =>{
  
  var s = ""
  mediaarr.forEach(element => {
    s += `"/${element}",`
  });
   
  return s.slice(0,-1)
}

const getkeywordsfromtitle = (str , category) =>{

  var stopwords = ['','i','me','my','myself','we','our','ours','ourselves',
  'you','your','yours','yourself','yourselves','he','him','his','himself',
  'she','her','hers','herself','it','its','itself','they','them','their','theirs',
  'themselves','what','which','who','whom','this','that','these','those',
  'am','is','are','was','were','be','been','being','have','has','had',
  'having','do','does','did','doing','a','an','the','and','but','if',
  'or','because','as','until','while','of','at','by','for','with',
  'about','against','between','into','through','during','before',
  'after','above','below','to','from','up','down','in','out','on',
  'off','over','under','again','further','then','once','here',
  'there','when','where','why','how','all','any','both','each',
  'few','more','most','other','some','such','no','nor','not',
  'only','own','same','so','than','too','very','s','t',
  'can','will','just','don','should','now']

  var res = []
  var words = str.split(' ')
  var newords = []
  for(var i=0;i<words.length;i++) {
    //clean words having any different char like . , / etc
      var s = ""

     var len = category.split(" > ").length

     var word_clean = words[i]
     if(!stopwords.includes(word_clean)) {
         newords.push(word_clean)
         res.push( word_clean  + " in " + category.split(" > ")[ len - 1 ])
     }


  }

  for(var i=0;i<newords.length - 1;i++) {
    var word2 = newords[i] + " "+ newords[i+1]
    res.push( word2  + " in " + category.split(" > ")[ len - 1 ])
  }


  return res.join("~")

}

const insert_tags = async(tags , title , category ) => {

     var urlForm = geturlFormdata("insert","tags" ,{},{})

     var formdata = new FormData();
     if (tags == "" || tags !== undefined || tags == null){
      console.log(tags, "tags" );
      console.log(title, "title" );
      console.log(category, "citle" );

      formdata.append("tags", getkeywordsfromtitle(title ,category ))
     }else{
      formdata.append("tags", tags+"~"+getkeywordsfromtitle(title))
     }

 
     await postdata(urlForm.url , "item" , formdata ).then((val)=>{
   
     }).catch((e)=>{console.log(e); alert("error posting item") })

}

const  readyform = async() => {

  try{
  var formdatas = new FormData();
 
  //storelocal("user_key",)

  var userkey = await  getobjlocal("userdata")[0].userkey
  formdatas.append("customer_key", userkey);
  if (description){ formdatas.append("description", description)}

  if (price){ formdatas.append("price", price)}
   formdatas.append("deno", "INR")
   formdatas.append("place", getlocal("place").toLowerCase())

  if (tag){ formdatas.append("tags", tags)}

  if (category){ formdatas.append("category",  category.split(" > ").join('~').toLowerCase() )}

  if (negotiable){
    formdatas.append("negotiable", negotiable)
  }else{
    formdatas.append("negotiable", false)
  }
  formdatas.append("title", title )

  formdatas.set("metadata", `{"images":[${makearr()}]}` )
 
  await postdata(geturlFormdata("item","create",{}).url , "item" , formdatas ).then((val)=>{
   
    setShow(true);
    insert_tags(tags,title, category.toLowerCase())

  }).catch((e)=>{console.log(e); alert("error posting item") })
     
   
  }
  catch(e){
     
  }

}

const fillpics = Array.from(files).map(file => 
  <img style={{width:80+"vw" , max}} src={URL.createObjectURL(file)}></img>
)





const handlesubmit = async () =>{
   var files = []
   
  if (file1 != undefined){
    files.push(file1)
  } 
  if (file2 != undefined){
    files.push(file2)
  } 
  if (file3 != undefined){
    files.push(file3)
  } 
   handleupload(files);

  await readyform()

}

  const getcats = (data) =>{

    var list 
  }
  const  [parentcategory,setParentcategory] = useState();
  const  [subcats, setSubcats] = useState([]); 
  // const cats = getallCategories();
  const cats = categoriesjson
  console.log("subcats ", subcats);
  // const dropcats = cats.map( (item) => <Dropdown.Item href="#/action-3"key={item} onClick={()=>setCategory(item)} >{item}</Dropdown.Item> )
  const dropcats = cats.map( (item) => <div  key={item.category} onClick={()=>{ setParentcategory(item.category) ; setSubcats(item.subcategories) ; setFcat(false) ; setSubcat(true)}} name={item.category} multiple={(item.hassub > 0)} style={{minHeight:20+"vh",border:"1px solid grey", }} ><div>{item.category}</div></div> )

  const dropsubcats = subcats.map( (item) => <Expandbutton  key={item.item} setParentcategory={(next) =>{ setParentcategory(parentcategory +" > " + next ) }} onClick={(selected)=>{setCategory(parentcategory +" > " + selected);setSubcat(false)}} name={item.item} multiple={(item.hassub > 0)} data={item.subs} style={{minHeight:20+"vh",border:"1px solid grey", }} ></Expandbutton> )

   const [fcat , setFcat] = useState(false);
   const [subcat , setSubcat] = useState(false);  

   const [file1,setFile1] = useState();
   const [file2,setFile2] = useState();
   const [file3,setFile3] = useState();

  return (
   <> { loaded &&
    <>
      <div style={{textAlign:"center" , display:"flex", flex:1,flexDirection:"column", backgroundColor:"white",justifyContent:"center",alignItems:"center",textAlign:"center"}}>
       
        <h1 style={{margin:5+"vw"}}>Enter Item Details</h1>
          <FormGroup>
          
          <h5 >Choose Category*</h5>
        
          <div  id='categorytoogel' style={{backgroundColor:"white",color:"black" , padding:2+"vw",border:"1px solid grey",borderRadius:"1vw"}} onClick={()=>{setFcat(true)}} >
    {(category != undefined)?category:"select category"}
  </div>

     <Dialog style={{flex:1,display:"flex", justifyContent:"center"}} open={fcat}>

     <DialogContent style={{display:"grid",zIndex:20000,margin:1+"vh" ,gridTemplateColumns:"auto auto auto" ,gridColumnGap:2+"vh",gridRowGap:2+"vh"}}  >
      {dropcats}
      </DialogContent>
     </Dialog>

    <Dialog  open={subcat}   >
      <DialogContent style={{overflow:"scroll"}} >
      {dropsubcats}
      </DialogContent>
    </Dialog>
         
 
{category != undefined ?
<>
<div style={{margin:5+"vw"}}>
  <h5>Title</h5>
<InputBase  id="title" label="title" multiline style={{ width:100+"%" ,borderStyle:"solid" , borderWidth:1+"px",paddingLeft:20+"px" , paddingRight:20+"px" }} onChange={(e) => {setTitle(e.target.value); } } ></InputBase>
</div>

<div style={{margin:5+"vw"}}>
  <h5>Additional Information</h5>
  <InputBase  id="description" label="description" multiline style={{ width:100+"%", minHeight:20+"vw" ,borderStyle:"solid" , borderWidth:1+"px",paddingLeft:20+"px" , paddingRight:20+"px" }} onChange={(e) => {setDescription(e.target.value); } } ></InputBase>
</div>

<h3>Rental Price</h3>
<div style={{margin:5+"vw",display:"flex"}}>


<div><span style={{fontSize:5+"vw",marginRight:5+"vw"}} >Per day</span><InputBase placeholder="25"  id="price" label="price"  inputMode="numeric" type="number" onChange={(e) => setPrice(e.target.value) } style={{ width:80+"%" ,borderStyle:"solid" , borderWidth:1+"px",paddingInline:1+"vw" ,borderRadius:2+"vw"  }}></InputBase></div>
<div><span style={{fontSize:5+"vw",marginRight:5+"vw"}} >Per week</span><InputBase placeholder="50"  id="price" label="price"  inputMode="numeric" type="number" onChange={(e) => setPrice(e.target.value) } style={{ width:80+"%" ,borderStyle:"solid" , borderWidth:1+"px",paddingInline:1+"vw",borderRadius:2+"vw" }}></InputBase></div>
<div><span style={{fontSize:5+"vw",marginRight:5+"vw"}} >Per month</span><InputBase placeholder="100"  id="price" label="price"  inputMode="numeric" type="number" onChange={(e) => setPrice(e.target.value) } style={{ width:80+"%" ,borderStyle:"solid" , borderWidth:1+"px",paddingInline:1+"vw" ,borderRadius:2+"vw" }}></InputBase></div>
</div>
{/* <h5>Currency*</h5>
<input  id="deno" label="deno"  onChange={(e) => setDeno(e.target.value) } ></input> */}
{/* <ClothesInfo onselectmany={(tags)=>{console.log(new Set(tags.slice(1).split("~")));var tset = new Set(tags.split("~"))  ;setAlltags(tset) }} alreadyselecteditems={alltags} />  */}

<h5>negotiable price<Switch checked={negotiable} onChange={()=>{setNegotiable(!negotiable)}} /></h5>

<div style={{marginBottom:5+"vw"}}>
  
{/* <h5>tags</h5> 
<div>{alltags.size>0?filtertags:<></>}</div>

<FaTag style={{margin:"2vw"}}/>
<input  id="tags"   style={{marginTop:2+"vh"}} onChange={(e) => setTag(e.target.value) } onKeyPress={(e)=>{handleEnterKeyPress(e,setTags,alltags,tag,"tags")}}></input>
<div onClick={()=>{  }} >or choose from here</div>

<div style={{fontSize:3+"vw"}}>^^ Press enter to add more tags</div> */}
 

</div>
</>
:<></>
}

{/* 
<h5>categories</h5> <div>{allcat.size >0?filtercategory:<></>}</div>
<TextField  id="category" label="add new category"   style={{margin:2+"vh"}} onChange={(e) => setCategory(e.target.value) } onKeyPress={(e)=>{handleEnterKeyPress(e,setCategorys,allcat,category,"category")}}></TextField> */}
</FormGroup>

{/* <div><Button onClick={()=>{ readyform()}}>Submit</Button></div> */}
<>          
 { category!= undefined && <div><Button style={{margin:3+"vw", borderStyle:"solid" , borderWidth:1+"px",paddingLeft:20+"px" , paddingRight:20+"px" }} onClick={()=>{ setUimages(true);router.push('#uploadimages') }}>Upload Images</Button></div>
}</>
{uimages?
<div id="uploadimages">
<h5>Add Images</h5>
<div>^^add some images relevant to the item to make it more appealing</div>
<input type="file" name="file" id={"img1"}  accept="*/*" style={{display:'none'}}  onChange={()=>{var file  = event.target.files ; console.log(file) ; setFile1(file[0]) }} />
<input type="file" name="file" id={"img2"}  accept="image/png, image/gif, image/jpeg" style={{display:'none'}}  onChange={()=>{var file  = event.target.files ; console.log(file) ; setFile2(file[0]) }} />
<input type="file" name="file" id={"img3"}  accept="image/png, image/gif, image/jpeg" style={{display:'none'}}  onChange={()=>{var file  = event.target.files ; console.log(file) ; setFile3(file[0]) }} />


{!file1 ? <div style={{width:80+"vw", height:60+"vw",margin:"auto" , marginBottom:6+"vw", backgroundColor:"lightgrey"}} onClick={()=>{ document.getElementById("img1").click(); }}  ></div>:<img style={{width:80+"vw" , maxHeight:60+"vw",margin:"auto" , marginBottom:6+"vw", backgroundColor:"lightgrey", objectFit:"contain"}} src={URL.createObjectURL(file1)}></img>}


{!file2 ? <div style={{width:80+"vw", height:60+"vw",margin:"auto" ,  marginBottom:6+"vw",backgroundColor:"lightgrey"}} onClick={()=>{ document.getElementById("img2").click();}}  ></div>:<img style={{width:80+"vw" ,  maxHeight:60+"vw",margin:"auto" , marginBottom:6+"vw", backgroundColor:"lightgrey", objectFit:"contain"}} src={URL.createObjectURL(file2)}></img>}

{!file3 ? <div style={{width:80+"vw", height:60+"vw",margin:"auto" ,  marginBottom:6+"vw",backgroundColor:"lightgrey"}} onClick={()=>{document.getElementById("img3").click(); }}  ></div>:<img style={{width:80+"vw" ,  maxHeight:60+"vw",margin:"auto" , marginBottom:6+"vw", backgroundColor:"lightgrey", objectFit:"contain"}} src={URL.createObjectURL(file3)}></img>}


{ files!= [] ?<>{fillpics}</>:<></> }
            <>
            
            <div><Button style={{margin:3+"vw", borderStyle:"solid" , borderWidth:1+"px",paddingLeft:20+"px" , paddingRight:20+"px" }} onClick={()=>{ handlesubmit() }}>Submit</Button></div>
            </>
            </div>
 :<></>}
      </div>
      <Modal onBackdropClick={()=> console.log("close") }  style={{zIndex:20000, display:"flex" , justifyContent:"center" ,alignItems:"center" , height:window.innerHeight , width:window.innerWidth*.8 ,marginBlock : 20+"vh" ,marginInline: window.innerWidth*.1 }}  show={show} >
        <div style={{width:80+"vw" ,height:"40vh", display:"flex",justifyContent:"center",flexDirection:"column-reverse" ,alignItems:"center" }}>
		    <Button onClick={()=>{ router.push('/home')}} >go back</Button>
        <div className='btn' style={{padding:20 }} onClick={()=>{ router.reload()}} >Create another Item</div>
        </div>
		</Modal>
      </>
}
</>

  );
}


const Expandbutton = (props) =>{
  
   const [opensub ,setOpensub ] = useState(false)
   const cats = props.data


   const dropcats = ( props.data != undefined && cats.map( (item) => 
   <div onClick={()=> props.onClick(item)} style={{height:7+"vh",borderBottom:"1px solid grey",backgroundColor:"lightgrey" , width:"100%", display:"flex", flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
   <div style={{ display:"flex",justifyContent:"center",flex:1}} >{item}</div>
   </div> 
   )
   )

  return (
    
    <div onClick={()=>{(props.data != undefined ? setOpensub(!opensub) : props.onClick(props.name) );( props.data != undefined && props.setParentcategory(props.name ) ) }} style={{width:100+"%", display:"flex",justifyContent:"center",flexDirection:"column", alignItems:"center"}}>
      <div style={{height:7+"vh",borderBottom:"1px solid grey", width:"100%", display:"flex",justifyContent:"center",alignItems:"center"}}>
      <div style={{ display:"flex",justifyContent:"center",flex:1}} >{props.name}</div>
      {props.multiple && <div style={{ display:"flex",justifyContent:"center",paddingInline:3+"vh"}} ><FaPlus /></div> }
      </div>
      {opensub &&
       <>
      {dropcats}
      </>}
    </div>  

    
  )

}


