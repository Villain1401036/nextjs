import axios from 'axios';
import  { useRouter } from 'next/router';
import React from 'react';
import { cache } from '../cache';
import { geturlFormdata } from '../constants';
import { AuthContext } from '../context';
import { getlocal } from '../localstore';
import { checktokensexpiry } from '../utils';

var  proto = require('../build/gen/user_pb.js');

// getdata(url) >> 





export const getdata_post = async(url, obj, options,data) => {
  
  //  var atoken = await checktokensexpiry(getlocal("access_token"),getlocal("at_expiresin"),getlocal("rt_expiresin")); 

   var k = await axios.post(url,
    data
    ,{responseType:"arraybuffer",
      
      headers: { 'Authorization' : localStorage.getItem("access_token")}
    }
    ).then(response  => {
    
    
    
   try {
   //when request is successful check if data can be serialized
   switch ( obj ){
      case "tasks":
        var data = proto.Tasks.toObject(false,proto.Tasks.deserializeBinary(response.data)); cache.set(url , {"expire": Date.now() + 10000 , "data":data.mtasksList }) ; return data.mtasksList
      case "services":
        var data = proto.Services.toObject(false,proto.Services.deserializeBinary(response.data));cache.set(url , {"expire": Date.now() + 10000 , "data":data.mservicesList }) ; return data.mservicesList
      case "delays":
        var data = proto.Delays.toObject(false,proto.Delays.deserializeBinary(response.data)); cache.set(url , {"expire": Date.now() + 10000 , "data":data.mdelaysList }) ;return data.mdelaysList
      case "works":
        var data = proto.Works.toObject(false,proto.Works.deserializeBinary(response.data));cache.set(url , {"expire": Date.now() + 10000 , "data":data.mworksList }) ; return data.mworksList
      case "customers":
        var data = proto.Customers.toObject(false,proto.Customers.deserializeBinary(response.data)); cache.set(url , {"expire": Date.now() + 10000 , "data":data.mcustomersList }) ;return data.mcustomersList
      case "workers":
        var data = proto.Workers.toObject(false,proto.Workers.deserializeBinary(response.data)); cache.set(url , {"expire": Date.now() + 10000 , "data":data.mworkersList }) ; return data.mworkersList
      case "biditems":
          var data = proto.Biditems.toObject(false,proto.Biditems.deserializeBinary(response.data));cache.set(url , {"expire": Date.now() + 10000 , "data":data.mbiditemsList }) ; return data.mbiditemsList
      case "bids":
          var data = proto.Bids.toObject(false,proto.Bids.deserializeBinary(response.data));cache.set(url , {"expire": Date.now() + 10000 , "data":data.mbidsList }) ; return data.mbidsList
      case "bookings":
          var data = proto.Bookings.toObject(false,proto.Bookings.deserializeBinary(response.data));cache.set(url , {"expire": Date.now() + 10000 , "data":data.mbookingsList }) ; return data.mbookingsList
      case "confirmcodes":
          var data = proto.Confirmcodes.toObject(false,proto.Confirmcodes.deserializeBinary(response.data));cache.set(url , {"expire": Date.now() + 10000 , "data":data.mconfirmcodesList }) ; return data.mconfirmcodesList  
      case "address":
          var data = proto.Addresses.toObject(false,proto.Addresses.deserializeBinary(response.data));  cache.set(url , {"expire": Date.now() + 10000 , "data":data.maddressesList }) ; return data.maddressesList 
      case "items":
            var data = proto.Items.toObject(false,proto.Items.deserializeBinary(response.data));  cache.set(url , {"expire": Date.now() + 10000 , "data":data.mitemsList }) ; return data.mitemsList 
      default:
        var data = proto.Tasks.toObject(false,proto.Tasks.deserializeBinary(response.data)); cache.set(url , {"expire": Date.now() + 10000 , "data":data.mtasksList }) ;   return data.mtasksList
   }
   }
   catch (e) {
    //when request is successful but not good
       
      console.log(e);
   }
   }
   ).catch(error => {
    //failed result
        if (error.response.status == 401){
          var urlForm = geturlFormdata("user","refreshtoken",{},{})
           refreshTokens(urlForm.url)
           

        }

        else if (error.response.status == 500){
             
            throw Error("url not ok")
        }
        else {
           
            throw Error("other than unauthorized and internal server")
        }

       //  
        //  


     });
     
     return k
    }


    export const getdata = async(url, obj, options) => {
  
      //  var atoken = await checktokensexpiry(getlocal("access_token"),getlocal("at_expiresin"),getlocal("rt_expiresin")); 
    
       var k = await axios.get(url
        ,{responseType:"arraybuffer",
          
          headers: { 'Authorization' : localStorage.getItem("access_token")}
        }
        ).then(response  => {
      
        
       try {
       //when request is successful check if data can be serialized
       switch ( obj ){
          case "tasks":
            var data = proto.Tasks.toObject(false,proto.Tasks.deserializeBinary(response.data)); cache.set(url , {"expire": Date.now() + 10000 , "data":data.mtasksList }) ; return data.mtasksList
          case "services":
            var data = proto.Services.toObject(false,proto.Services.deserializeBinary(response.data));cache.set(url , {"expire": Date.now() + 10000 , "data":data.mservicesList }) ; return data.mservicesList
          case "delays":
            var data = proto.Delays.toObject(false,proto.Delays.deserializeBinary(response.data)); cache.set(url , {"expire": Date.now() + 10000 , "data":data.mdelaysList }) ;return data.mdelaysList
          case "works":
            var data = proto.Works.toObject(false,proto.Works.deserializeBinary(response.data));cache.set(url , {"expire": Date.now() + 10000 , "data":data.mworksList }) ; return data.mworksList
          case "customers":
            var data = proto.Customers.toObject(false,proto.Customers.deserializeBinary(response.data)); cache.set(url , {"expire": Date.now() + 10000 , "data":data.mcustomersList }) ;return data.mcustomersList
          case "workers":
            var data = proto.Workers.toObject(false,proto.Workers.deserializeBinary(response.data)); cache.set(url , {"expire": Date.now() + 10000 , "data":data.mworkersList }) ; return data.mworkersList
          case "biditems":
              var data = proto.Biditems.toObject(false,proto.Biditems.deserializeBinary(response.data));cache.set(url , {"expire": Date.now() + 10000 , "data":data.mbiditemsList }) ; return data.mbiditemsList
          case "bids":
              var data = proto.Bids.toObject(false,proto.Bids.deserializeBinary(response.data));cache.set(url , {"expire": Date.now() + 10000 , "data":data.mbidsList }) ; return data.mbidsList
          case "bookings":
              var data = proto.Bookings.toObject(false,proto.Bookings.deserializeBinary(response.data));cache.set(url , {"expire": Date.now() + 10000 , "data":data.mbookingsList }) ; return data.mbookingsList
          case "confirmcodes":
              var data = proto.Confirmcodes.toObject(false,proto.Confirmcodes.deserializeBinary(response.data));cache.set(url , {"expire": Date.now() + 10000 , "data":data.mconfirmcodesList }) ; return data.mconfirmcodesList  
          case "address":
              var data = proto.Addresses.toObject(false,proto.Addresses.deserializeBinary(response.data));  cache.set(url , {"expire": Date.now() + 10000 , "data":data.maddressesList }) ; return data.maddressesList 
          case "items":
                var data = proto.Items.toObject(false,proto.Items.deserializeBinary(response.data));  cache.set(url , {"expire": Date.now() + 10000 , "data":data.mitemsList }) ; return data.mitemsList 
          default:
            var data = proto.Tasks.toObject(false,proto.Tasks.deserializeBinary(response.data)); cache.set(url , {"expire": Date.now() + 10000 , "data":data.mtasksList }) ; return data.mtasksList
       }
       }
       catch (e) {
        //when request is successful but not good
           
    
       }
       }
       ).catch(error => {
        //failed result
            if (error.response.status == 401){
              var urlForm = geturlFormdata("user","refreshtoken",{},{})
               refreshTokens(urlForm.url)
               
    
            }
    
            else if (error.response.status == 500){
                 
                throw Error("url not ok")
            }
            else {
               
                throw Error("other than unauthorized and internal server")
            }
    
           //  
            //  
    
    
         });
         
         return k
        }

