import constants from "./constants/index.js";
import 'dotenv/config'
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/** CONTROLLER HELPER */
export const onSucess = (res,data) => res.json({status: constants.success,data});
export const onError = (res,error, command) => res.json({status: `${command} ${command===constants.upload ? constants.upload_failure:constants.onFailure}`, error});

/** SERVICE HELPERS */
const client = new S3Client({ region: process.env.AWS_REGION,
    credentials:{
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET
    } });

const bucketName = process.env.S3_BUCKET_NAME;

export const uploadImage = async (file, filename)=>{
    const params = {
        Bucket: bucketName,
        Key: filename,
        Body: file.buffer,
        ContentType: file.mimetype
      };
      const command = new PutObjectCommand(params);
      try {
          await client.send(command);
          const url = await getUrl(filename);
          return url;
        
      } catch (error) {
        console.log("Problem uploading to S3 bucket:", error);
        return;
      }
}

export const getUrl = async (fileName)=>{
    const getObjectParams = {
        Bucket: bucketName,
        Key: fileName
    }

    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(client, command, { expiresIn: 3600 *24 });
    return url;
}