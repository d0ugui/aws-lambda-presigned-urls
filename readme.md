# aws-lambda-presigned-urls

This is a simple AWS Lambda function that generates a presigned URL for a file uploaded to S3.

## Installation

> [!IMPORTANT]
> Be shure to follow the instructions bellow in the correct order.

#### Create S3 Bucket

```sh
Create a S3 bucket
Define the bucket name in the `src/index.js` file in line 24
```

#### Create lambda function

```sh
Create a lambda function
Zip this repository and upload it to your lambda function
```

#### Runtime settings

```sh
Update the handler path to `aws-lambda-presigned-urls/src/index.handler`
```

#### Generating URL

```sh
Make a POST request to your function url with the following body:

{
  "filename": "test.png"
}

The response will be a JSON object with the presigned URL
```

#### Policy & Upload file

```sh
Add S3 PutObject policy to your lambda function
Make a PUT request to URL generated in the previous with the file
```

## Extra

> [!IMPORTANT]
> There is an example of how to access the uploaded file using getPresignedUrl in the `src/getPresigned.js` file.
