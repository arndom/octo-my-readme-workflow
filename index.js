const core = require('@actions/core')
const github = require('@actions/github')

try {
    // `who-to-greet` input defined in action metadata file
    
    const userName = core.getInput('who-to-greet');
    const time = (new Date()).toTimeString();
    console.log(`Hello ${userName}! This was run at ${time}`);

    const mostUsedLanguage = core.getInput('most-used-language');
    console.log(`your most used language is ${mostUsedLanguage}!`)

  } catch (error) {
    core.setFailed(error.message);
  }