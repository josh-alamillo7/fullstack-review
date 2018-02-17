import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.search = this.search.bind(this)
    this.getTopRepos()

  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: '/repos',
      type: 'POST',
      data: JSON.stringify({'user': term}),
      contentType: 'application/json',
      success: function(data) {
        console.log('query sent!')
      },
      failure: function() {
        console.log('did not send')
      }
    });
  }

  getTopRepos() {
    const app = this
    $.ajax({
      url: '/repos',
      type: 'GET',
      success: function(data) {
        app.setState({repos: data})
        console.log('we got them')
        console.log(data)
      },
      failure: function() {
        console.log('u failed')
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));