import React, { Component } from 'react';
import './App.css';
import SearchBar from './SearchBar';

// PSEUDO CODE
// on submit, pass user input into a search call to moviedb
// return movie posters each with an add button
// on click of add button:
  // push details to an array
  // append movie still with title on grid on page
  // on click of delete button:
    // remove from array
    // remove movie still from page

class App extends Component {
  render() {
    return (
      <div className="App">
      <SearchBar />
      </div>
    );
  }
}

export default App;
