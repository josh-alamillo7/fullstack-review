import React from 'react';

const RepoList = (props) => (
	<div>
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
  </div>
  <div>
  	{props.repos.map(repo => {
  		return (
  			<div>
  			<h1>Author</h1>
  			<a>{repo.url.slice(19).split("/")[0]}</a>
  			<h2>Title</h2>
  			<a href={repo.url}>{repo.url.slice(19).split("/")[1].split("-").join(" ")}</a>
  			</div>
  			)
  	})
  	}
  </div>
  </div>
)

export default RepoList;