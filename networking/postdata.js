import axios from 'axios';
import { geturlFormdata } from '../constants';
import { refreshTokens } from './getdata';

export const postdata = async(url , object , formdata , options ) => {


    var k = await axios( {method: 'post' , 
    url: url,
    data:formdata,
    headers: {
        'Content-Type': `multipart/form-data`,
       'Authorization' : localStorage.getItem("access_token")
    },}
    )
    .then(response  => {
       console.log(response);
     try {
     //when request is successful check if data can be serialized
     
     }
     catch (e) {
      //when request is successful but not good
        console.log(e);
    }
}
     ).catch(error => {
      //failed result
      //failed result
      if (error.response.status == 401){
        var urlForm = geturlFormdata("user","refreshtoken")
       refreshTokens(urlForm.url)
        throw Error(401)
        
        

     }

     else if (error.response.status == 500){
         console.log("bad error");
         throw Error("url not ok")
     }
     else {
       console.log("dont know error");
         throw Error("other than unauthorized and internal server")
     }

         
       });
       
       return k
  }
  

export const bidtask  = async(url  ) =>{

}


export const creatework = () => {
  
}