const debug = require('debug')('stp');
console.log('Before');
getUser(1, getRepos2);
function getRepos2(user) {
    debug('getrepos');
    getRepos(user.username, getCommits);
}
// console.log('After');
function getCommits(repo){
    debug('getcommits');
    getCommits2(repo,displayCommit);
}
function displayCommit(commit){
    console.log(commit);
}
function getUser(id, callback){
    setTimeout(() => {
        console.log('Reading');
        callback({id:id,"username":"mosh"});
    }, 2000);
}
function getRepos(username, callback){
    setTimeout(() => {
        callback(['r1','r2','r3']);
    }, 2000);
}
function getCommits2(repo, callback){
    setTimeout(() => {
        var x=repo;
        callback(['c1','c2']);
    }, 2000);
}