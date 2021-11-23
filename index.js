const core = require('@actions/core')
const { Octokit } = require('@octokit/core');
const { languagesSupported } = require('./common/utils');
const fetchTopLanguages = require('./top-languages-fetcher')
const { readFile, writeFile } = require('fs')
const { promisify } = require('util')
const asyncReadFile = promisify(readFile)

const octokit = new Octokit({ auth: core.getInput('gh_token') });

(async () => {

  try {    

    // const username = process.env.GITHUB_REPOSITORY.split("/")[0]
    // const repo = process.env.GITHUB_REPOSITORY.split("/")[1]
    // const markdown = `${username}'s' most used language is text`

    // console.log("Hello", username,  ", the workflow is being deployed in the", repo, "repo")

    // const getLanguage = await fetchTopLanguages();
    // console.log("Your top language is", Object.keys(getLanguage)[0])


    const lang = "java"

    const returnSvg = async (path) => {
      const data = await asyncReadFile(path)    

      // since fs.readFile returns a buffer, we should probably convert it to a string.
      return data.toString() 
    }

    if(Object.keys(languagesSupported).includes(lang)){
      console.log("language supported:", lang)
      
      var languageIconPath = `./lib/programming-languages-logos/src/${languagesSupported[lang]}/${lang}.svg`
      
      var languageIcon = await returnSvg(languageIconPath)
        .then((res)=>{
          return res
        })
        .catch((err)=>{
          console.error(`failed to read svg file: ${err}`)
        })

      var baseOctocatPath = `./lib/octocat-base/base.svg`
      
      var octocat = await returnSvg(baseOctocatPath)
        .then((res)=>{
          return res
        })
        .catch((err)=>{
          console.error(`failed to read svg file: ${err}`)
        })  


      writeFile('./base-octocat.svg', octocat, function (err) {
        if (err) throw err;               console.log('Results Received');
      });

      writeFile('./language-icon.svg', languageIcon, function (err) {
        if (err) throw err;               console.log('Results Received');
      });


      
    }else{
      console.log("language unsupported:",lang)
    }

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