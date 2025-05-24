import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { response } from './utils/response.js';

export async function handler(event) {
  // Check user auth
  // Check user role

  const { filename } = JSON.parse(event.body);

  if (!filename) {
    return response(400, {
      error: "Filename is required"
    })
  }

  const s3Client = new S3Client();
  
  const command = new GetObjectCommand({
    Bucket: 'YOUR_BUCKET_NAME',
    Key: `uploads/${filename}`,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 120 });

  return response(200, { url });
}