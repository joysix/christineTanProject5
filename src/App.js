import React, { Component } from 'react';
import firebase from './firebase';
import './App.css';
import './styles/styles.css';
import { getQueryResults } from './axios';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

// PSEUDO CODE
// on submit, pass user input into a search call to moviedb
// return movie posters each with an add button
// on click of add button:
  // push details to an array
  // append movie still with title on grid on page
  // on click of delete button:
    // remove from array
    // remove movie still from page

const dbRef = firebase.database().ref();

class App extends Component {
  constructor() {
    // console.log('App constructor called');
    super();
    this.state = {
      finalResults: [],
      renderSearchResults: false,
      picks: []
    }
  }

  handleRender = () => {
    this.setState({
      renderSearchResults: false
    })
  }

  addMovie = (key) => {
    const index = this.state.finalResults.map(movie => movie.id).indexOf(Number(key));
    const picks = Array.from(this.state.picks);
    picks.push(this.state.finalResults[index]);
    this.setState({
      finalResults: [],
      renderSearchResults: false,
      picks
    })
  }
  
  componentDidMount() {
    console.log('componentDidMount');
    dbRef.on('value', (snapshot) => {
      console.log('listening...');
      console.log(snapshot.val());
    })
  }

  render() {
    // console.log('App render called');
    const processQueryResults = (query) => {
      getQueryResults(query)
      .then(finalResults => {
        this.setState({
          finalResults: finalResults,
          renderSearchResults: true
        });
      });
    }

    return (
      <div className="App">
      <SearchBar processQueryResults={processQueryResults} />
      { this.state.renderSearchResults ? <SearchResults finalResults={this.state.finalResults} renderSelf={this.handleRender} addMovie={this.addMovie} /> : null}
      </div>
    );
  }
}

export default App;
