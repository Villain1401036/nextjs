

export const storeobjlocal = (key , value) =>{
      localStorage.setItem(key, JSON.stringify(value));
}

export const getobjlocal = (key) =>{

     return JSON.parse(localStorage.getItem(key))

}

const localkeys = {
    "access_token" : "",
    "refresh_token" : "",
    "user":{ "customer" : customerObj , "worker" : workerObj  },
    "settings" : settingsObj, 
    
}
export const stateobj = {

      "user" :{
        
      }
}

