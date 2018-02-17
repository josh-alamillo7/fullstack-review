const mongoose = require('mongoose');
//connecting to /fetcher of localhost
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
	id: Number,
	url: String,
	popularity: Number
  // TODO: your schema here!
});

let userSchema = mongoose.Schema({
	id: Number,
	login: String,
	repos: Array
	//keep track of user's repos using an array
})

let Repo = mongoose.model('Repo', repoSchema);

let User = mongoose.model('User', userSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  //save instance of the new user to the database.

  //add the user to the user database
  User.find({id: repos[0].owner.id}, function(err, data) {
  	if (err) {
  		throw err
  	}
  	else if (data.length === 0) {
  		let user = new User({id: repos[0].owner.id, login: repos[0].owner.login, repos: []})
  		user.save(function(err, user) {
  		  if (err) {return console.error(err)};
  		  console.log("user saved!")
  		})
  	}
  })

  //add each repo to the repo database, and add it to its user array
  
  var allIds = repos.map(repo => {
    return repo.id
  })

  console.log(allIds)
  var allRepos = []

  for (var i = 0; i < repos.length; i++) {
    if (!allIds.includes(repos[i].id)) {
      let repo = new Repo({id: repos[i].id, url: repos[i].html_url, popularity: repos[i].forks})
      allRepos.push(repo)
      repo.save(function(err, repo) {
        if (err) {
          return console.error(err)
        }
        console.log(repo.id)
        console.log("repo saved!")
      })
    }
  }

  User.find({id: repos[0].owner.id}, function(err, data) {
    if (err) {
      throw err
    }
    else {
      //data = that user
      for (var i = 0; i < repos.length; i++) {
        if (!data[0].repos.includes(repos[i])) {
          data[0].repos.push(repos[i])
          console.log(data[0].repos.length)
        }
      }
      console.log("THE USER'S REPO'S:", data[0].repos)
    }
  })
}

module.exports = save;