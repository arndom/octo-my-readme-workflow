const core = require('@actions/core')
const github = require('@actions/github')

try {
    // `who-to-greet` input defined in action metadata file
    
    const userName = core.getInput('who-to-greet');
    const time = (new Date()).toTimeString();
    
    console.log(`Hello ${userName}!`);

    console.log(`This was run at ${time}`)

  } catch (error) {
    core.setFailed(error.message);
  }