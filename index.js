const core = require('@actions/core')
const github = require('@actions/github')

try {
    // `who-to-greet` input defined in action metadata file
    
    const userName = core.getInput('user');
    const time = (new Date()).toTimeString();
    console.log(`Hello ${userName}! This was run at ${time}`);

  } catch (error) {
    core.setFailed(error.message);
  }