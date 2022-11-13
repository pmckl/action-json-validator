const core = require('@actions/core');
const github = require('@actions/github');

module.exports = function (owner,repo,body,prId,commentId){
    const githubToken = core.getInput('github_token');
    const octokit = github.getOctokit(githubToken)
    if(commentId > 0){
        octokit.rest.issues.updateComment({
            owner: owner,
            repo: repo,
            comment_id: commentId,
            body: body
        })
    }
    else{
        octokit.rest.issues.createComment({
            owner: owner,
            repo: repo,
            issue_number: prId,
            body: body
        });
    }
};