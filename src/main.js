const core = require('@actions/core');
const github = require('@actions/github');

const readfile = require('./readfile');
const parsejson = require('./parsejson');
const validate = require('./validate');

const githubToken = core.getInput('github_token');

const githubContext = github.context;
const githubPayload = githubContext.payload;

function isPullRequest() {
  return githubPayload.pull_request !== undefined;
}
function getPullRequestNumber() {
  return githubPayload.pull_request.number;
}
function createOrUpdateComment(firstline,body){
  const octokit = github.getOctokit(githubToken)
  octokit.rest.issues.listComments({
    owner: githubPayload.repository.owner.login,
    repo: githubPayload.repository.name,
    issue_number: getPullRequestNumber()
  }).then((comments) => {
    console.log(comments);
  })

  octokit.rest.issues.createComment({
    owner: githubPayload.repository.owner.login,
    repo: githubPayload.repository.name,
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