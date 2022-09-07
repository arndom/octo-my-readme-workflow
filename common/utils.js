// const {spawn} = require('child_process');
const core = require('@actions/core');
const axios = require('axios');
const fs = require('fs');

/**
 * @param {import('axios').AxiosRequestConfig['data']} data
 * @param {import('axios').AxiosRequestConfig['headers']} headers
 */
  const request = (data, headers) => {
    //@ts-ignore
    return axios({
      url: "https://api.github.com/graphql",
      method: "post",
      headers,
      data,
    });
  }

  const languagesSupported = {
    "c": "c",
    "cpp": "cpp",
    "csharp": "csharp",
    "css": "css",
    "go-old": "go-old",
    "go": "go",
    "haskell": "haskell",
    "html": "html",
    "java": "java",
    "javascript": "javascript",
    "kotlin": "kotlin",
    "lua": "lua",
    "php": "php",
    "python": "python",
    "r": "r",
    "ruby": "ruby",
    "swift": "swift",
    "typescript": "typescript"
  }
  
  // function to encode file data to base64 encoded string
  const base64_encode = (file) => {
    // read binary data
    let bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
  }

  // function to create file from base64 encoded string
  const base64_decode = (base64str, file) => {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    let bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
  }

  module.exports = {
      request,
      languagesSupported,
      base64_decode,
      base64_encode
  }
