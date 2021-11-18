const core = require('@actions/core')
const github = require('@actions/github')
// const fs = require('fs');
// const child_process =  require('child_process')
const { Octokit } = require('@octokit/core')
const octokit = new Octokit({ auth: core.getInput('gh_token') });

(async () => {

  try {
    // `who-to-greet` input defined in action metadata file
    
    const userName = core.getInput('user');
    const language = core.getInput('language_frequent')

    console.log(`Hello ${userName}! your most used language in your repos is ${language}`);

    const markdown = `${userName}'s' most used language is ${language}`

    // console.log(octokit)

    const username = process.env.GITHUB_REPOSITORY.split("/")[0]
    const repo = process.env.GITHUB_REPOSITORY.split("/")[1]

    console.log(username,  " <- user !!! repo->",repo)

    const getReadme = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: username,
      repo: repo,
      path: core.getInput('readme_path'),
    }).then( res => {
      // console.log(res.data)
      return res.data
    }     
    ).catch(e => {
      console.error("Failed: ", e)
      core.setFailed("Failed: ", e.message)
    })

    console.log(getReadme)


    // const sha = getReadme[0].sha

    // console.log(sha)


    // await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    //   owner: username,
    //   repo: repo,
    //   path: core.getInput('readme_path'),
    //   message: '(Automated) Update README.md',
    //   content: Buffer.from(markdown, "utf8").toString('base64'),
    //   sha: sha,
    // }).then(() => {
    //   core.setOutput("result", (markdown))
    // }).catch((e) => {
    //   console.error("Failed: ", e)
    //   core.setFailed("Failed: ", e.message)
    // })




    // // Readme path, default: ./README.md
    // const README_FILE_PATH = core.getInput('readme_path')

    // const readmeData = fs.readFileSync(README_FILE_PATH, 'utf8');
    // const newReadme = buildReadme(readmeData, markdown);

    // // if there's change in readme file update it
    // if (newReadme !== readmeData) {
    //   core.info('Writing to ' + README_FILE_PATH);
    //   fs.writeFileSync(README_FILE_PATH, newReadme);
    // }

  } catch (error) {
    core.setFailed(error.message);
  }

})()