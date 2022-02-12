import { geturlFormdata } from './constants';
import { getdata } from './networking/getdata';

export  const handleEnterKeyPress =(e , setValues ,values , value, emptyelement) => {

    var key=e.keyCode || e.which;
     if (key==13){
       
      values.add(value)
       console.log(values);
       
       var s = ""
       values.forEach( (item) =>  {s = s + "~" + item})
       setValues(s.slice(1))

        console.log("asdaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        document.getElementById(emptyelement).value = ""
     }
   }


   export  const getQrCode = async (Id ,gettype , booking_id) =>{
     
    var QRCode = require('qrcode')
    var data = null
    await getdata(geturlFormdata("confirmcode","get", {"gettype":gettype,"booking_key":booking_id} ).url , "confirmcodes").then((val)=>{ data = val[0].confirmCode ;console.log(val[0].confirmCode)})
    
    QRCode.toCanvas(data, { errorCorrectionLevel: 'H' }, function (err, canvas) {
      if (err) throw err
    
      var container = document.getElementById(Id)
      
        container.replaceChildren(canvas)
    
    })
  }

