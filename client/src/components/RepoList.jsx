import React from 'react';

const RepoList = (props) => (
	<div>
  <div>
    <h4 className="repoHeader"> Repo List Component </h4>
    There are {props.repos.length} repos.
  </div>
  <div>
  	{props.repos.map(repo => {
  		return (
  			<div>
  			<div><a href={repo.url}>{repo.url.slice(19).split("/")[1].split("-").join(" ")}</a> by {repo.url.slice(19).split("/")[0]}</div>
  			</div>
  			)
  	})
  	}
  </div>
  </div>
)

export default RepoList;