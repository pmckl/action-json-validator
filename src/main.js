const core = require('@actions/core');
const github = require('@actions/github');

const readfile = require('./readfile');
const parsejson = require('./parsejson');
const validate = require('./validate');

const githubToken = core.getInput('github_token');
function isPullRequest() {
  const context = github.context;
  return context.payload.pull_request !== undefined;
}
function getPullRequestNumber() {
  return github.context.payload.pull_request.number;
}
function createOrUpdateComment(firstline,body){
  const octokit = github.getOctokit(githubToken)
  console.log(github.context);
  octokit.rest.issues.createComment({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: getPullRequestNumber(),
    body: body
  });
}
async function run() {
    try {
        const schema = readfile(core.getInput('schema'));
        const config = readfile(core.getInput('config'));
        const result = validate(parsejson(schema), parsejson(config));
        if (result.length > 0) {
          if(isPullRequest()){
            const firstLine = `## JSON validation errors in: ${core.getInput('config')}`
            const body = `${firstLine}\n\n${result.join('\n')}`
            createOrUpdateComment(firstLine,body)
          }
          core.setFailed(result);
        }
    } catch (error) {
        console.log(error);
      core.setFailed(error.message);
    }
  }
  
  run();