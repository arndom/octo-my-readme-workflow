const {spawn} = require('child_process');
const core = require('@actions/core');


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


  module.exports = {
      buildReadme
  }