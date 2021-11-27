const core = require('@actions/core')
const { Octokit } = require('@octokit/core');
const { languagesSupported, base64_encode } = require('./common/utils');
const fetchTopLanguages = require('./top-languages-fetcher')
const fs = require('fs');

const octokit = new Octokit({ auth: core.getInput('gh_token') });

(async () => {

  try {    
    const username = process.env.GITHUB_REPOSITORY.split("/")[0]
    const repo = process.env.GITHUB_REPOSITORY.split("/")[1]

    var markdown = ``

    console.log("Hello", username,  ", the workflow is being deployed in the", repo, "repo")

    const getLanguage = await fetchTopLanguages();
    console.log("Your top language is", Object.keys(getLanguage)[0])

    const lang = Object.keys(getLanguage)[0]
    // const lang = "javascript"

    if(Object.keys(languagesSupported).includes(lang.toLowerCase())){
      
      console.log("language supported:", lang)
      
      // path to collection octo-langs
      var languageIconPath = `./lib/octo-lang/${lang}.png`
      
      // convert image to base64 encoded string
      var base64str = base64_encode(languageIconPath);

      // write file to root dir
      fs.writeFile("my-octo-lang.png", base64str, 'base64', function(err) {
        console.log(err);
      });

      markdown =  `![octo-lang](my-octo-lang.png "ocotolang")`

    }else{
      console.error("language unsupported:",lang)
    }

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
    // console.log(getReadme)

    const sha = getReadme.sha
    // console.log(sha)

    await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner: username,
      repo: repo,
      path: core.getInput('readme_path'),
      message: '(Automated) Update README.md',
      content: Buffer.from(markdown, "utf8").toString('base64'),
      sha: sha,
    }).then(() => {
      core.setOutput("result", (markdown))
    }).catch((e) => {
      console.error("Failed: ", e)
      core.setFailed("Failed: ", e.message)
    })

  } catch (error) {
    core.setFailed(error.message);
  }

})()