# aws-lambda-presigned-urls

This is a simple AWS Lambda function that generates a presigned URL for a file uploaded to S3.

## Installation

> [!IMPORTANT]
> You should create a S3 bucket and configure the bucket policy to allow the lambda function to access (write/policy) the bucket.
> You need define the bucket name in the `src/index.js` file in line 24.

### Running code in lambda

```sh
You only need copy the `src/index` file content to your lambda handler function
```
