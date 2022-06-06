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
         return response
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
          //something went wrong
         throw Error("url not ok")
     }
     else {
         //something went wrong
         throw Error("other than unauthorized and internal server")
     }

         
       });
       
       return k
  }
  

export const bidtask  = async(url  ) =>{

}


export const creatework = () => {
  
}