import { GetObjectCommand, PutObjectCommand, S3, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
const S3MANGROW_ID = import.meta.env.VITE_S3MANGROW_ID 
const S3MANGROW_KEY = import.meta.env.VITE_S3MANGROW_KEY 

const s3Client = new S3Client({
    region:'eu-north-1',
    credentials:{
        accessKeyId:S3MANGROW_ID,
        secretAccessKey:S3MANGROW_KEY
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


async function putObject(fileName:string){
    const ContentType:any = s3Client
    const command = new PutObjectCommand({
        Bucket:'mangrow',
        Key:fileName,
        ContentType:ContentType
    }) 
    const url = await getSignedUrl(s3Client,command)
    return url
}

export {putObject,getObjectUrl} 
