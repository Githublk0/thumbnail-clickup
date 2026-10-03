import {S3Client,PutObjectCommand,GetObjectCommand,DeleteObjectCommand,HeadObjectCommand} from '@aws-sdk/client-s3';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';
import {config} from './config.js';
export class StorageUnavailable extends Error{constructor(){super('STORAGE_NOT_CONFIGURED');this.code=this.message;this.statusCode=503}}
function s3(){if(!config.STORAGE_ENDPOINT||!config.STORAGE_BUCKET||!config.STORAGE_ACCESS_KEY||!config.STORAGE_SECRET_KEY)throw new StorageUnavailable();return new S3Client({region:config.STORAGE_REGION,endpoint:config.STORAGE_ENDPOINT,forcePathStyle:config.STORAGE_FORCE_PATH_STYLE,credentials:{accessKeyId:config.STORAGE_ACCESS_KEY,secretAccessKey:config.STORAGE_SECRET_KEY}})}
export async function uploadObject(key,body,contentType){await s3().send(new PutObjectCommand({Bucket:config.STORAGE_BUCKET,Key:key,Body:body,ContentType:contentType,ServerSideEncryption:config.STORAGE_SERVER_SIDE_ENCRYPTION||undefined}));return {key}}
export async function deleteObject(key){await s3().send(new DeleteObjectCommand({Bucket:config.STORAGE_BUCKET,Key:key}))}
export async function signedDownloadUrl(key,expiresIn=300){return getSignedUrl(s3(),new GetObjectCommand({Bucket:config.STORAGE_BUCKET,Key:key}),{expiresIn})}
export async function storageHealth(){try{await s3().send(new HeadObjectCommand({Bucket:config.STORAGE_BUCKET,Key:'__healthcheck__'}));return 'READY'}catch(e){if(e.name==='NotFound'||e.$metadata?.httpStatusCode===404)return 'READY';return config.STORAGE_ENDPOINT?'ERROR':'NOT_CONFIGURED'}}
