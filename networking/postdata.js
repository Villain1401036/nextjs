import axios from 'axios';

export const postdata = async(url , object , formdata , options ) => {


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
     
     }
     catch (e) {
      //when request is successful but not good
        console.log(e);
    }
}
     ).catch(error => {
      //failed result
           console.log("error in axios");
       });
       return k
  }
  

export const bidtask  = async(url  ) =>{

}


export const creatework = () => {
  
}