export const getTokens = async(url , user , pass ) =>{

  var formdata = new FormData();
   
  formdata.set("user", user)
  formdata.set("password",pass)

  var k = await axios( {method: 'post' , 
  url: url,
  data:formdata,
  headers: {
      'Content-Type': `multipart/form-data`
  },}
  )
  .then(response  => {
      
   try {
   //when request is successful check if data can be serialized
   console.log(response.data.access_token)

   localStorage.setItem("access_token",response.data.access_token )
   localStorage.setItem("at_expiresin",response.data.at_expiresin )
   localStorage.setItem("refresh_token",response.data.refresh_token )
   localStorage.setItem("rt_expiresin",response.data.rt_expiresin )
  
   

   }
   catch (e) {

  //  / console.log("wrong username or password");
    //when request is successful but not good
       
  }
}
   ).catch(error => {
    //failed result
    console.log("wrong username or password");
          

         return error.response
     });
      
     return k
}

export const getTokenswithIdToken = async(url , idToken ,formdata ) =>{



  var k = await axios( {method: 'post' , 
  url: url,
  data:formdata,
  headers: {
      'Content-Type': `multipart/form-data`
  },}
  )
  .then(response  => {
      
   try {
   //when request is successful check if data can be serialized
   

   return response
   }
   catch (e) {
    //when request is successful but not good
       
  }
}
   ).catch(error => {
    //failed result
          
          

         return error.response
     });
      
     return k
}


