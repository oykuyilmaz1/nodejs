const debug = require('debug')('stp');
console.log('Before');
const p = getUser(1);
p
    .then(user => getRepos(user.username))
    .then(repo => getCommits(repo))
    .then(commit => displayCommit(commit))
    .catch(err => console.log(err.message));

//async-await
async function displayAll(){
    try { 
        const user = await getUser(1)
        const repos = await getRepos(user.username);
        const commits = await getCommits(repos);
        displayCommit(commits); 
    } 
    catch(err) {
        console.log(err.message);
    }
    
}




function displayCommit(commit){
    console.log(commit);
}

function getUser(id){    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({id:id,"username":"mosh"});
        }, 2000);
    });
    
}
function getRepos(username){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //resolve(['r1','r2','r3']);
            reject(new Error('sth'));
        }, 2000);
    });    
}
function getCommits(repo){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['c1','c2']);
        }, 2000);
    });    
}