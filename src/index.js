import parser from "lambda-multipart-parser";

import { response } from './utils/response.js';

export async function handler(event) {
  const { files: [file] } = await parser.parse(event);

  if (!file) {
    return response(400, {
      error: "File is required"
    })
  }

  return response(200, {})
}