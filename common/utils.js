// const {spawn} = require('child_process');
const core = require('@actions/core');
const axios = require('axios');
const fs = require('fs');


/**
 * Builds the new readme by replacing the readme's <!-- BLOG-POST-LIST:START --><!-- BLOG-POST-LIST:END --> tags
 * @param previousContent {string} actual readme content
 * @param newContent {string} content to add
 * @return {string}: content after combining previousContent and newContent
 */
 const buildReadme = (previousContent, newContent) => {
    const tagToLookFor =  `<!-- OCTO-README-HERE:`;
    const closingTag = '-->';

    const tagNewlineFlag = core.getInput('tag_post_pre_newline') === 'true';

    const startOfOpeningTagIndex = previousContent.indexOf(
      `${tagToLookFor}START`,
    );
    const endOfOpeningTagIndex = previousContent.indexOf(
      closingTag,
      startOfOpeningTagIndex,
    );
    const startOfClosingTagIndex = previousContent.indexOf(
      `${tagToLookFor}END`,
      endOfOpeningTagIndex,
    );

    if (
      startOfOpeningTagIndex === -1 ||
      endOfOpeningTagIndex === -1 ||
      startOfClosingTagIndex === -1
    ) {
      // Exit with error if comment is not found on the readme
      core.error(
        `Cannot find the comment tag on the readme:\n${tagToLookFor}START -->\n${tagToLookFor}END -->`
      );
      process.exit(1);
    }
    return [
      previousContent.slice(0, endOfOpeningTagIndex + closingTag.length),
      tagNewlineFlag ? '\n' : '',
      newContent,
      tagNewlineFlag ? '\n' : '',
      previousContent.slice(startOfClosingTagIndex),
    ].join('');
  };


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
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
  }

  // function to create file from base64 encoded string
  const base64_decode = (base64str, file) => {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
  }

  module.exports = {
      buildReadme,
      request,
      languagesSupported,
      base64_decode,
      base64_encode
  }