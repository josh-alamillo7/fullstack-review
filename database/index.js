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

  User.find({id: repos[i].owner.id}, function(err, data) {
  	if (err) {
  		throw err
  	}
  	else if (data.length > 0) {
  		let user = new User({id: repos[i].owner.id, login: repos[i].owner.login, repos: []})
  		user.save(function(err, user) {
  		if (err) return console.error(err);
  		console.log("user saved!")
  		})
  	}
  }

/*
  for (var i = 0; i < repos.length; i++) {
  	let repo = new Repo({id: repos[i].id, url: repos[i].html_url, popularity: repos[i].forks})
  	user.repos.push(repo)
  }
 */


}

module.exports.save = save;