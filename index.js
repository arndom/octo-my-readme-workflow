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

    console.log("Hello", username,  ", the workflow is being deployed in the", repo, "repo")

    const getLanguage = await fetchTopLanguages();
    console.log("Your top language is", Object.keys(getLanguage)[0])

    const lang = Object.keys(getLanguage)[0].toLowerCase()
    // const lang = "javascript"

    if(Object.keys(languagesSupported).includes(lang)){
      
      console.log(lang, "is a supported language ✅")
      
      var octoLang = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: username,
        repo: repo,
        path: `lib/octo-lang/${lang}.png`,
      }).then((res)=>{
        return res.data.content
      }).catch(e => {
        console.error("Failed: ", e)
        core.setFailed("Failed: ", e.message)
      })

      var base64str = octoLang;

      const getOctoLang = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: username,
        repo: repo,
        path: 'my-octo-lang.png',
      }).then( res => { 
        return res.data
      }     
      ).catch(e => {
        console.error("Failed: ", e)
        core.setFailed("Failed: ", e.message)
      })

      const sha = getOctoLang !== undefined ? getOctoLang.sha : ''

      await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}',{
        owner: username,
        repo: repo,
        path: "my-octo-lang.png",
        message: "created/updated octo-lang",
        content: base64str,
        sha: sha,
      }).then(()=>{
          console.log("octo-lang generated ✅")
      }).catch((e) => {
        console.error("Failed: ", e)
        core.setFailed("Failed: ", e.message)
      })


    }else{
      console.error(lang, "is currently an unsupported language ❌")
    }


  } catch (error) {
    core.setFailed(error.message);
  }

})()