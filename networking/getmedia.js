import S3 from 'aws-sdk/clients/s3';
import { readFile } from 'fs';



var s3  = new S3({
    accessKeyId: '4UHOY8T981J4LB0AL016' ,
    secretAccessKey: '3SzuSKGtkgDD8gRlGjB0u3yttKPy0YE3yVxq6XHI' ,
    endpoint: 'http://127.0.0.1:9000' ,
    s3ForcePathStyle: true, // needed with minio?
    signatureVersion: 'v4'
});

// putObject operation.
export async function getServerSideProps() {
  // Fetch data from external API
  const fs = require('fs')
  // Pass data to the page via props
  return { props: { data } }
}


export const uploadFile = async (remoteFilename, fileName) => {
  var fileBuffer = await fs.readFile(file.uri, 'base64')
    const buffer = Buffer.from(base64, 'base64')
 
  var metaData = getContentTypeByFile(fileName);
 
   s3.putObject({
   ACL: 'public-read',
   Bucket: "spuk",
   Key: remoteFilename,
   Body: fileBuffer,
   ContentType: metaData
  }, function(error, response) {
   console.log('uploaded file[' + fileName + '] to [' + remoteFilename + '] as [' + metaData + ']');
   console.log(response);
  });
 }



//  app.post('/uploadMultipleFiles',upload.array('file', 10),function(req,res){
//   var promises=[];
//   for(var i=0;i<req.files.length;i++){
//       var file = req.files[i];
//       promises.push(uploadLoadToS3(file));
//   }
//   Promise.all(promises).then(function(data){
//       res.send('Uploadedd');
//   }).catch(function(err){
//       res.send(err.stack);
//   }) 
// })

export function put(files){
  mediaarr = []
  var promises=[];
  for(var i=0;i<files.length;i++){
      var file = files[i];
      promises.push(uploadLoadToS3(file));
  }
  Promise.all(promises).then(function(data){
    console.log('Uploadedd');
    return mediaarr
}).catch(function(err){
  console.log(err.stack);
})
    console.log("--------------------------------put-------------------------------");

}


function uploadLoadToS3(file){

  var filename = createrandomfilename(file.name)
  var params = { Bucket: 'testbucket', Key: filename ,ContentType: file.type , Body:file};
  
  s3.upload(params,(err,data)=>{
    if (err) throw err;
    console.log(data);
  }).promise()
}

export const mediaarr = []
function createrandomfilename(filename){
  var name = Date.now().toString() + filename
  mediaarr.push(name)
  return  name
}


//when file is uploaded 
//add into database 

export function createimageurl(){

}











// getObject operation.

// var params = {Bucket: 'testbucket', Key: 'testobject'};

// var file = require('fs').createWriteStream('/tmp/mykey');

// s3.getObject(params).
// on('httpData', function(chunk) { file.write(chunk); }).
// on('httpDone', function() { file.end(); }).
// send();

//how will the link be created for a particular thing



