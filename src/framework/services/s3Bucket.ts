import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3Client = new S3Client({
    region:'eu-north-1',
    credentials:{
        accessKeyId:'AKIA6GBMGESHQAUCIEPR',
        secretAccessKey:'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'
    }
})

async function getObjectUrl(key:string){
    const command = new GetObjectCommand({  
        Bucket:'mangrow',
        Key:key
    })
    const url =await getSignedUrl(s3Client,command)
    return url ; 

}


async function putObject(fileName:string,contentType:string){
    const command = new PutObjectCommand({
        Bucket:'mangrow',
        Key:`/mangrow/${fileName}`,
        ContentType:contentType
    }) 
    const url = await getSignedUrl(s3Client,command)
    return url
}

console.log('first')
async function init (){
    const result = await getObjectUrl('/mangrow/image1719406310844.jpeg') 
    console.log(result,'result')
   // const putresult = await putObject(`image${Date.now()}.jpeg`,'image/jpeg') 
   // console.log(putresult)
} 
init()