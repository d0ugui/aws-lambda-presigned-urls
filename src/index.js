import crypto from "node:crypto";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { response } from './utils/response.js';

export async function handler(event) {
  const { filename } = JSON.parse(event.body);

  if (!filename) {
    return response(400, {
      error: "Filename is required"
    })
  }

  const s3Client = new S3Client({
    // You need declare the region of your S3 bucket
    // if your lambda function is running in a different region
    // region: 'us-east-2'
  });

  // Your lambda need permission (role/s3/pubObject)
  // to store the file on the bucket
  const command = new PutObjectCommand({
    Bucket: 'YOUR_BUCKET_NAME',
    Key: `uploads/${crypto.randomUUID()}-${filename}`,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 120 });

  return response(200, { url });
}