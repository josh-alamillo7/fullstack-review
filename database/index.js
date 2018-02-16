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

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;