import router from "next/router";
import { geturlFormdata } from "../constants";
import { getlocal, storelocal, storeobjlocal } from "../localstore";
import { getdata, getTokenswithIdToken } from "../networking/getdata";
import { postdata } from "../networking/postdata";




export const verifyonServer = async(idToken,idtype , id , userdata) =>{
    console.log("tokens found");
    console.log(userdata);
    var urlForm = geturlFormdata("user","verify",{},{"token":idToken})
    try {
     await getTokenswithIdToken(urlForm.url , idToken , urlForm.formdata).then((response)=>{
      //  console.log(response.data,"resp");
      
       setup_after_LoginSuccess(response.data , idtype , id,userdata).then((val)=>{
          
         storelocal("temp_id",id)
          
       }).catch((e)=>{
          console.log(e);
       })
     })
    }
    catch(e){
  console.log(e);
    }
    
  }

  export const setup_after_LoginSuccess = async(data , idtype, email,userdata) =>{
      
     
      
    storelocal("access_token",data["AccessToken"])
     storelocal("refresh_token",data["RefreshToken"])
     storelocal("at_expiresin",data["AtExpires"])
     storelocal("rt_expiresin",data["RtExpires"])
     //console.log(AuthContext);
     try{
     
    //  checks if userdata exist or not if exist then  to homepage else to infofill 
     await getuserdata(idtype , email).then((value)=>{ 
       console.log("user exist in database");

         // onRefresh(AuthContext)
         var path = getlocal('currentpath')
         console.log(path);
         if (path == undefined){
          router.push("/home")
          
         }else{
          router.push(path)
         }
         

       }).catch((err) =>{
           console.log(err);
           var path = getlocal('currentpath')
           // no user found then create user
           create_user(userdata)
           // 
       })
    }catch(e){
        
    }
  }


export const create_user = async (userdata) =>{
    var urlform = geturlFormdata("customer","create",{},{}) 
    var formdatas = new FormData();
     formdatas.set("first_name", userdata.user.displayName)
     var temp = getlocal("temp_id")
     if(temp.startsWith("+")){
      formdatas.set("phone_number", getlocal("temp_id"))
      }else{
      formdatas.set("email", getlocal("temp_id"))
      }
      formdatas.set("iden", getlocal("temp_id"))
  
      formdatas.set("metadata",`{"photoURL":"${userdata.user.photoURL}"}`)
     
      await postdata(urlform.url , "customer" ,formdatas ).then((response) =>{
         if (response.status == 201){
           //user created go to home 
         }
      }).catch((err) =>{
          //user not created retry signin remove all tokens 
      })
      
  
  }

  
  export async function getuserdata(idtype,user_id) {
    try {

   var k =  await getdata( geturlFormdata("customer","get", {"idtype":idtype , "user_id":user_id } ,{} ).url,"customers" ).then((value)=>{
    
    if( value.length == 0 ){
       throw "no user found";
    }
    storeobjlocal("userdata" , value)
    return value
   }).catch((err)=>{
     
       throw err;
      
       
   })
   

    return k
    }
    catch (e) {
        
       throw e;
       
    }
}
  