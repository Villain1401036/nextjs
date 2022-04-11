import S3 from 'aws-sdk/clients/s3';



const credentials =  { accessKeyId: 'fd751f6a7a834ab0be2fe1cd96542ed6', secretAccessKey: 'c3602378d1f030e0088f0864497246c5' }




// import crypto from 'crypto'; 

// var  res =   authsign()

// 

// var aws4 = require('aws4');
// var opts = { host: 'sin1.contabostorage.com', path: '/images', service: 's3', region: 'us-east-1' }

// aws4.sign(opts, { accessKeyId: 'fd751f6a7a834ab0be2fe1cd96542ed6', secretAccessKey: 'c3602378d1f030e0088f0864497246c5' })

//  

// var s3  = new S3({
//     accessKeyId: 'HASV99S405QAUUT9I0RG' ,
//     secretAccessKey: 'KLNjeHUSvSOvL2jh4C0CmGM7J1k6aNDMXAaRxqVf' ,
//     endpoint: 'https://ap-south-1.linodeobjects.com' ,
//    // s3ForcePathStyle: true, // needed with minio?
//      signatureVersion: 'v4'
// });

// var s3  = new S3({
//     accessKeyId: 'fd751f6a7a834ab0be2fe1cd96542ed6' ,
//     secretAccessKey: 'c3602378d1f030e0088f0864497246c5' ,
//     endpoint: 'https://sin1.contabostorage.com' ,
  
//    s3ForcePathStyle: true, // needed with minio?
//      signatureVersion: 'v4',
     
// });

var s3  = new S3({
  accessKeyId: '004eb60c4d22ef70000000006' ,
  secretAccessKey: 'K004mlzvJiKQKFD+RRtc8ftYSBXCT+c' ,
  endpoint: 'https://s3.us-west-004.backblazeb2.com' ,
 // s3ForcePathStyle: true, // needed with minio?
  signatureVersion: 'v4',
  
});





// putObject operation.
// export async function getServerSideProps() {
//   // Fetch data from external API
//   const fs = require('fs')
//   const crypto = require('crypto')
//    
//   // Pass data to the page via props
//   return { props: { data } }
// }


export const uploadFile = async (remoteFilename, fileName) => {
  var fileBuffer = await fs.readFile(file.uri, 'base64')
    const buffer = Buffer.from(base64, 'base64')
 
  var metaData = getContentTypeByFile(fileName);
 

 

   s3.putObject({
   ACL: 'public-read-write',
   //Bucket: "images",
   Key: remoteFilename,
   Body: fileBuffer,
   ContentType: metaData,
   
   
  }, function(error, response) {
    
    
  });
 }

 

 var paramscors = {
  Bucket: "images-prod-a", 
  CORSConfiguration: {
   CORSRules: [
      {
     AllowedHeaders: [
        "*"
     ], 
     AllowedMethods: [
      "PUT","GET","POST","DELETE"
        
     ], 
     AllowedOrigins: [
        "*"
     ], 
     ExposeHeaders: [
        "x-amz-server-side-encryption",
        "ETag"

     ], 
     MaxAgeSeconds: 3000
    }
   ]
  }, 
  ContentMD5: ""
 };


 s3.putBucketCors(paramscors, function(err, data) {
   if (err) console.log(err)  // an error occurred
   else  console.log(data);               // successful response
 });




// import aws4 from 'aws4';
export function put(files){

  mediaarr = []
  var promises=[];
  for(var i=0;i<files.length;i++){
      var file = files[i];
     promises.push(uploadLoadToS3(file,"images-prod-a"));
    
  }
  Promise.all(promises).then(function(data){
     
     
    return mediaarr
}).catch(function(err){
   
})
     

}

export function putverify(files){
  mediaarr = []
  var promises=[];
  for(var i=0;i<files.length;i++){
      var file = files[i];
      promises.push(uploadLoadToS3(file,'verificationdata'));
  }
  Promise.all(promises).then(function(data){
     
    return mediaarr
}).catch(function(err){
   
})
     

}


function uploadLoadToS3(file,bucket){

  var filename = createrandomfilename(file.name)
  var params = { Bucket: bucket, Key: filename ,ContentType: file.type , Body:file , headers:{"Access-Control-Allow-Origin":"http://localhost:3000","Access-Control-Allow-Methods":["OPTIONS","GET","PUT" ]}};
  
  s3.upload(params,(err,data)=>{
    if (err) throw err;
     
  }).on('httpUploadProgress', function(evt) {
    var uploaded = Math.round(evt.loaded / evt.total * 100);
     
}).send(function(err, data) {
    if (err){
        // an error occurred, handle the error
         
        return;
    }
}
)
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



