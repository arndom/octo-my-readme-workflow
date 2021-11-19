const core = require('@actions/core')
// const github = require('@actions/github')
// const fs = require('fs');
// const child_process =  require('child_process')
const { Octokit } = require('@octokit/core')
const octokit = new Octokit({ auth: core.getInput('gh_token') });
const fetchTopLanguages = require('./top-languages-fetcher')

(async () => {

  try {    
    const language = core.getInput('language_frequent')


    const username = process.env.GITHUB_REPOSITORY.split("/")[0]
    const repo = process.env.GITHUB_REPOSITORY.split("/")[1]
    const markdown = `${username}'s' most used language is ${language}`

    console.log("Hello ", username,  ", this is the ", repo, " repo")

    const topLangs = await fetchTopLanguages( username);
    console.log(" the top language is ", topLangs)

    // const getReadme = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    //   owner: username,
    //   repo: repo,
    //   path: core.getInput('readme_path'),
    // }).then( res => {
    //   // console.log(res.data)
    //   return res.data
    // }     
    // ).catch(e => {
    //   console.error("Failed: ", e)
    //   core.setFailed("Failed: ", e.message)
    // })
    // console.log(getReadme)

    // const sha = getReadme.sha
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

  } catch (error) {
    core.setFailed(error.message);
  }

})()