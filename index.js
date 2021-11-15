const core = require('@actions/core')
const github = require('@actions/github')

try{
    const name = core.getInput(git_user);
    console.log(`Hello ${name}`);
    
    // core.setOutput("result", name);
    
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`)

}catch(error){
    core.setFailed(error.message);
}