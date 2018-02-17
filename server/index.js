const express = require('express');
let app = express();
let bodyParser = require('body-parser');
let getReposByUsername = require('../helpers/github.js');
let database = require('../database/index.js')

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.post('/repos', function (req, res) {

  console.log(getReposByUsername)
  getReposByUsername(req.body.user, database.save)

	res.status(201).send('it went through')
	
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  Repo.find(function(err, data) {
    console.log(data)
  })

  res.status(200).send('hey what u want')
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

