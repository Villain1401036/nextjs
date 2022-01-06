import { rootShouldForwardProp } from "@mui/material/styles/styled";


export const Shopname =  "Freebees";

export var lastupdated 



export var user = {"name":"rahul","acctype":true}

export var ongoingwork = "64bokar7~64bokar7s~64bokar7sxzc";

export var latestworkobj = {"place":"bokaro" , "lat": "12" , "lon":"143" , "distance": "20" , "tags": "b" , "category" : "a" , "price" : "0~10000" }

//getting the type of endpoint at one point
export const geturlFormdata = (data , reqtype , queryoptions , formdataoptions ) =>{

    var rooturl = "http://localhost:9082/"
    var allurl =  rooturl + `${data}/${reqtype}?`

    var queryparam = new String();
   
    for (const property in queryoptions) {
    queryparam += `${property}=${queryoptions[property]}&`
  }

    var formdata = new FormData();
    for (const formproperty in formdataoptions) {
         formdata.set(formproperty, formdataoptions[formproperty])
      }


    return  { "url" : allurl + queryparam.slice(0,queryparam.length-1) , "formdata": formdata }

}

