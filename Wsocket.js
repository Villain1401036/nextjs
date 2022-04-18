//this module is for creating a websocket based connection  



import { Buffer } from "buffer";



export default class Wsocket {
    url
    conn;
    receiveMethod;


    constructor( url, onrecieve){
      this.url = url;
      this.receiveMethod = onrecieve
    }

    connect = (protocols , options )=>{

      this.conn  = new WebSocket(this.url ,protocols ,options )
       this.conn.binaryType = 'arraybuffer';
      
        console.log(this.conn);

       this.conn.onmessage = (msg  ) => {
        // a message was received act on the message 
        //this.receiveMethod(e.data)
        //console.log(e.data);

        console.log(msg);
        var msgstr = Buffer.from(msg.data ).toString()
        this.receiveMethod(msgstr)
        console.log(
         msgstr
        );

      };
    
} 


      send = (data) =>{
     this.conn.send(`2 ${data}`)
  }

  close = ()=>{
    this.conn.close()
  }
}
//data for search 

// var searchitems = new Wsocket("ws://127.0.0.1:8000/" )
// searchitems.connect()

// searchitems.send("clothes with gear etc") //will send a message there 



