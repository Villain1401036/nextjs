

//here we can define all the things that we can keep in the cache database and remove it after some time

// place
// tags
// category
// 
// 
// 


import { cache } from "./cache";
export const siterooturl = 'http://www.smorentel.com/';
export const s3rooturl = 'https://cdn.smorentel.com'
export const convertToJson = (jsondata) => {
  var data =  JSON.parse(Buffer.from(jsondata ,'base64').toString('utf8') )
  return data 
}
const taskonPage = {}

const workonPage = {}

const itemonPage = {}

export const pushtask = (data) =>{
      taskonPage = data
}

export const pushwork = (data) =>{
  workonPage = data
}

export const pushitem = (data) =>{
  itemonPage = data
}


export const gettaskonpage = (data) =>{
 return taskonPage
}

export const getworkonpage = (data) =>{
  return workonPage
 }

 export const getitemonpage = (data) =>{
  return itemonPage
 }

export const cachexpire = (key) =>{

  var value = cache.get(key)
   
  if  (value != undefined){
        if  ( value.expire > Date.now()){
           return value.data
        }else{
           cache.del(key)
           return undefined
        }
  }
  return undefined

}


export const callwithcache = async (func, url ,obj) =>{

  try {
    var data = cachexpire(url)
     
    if (data != undefined ){
      return data
    }
     
    data = func(url, obj )
    return data
  }
  catch (e) {
       
  }
}

export const getfromLS = ( key) =>{
  if(typeof window != 'undefined'){
    var k = localStorage.getItem(key)
    return k
  }
   return 
}


// export const postwitherror = async (func, url ,obj, formdata) =>{

//   try {
    
//    var k = await func(url,obj, formdata)

//    if (k == 401){
//      postwitherror(func, url ,obj, formdata)

//    }
    
//      
    
//   }
//   catch (e) {
      
//        
//   }
// }


export const postwitherror = async (func, url ,obj, formdata) =>{

  try {
    
   func(url,obj, formdata).then((res) => {
    //  if(res == 401){
    //   postwitherror(func, url ,obj, formdata)
    //  }
   })

     
    
  }
  catch (e) {
      
       
  }
}


export const setValuesfrommap = (val,func, updatefunc , taskmap , mapkey ) =>{

  try{
     var plist =  maping(val , taskmap , mapkey ); updatefunc(plist);
  }
  catch(e){
     
    func()
     }
   } 


export const setValue = (val,func, updatefunc  ) =>{
     
    try{
        if (val == undefined) {
          throw Error("nothing fetched")
        }
        updatefunc(val);
    }
    catch(e){
       
      func()
       }
     }


const maping =(list ,  taskmap , key ) =>{

 
    list.forEach(element => { taskmap.set( element[key] , element)});

    var plist = []
    
    taskmap.forEach( (value) => { plist.push(value) } )
    
    return plist
    
  }

export const Shopname =  "Freebees";

export var lastupdated 



export var user = {"name":"rahul","acctype":true}

export var ongoingwork = "64bokar7~64bokar7s~64bokar7sxzc";

export var latestworkobj = {"place":"bokaro" , "lat": "12" , "lon":"143" , "distance": 20 , "tags": "b~sf~asdas" , "category" : "a" , "price" : "0~10000" }

//getting the type of endpoint at one point
export const geturlFormdata = (data , reqtype , queryoptions , formdataoptions ) =>{

    var rooturl = "http://api.smorentel.com/"
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

// const createtask = geturlFormdata("task" , "create" ,{}, formdata  )

// //after the data is been stored in the latest datasets for the workers 
// const gettasksall = geturlFormdata("task" , "get" , {"distance":distance , "lat":lat , "lon":lon , "place":place , "category":category , "tags":tags }   )
 
// //all the task that is created by a particular customer is here 
// const gettaskscustomer = geturlFormdata("task" , "get" , {"customer_id":customer_id} , {})

// const createbid = geturlFormdata("bid" , "create" , {} , formdata )

// //when bid is accepted then ask confirmation -> create work 
// //when take work happens inform to take work 
// const acceptbid = geturlFormdata("work" , "create" , {} , formdata )
// const taketask = geturlFormdata("work" , "create" , {} , formdata )

// //after work has been created

// const getworksworker = geturlFormdata("work", "get" ,{"worker_key":worker_key} , {}) //all work for that particular worker

// const getworksids = geturlFormdata("work", "get" ,{"workids":workids} , {})// getting the work using ids

// const updateworkstatus = geturlFormdata("work", "update" ,  { "updatetype":updatetype  } , { "work_status":work_status , "workid":workid } )

// const updatetaskstatus = geturlFormdata("task", "update" ,  { "updatetype":updatetype  } , {  "task_status":task_status , "taskid":taskid })

// const updatetasktags = geturlFormdata("task", "update" , { "updatetype":updatetype  } , {  "taskid":taskid  , "tags":tags } ) //updating the tags of the task

// const deletetask =  geturlFormdata("task", "delete", {"task_id":task_id } , {} )

// const createitem =  geturlFormdata("item", "create", {} , { 'customer_key' : customer_key, 'description' : description, 'price' : price, 'deno' : deno, 'negotiable' : negotiable, 'metadata' : metadata, 'tags' : tags} )

// const getitemstcp = geturlFormdata("item", "create" ,{ "gettype": gettype ,"tags": tags , "category":category , "place" : place } , {} )

// const updateitemtags = geturlFormdata("item" , "update" , {"updatetype" : updatetype } , {"item_id" : item_id , "tags":tags }) //update tags 
 
// const deleteitem = geturlFormdata("item", "delete", {"item_key":item_key } , {} )





export const workstatus_dict = {1 : "progress" , 2:"created" , 3:"done"}




export const onRefresh = (authContext) =>{
    if ( typeof window !== "undefined" ){ 
         
      }
  
      if ( typeof window !== "undefined" ){ 
          if (localStorage.getItem("refresh_token") != undefined){
                  authContext.login()
          }
        }
} 