export const postsignup = async(url , formdata ) =>{


  var k = await axios( {method: 'post' , 
  url: url,
  data:formdata,
  headers: {
      'Content-Type': `multipart/form-data`
  },}
  )
  .then(response  => {
      
   try {
   //when request is successful check if data can be serialized
   console.log(response.data.access_token)

   localStorage.setItem("access_token",response.data.access_token )
   localStorage.setItem("at_expiresin",response.data.at_expiresin )
   localStorage.setItem("refresh_token",response.data.refresh_token )
   localStorage.setItem("rt_expiresin",response.data.rt_expiresin )
  

   }
   catch (e) {
    //when request is successful but not good
       
  }
}
   ).catch(error => {
    //failed result
          
          

         return error.response
     });
      
     return k
}

export const refreshTokens = async(url ) =>{

  var formdata = new FormData();
   
  formdata.set("refreshToken", localStorage.getItem("refresh_token"))
  console.log(localStorage.getItem("access_token"))
  console.log(localStorage.getItem("refresh_token"))

  var k = await axios( {method: 'post' , 
  url: url,
  data:formdata,
  headers: {
      'Content-Type': `multipart/form-data`
  },}
  )
  .then(response  => {
      
   try {
   //when request is successful check if data can be serialized
   //console.log(response.data.access_token)

   localStorage.setItem("access_token",response.data.access_token )
   localStorage.setItem("at_expiresin",response.data.at_expiresin )
   
   }
   catch (e) {
    //when request is successful but not good
       
  }
}
   ).catch(error => {
    //failed result
          
         return error
     });
     
     return k
}


//post task / services  
//update task /services 

//create user (worker / customer)
//create update ^^

// actions
/**
 * 
 * bid on a particular job
 * negotiate 
 * accept a job 
 * complete a task 
 * create a delay 
 * bid a price 
 * 
 * 
 */


/** here we have all te types of the url we will receive */
/***
 * 
 * get tasks with ids -> /task/get?taskid=<arr>
 * get tasks with other parameters  -> /task/get?place=<arr>&lat=<double_precision>&lon=<double_precision>&distance=<double_precision>&tags=<arr>&category=<arr>&price=<doouble_precision>
 * create tasks -> /task/create
 * update tasks -> /task/updatetype=<string>&taskid=<arr>&task_status=<string>&tags=<arr>
 * 
 * get services with parameters -> /service/get?place=<arr>&lat=<double_precision>&lon=<double_precision>&distance=<double_precision>&tags=<arr>&category=<arr>&price=<doouble_precision>
 * create service -> /service/create 
 * update service -> /service/update?updatetype=<string>&serviceid=<arr>&tags=<arr>&category=<arr>
 * delete service -> /service/delete?serviceid=<string>
 * 
 * 
 * 
 */
 