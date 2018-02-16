const request = require('request');
const config = require('../config.js');

let getReposByUsername = (input) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/users/' + input + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options)
    .then(function (response) {
      console.log("got data!")
      console.log(response)
    })
    .catch(function (err) {
      console.log("something went wrong.")
    })

}

module.exports.getReposByUsername = getReposByUsername;