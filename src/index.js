import crypto from "node:crypto";
import parser from "lambda-multipart-parser";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import { response } from './utils/response.js';

export async function handler(event) {
  const { files } = await parser.parse(event);

  const [file] = files

  if (!file || file.fieldname !== "file") {
    return response(400, {
      error: "File is required"
    })
  }

  if (file.contentType !== "image/png") {
    return response(400, {
      error: "Only png files are accepted."
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
    Key: `uploads/${crypto.randomUUID()}-${file.filename}`,
    Body: file.content
  });

  await s3Client.send(command);

  return {
    statusCode: 204,
    body: null
  };
}