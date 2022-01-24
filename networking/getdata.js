import axios from 'axios';
import  { useRouter } from 'next/router';
import React from 'react';
import {Tasks} from '../build/gen/user_pb';
import { cache } from '../cache';
import { AuthContext } from '../context';

//var messages = require('user_pb.js');

// getdata(url) >> 





export const getdata = async(url, obj, options) => {
  
   var k = await axios.get(url
    ,{responseType:"arraybuffer",
      headers: { 'Authorization' : localStorage.getItem("access_token")}
    }
    ).then(response  => {
  
   console.log(response.data);
   try {
   //when request is successful check if data can be serialized
   switch ( obj){
      case "tasks":
        var data = proto.user.Tasks.toObject(false,proto.user.Tasks.deserializeBinary(response.data)); cache.set(url , {"expire": Date.now() + 10000 , "data":data.mtasksList }) ; return data.mtasksList
      case "services":
        var data = proto.user.Services.toObject(false,proto.user.Services.deserializeBinary(response.data));cache.set(url , {"expire": Date.now() + 10000 , "data":data.mservicesList }) ; return data.mservicesList
      case "delays":
        var data = proto.user.Delays.toObject(false,proto.user.Delays.deserializeBinary(response.data)); cache.set(url , {"expire": Date.now() + 10000 , "data":data.mdelaysList }) ;return data.mdelaysList
      case "works":
        var data = proto.user.Works.toObject(false,proto.user.Works.deserializeBinary(response.data));cache.set(url , {"expire": Date.now() + 10000 , "data":data.mworksList }) ; return data.mworksList
      case "customers":
        var data = proto.user.Customers.toObject(false,proto.user.Customers.deserializeBinary(response.data)); cache.set(url , {"expire": Date.now() + 10000 , "data":data.mcustomersList }) ;return data.mcustomersList
      case "workers":
        var data = proto.user.Workers.toObject(false,proto.user.Workers.deserializeBinary(response.data)); cache.set(url , {"expire": Date.now() + 10000 , "data":data.mworkersList }) ; return data.mworkersList
      case "bids":
          var data = proto.user.Bids.toObject(false,proto.user.Bids.deserializeBinary(response.data));cache.set(url , {"expire": Date.now() + 10000 , "data":data.mbidsList }) ; return data.mbidsList
      case "address":
          var data = proto.user.Addresses.toObject(false,proto.user.Addresses.deserializeBinary(response.data)); console.log(data);cache.set(url , {"expire": Date.now() + 10000 , "data":data.maddressesList }) ; return data.maddressesList 
      case "items":
            var data = proto.user.Items.toObject(false,proto.user.Items.deserializeBinary(response.data)); console.log(data);cache.set(url , {"expire": Date.now() + 10000 , "data":data.mitemsList }) ; return data.mitemsList 
      default:
        var data = proto.user.Tasks.toObject(false,proto.user.Tasks.deserializeBinary(response.data)); cache.set(url , {"expire": Date.now() + 10000 , "data":data.mtasksList }) ; return data.mtasksList
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

           refreshTokens("http://localhost:9082/user/refreshtoken")
           

        }

        else if (error.response.status == 500){
            console.log("bad error");
            throw Error("url not ok")
        }
        else {
          console.log("dont know error");
            throw Error("other than unauthorized and internal server")
        }

       // console.log(error.response.config.url);
        // console.log("error in axios");


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
     console.log(response);
   try {
   //when request is successful check if data can be serialized
   console.log(response.data.access_token)

   localStorage.setItem("access_token",response.data.access_token )
   localStorage.setItem("refresh_token",response.data.refresh_token )

  
   

   }
   catch (e) {
    //when request is successful but not good
      console.log(e);
  }
}
   ).catch(error => {
    //failed result
         console.log(error.response.status);
         console.log(error);

         return error.response
     });
     console.log(k);
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
     console.log(response);
   try {
   //when request is successful check if data can be serialized
   console.log(response.data.access_token)

   localStorage.setItem("access_token",response.data.access_token )
   localStorage.setItem("refresh_token",response.data.refresh_token )

   }
   catch (e) {
    //when request is successful but not good
      console.log(e);
  }
}
   ).catch(error => {
    //failed result
         console.log(error.response.status);
         console.log(error);

         return error.response
     });
     console.log(k);
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
     console.log(response);
   try {
   //when request is successful check if data can be serialized
   //console.log(response.data.access_token)

   localStorage.setItem("access_token",response.data.access_token )
   localStorage.setItem("refresh_token",response.data.refresh_token )
   
   }
   catch (e) {
    //when request is successful but not good
      console.log(e);
  }
}
   ).catch(error => {
    //failed result
         console.log("error in axios");
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
 