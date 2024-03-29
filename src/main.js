const core = require('@actions/core');
const github = require('@actions/github');

const readfile = require('./readfile');
const parsejson = require('./parsejson');
const validate = require('./validate');
const comment = require('./comment');

const githubToken = core.getInput('github_token');

const githubContext = github.context;
const githubPayload = githubContext.payload;

function isPullRequest() {
  return githubPayload.pull_request !== undefined;
}
function getPullRequestNumber() {
  return githubPayload.pull_request.number;
}
function createPullRequestComment(){
  return core.getInput('pull_request_comment') === 'true';
}
async function createOrUpdateComment(firstline,body){
  const octokit = github.getOctokit(githubToken)
  let commentId = 0;
  octokit.rest.issues.listComments({
    owner: githubPayload.repository.owner.login,
    repo: githubPayload.repository.name,
    issue_number: getPullRequestNumber()
  }).then((resp) => {
    resp.data.forEach((comment) => {
      if(comment.body.startsWith(firstline)){
        commentId = comment.id;
      }
    });
  }).finally(() => {
    comment(
      githubPayload.repository.owner.login,
      githubPayload.repository.name,
      body,
      getPullRequestNumber(),
      commentId
    );
  });
}
async function run() {
    try {
        const schema = readfile(core.getInput('schema'));
        const config = readfile(core.getInput('config'));
        const result = validate(parsejson(schema), parsejson(config));
        if (result.length > 0) {
          if(isPullRequest()){
            if(createPullRequestComment()){
              const firstLine = `## JSON validation errors in: ${core.getInput('config')}`
              const body = `${firstLine}\n\n${result.join('\n')}`
              createOrUpdateComment(firstLine,body)
            }
          }
          core.setFailed(result);
        }
    } catch (error) {
        console.log(error);
      core.setFailed(error.message);
    }
  }
  
  run();