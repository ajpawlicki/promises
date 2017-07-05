/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var githubProfileAsync = require('./promisification').getGitHubProfileAsync;
var writeFileAsync = Promise.promisify(fs.writeFile);
var readFileAsync = require('./promiseConstructor').pluckFirstLineFromFileAsync;

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // return readFileAsync(readFilePath)
  return new Promise((resolve, reject) => {
    fs.readFile(readFilePath, 'utf8', (err, file) => {
      if (err) {
        throw(err);
        // reject(err);
      } else {
        var username = file.split('\n')[0];
        return resolve(username);
      }
    });
  })

  .then((username) => { return githubProfileAsync(username) })
  
  .then((profile) => { return writeFileAsync(writeFilePath, JSON.stringify(profile)) })

  .catch()
  // .error()
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
