const core = require('@actions/core')
const github = require('@actions/github')
const fs = require('fs');

try {
    // `who-to-greet` input defined in action metadata file
    
    const userName = core.getInput('user');
    const language = core.getInput('language_frequent')

    console.log(`Hello ${userName}! your most used language in your repos is ${language}`);

    const markdown = `${userName}'s' most used language is ${language}`

    // Readme path, default: ./README.md
    const README_FILE_PATH = core.getInput('readme_path')

    const readmeData = fs.readFileSync(README_FILE_PATH, 'utf8');
    const newReadme = buildReadme(readmeData, markdown);

    // if there's change in readme file update it
    if (newReadme !== readmeData) {
      core.info('Writing to ' + README_FILE_PATH);
      fs.writeFileSync(README_FILE_PATH, newReadme);
    }

  } catch (error) {
    core.setFailed(error.message);
  }