const core = require('@actions/core');
const github = require('@actions/github');

const readfile = require('./readfile');
const parsejson = require('./parsejson');
const validate = require('./validate');

function isPullRequest() {
  const context = github.context;
  console.log(context.payload)
  return true;
}
async function run() {
    try {
        const schema = readfile(core.getInput('schema'));
        const config = readfile(core.getInput('config'));
        const result = validate(parsejson(schema), parsejson(config));
        if (result.length > 0) {
          if(isPullRequest()){

          }
          core.setFailed(result);
        }
    } catch (error) {
        console.log(error);
      core.setFailed(error.message);
    }
  }
  
  run();