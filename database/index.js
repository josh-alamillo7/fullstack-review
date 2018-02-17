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
  console.log(repos[0].owner)
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

  
  //Use Id's to check which repo's already exist
  var allIds = repos.map(repo => {
    return repo.id
  })

  //this repo will keep track of the repo's that belong to this user.
  var allRepos = []

  //for each repo, check if its id is already in the database by comparing it to "allIds"
  //if it's not already in the database, save it and push it into all repo's
  for (var i = 0; i < repos.length; i++) {
    if (!allIds.includes(repos[i].id)) {
      let repo = new Repo({id: repos[i].id, url: repos[i].html_url, popularity: repos[i].forks})
      allRepos.push(repo)
      repo.save(function(err, repo) {
        if (err) {
          return console.error(err)
        }
        console.log("repo saved!")
      })
    }
  }

  console.log("OWNER:", repos[0].owner)
  console.log("ID:", repos[0].owner.id)
  User.find(function(err, data) {
    console.log(data)
  })
  //if the repo is not already in the user's repo array, add it.
  User.find({id: repos[0].owner.id}, function(err, data) {
    if (err) {
      throw err
    }
    else {
      //data = that user
      for (var i = 0; i < repos.length; i++) {
        if (data[0] && !data[0].repos.includes(repos[i])) {
          data[0].repos.push(repos[i])
        }
      }
      
    }
    console.log(i + " REPOS DOWNLOADED")
  })
}

module.exports.save = save;
module.exports.User = User;
module.exports.Repo = Repo;