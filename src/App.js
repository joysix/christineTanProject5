import React, { Component } from 'react';
import firebase from './firebase';
import './App.css';
import './styles/styles.css';
import { getQueryResults, getMovieDetails } from './axios';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Buttons from './Buttons';
import UserModal from './UserModal';
import Picks from './Picks';

// PSEUDO CODE
// on submit, pass user input into a search call to moviedb
// return movie posters each with an add button
// on click of add button:
  // push details to an array
  // append movie still with title on grid on page
  // on click of delete button:
    // remove from array
    // remove movie still from page

const db = firebase.database();

class App extends Component {
  constructor() {
    // console.log('App constructor called');
    super();
    this.state = {
      finalResults: [],
      user: '',
      key: '',
      picks: [],
      count: 0,
      renderSearchResults: false,
      renderUserModal: false,
    }
  }

  handleRender = (component, boo) => {
    this.setState({
      [component]: boo
    })
  }

  addUser = (user) => {
    const key = db.ref().push().key;
    this.setState({
      user,
      key,
      count: 0,
      renderUserModal: false
    })
    db.ref('users').update({ [user]: key});
    db.ref(key).set({ user: user, count: 0 });
  }

  processQueryResults = (query) => {
    getQueryResults(query)
      .then(finalResults => {
        this.setState({
          finalResults: finalResults,
          renderSearchResults: true
        });
      });
  }
  
  processMovieDetails = (id) => {
  getMovieDetails(id)
    .then(finalDetails => {
      const count = this.state.count + 1;
      this.setState({
        count
      })
      const rank = this.state.count;
      finalDetails.rank = rank;
      const key = this.state.key;
      db.ref(key).update({count: rank});
      db.ref(key).child('picks').child(finalDetails.id).set(finalDetails);
    })
  }

  addMovie = (key) => {
    this.setState({
      finalResults: [],
      renderSearchResults: false,
    })
    this.processMovieDetails(key);
  }
  
  removeMovie = (id) => {
    const key = this.state.key;
    const count = this.state.count - 1;
    db.ref(`/${key}`).update({count});
    db.ref(`/${key}/picks`).child(id).remove();
  }

  
  random = (max, min = 0) => {
    const num = Math.floor(Math.random() * max + min)
    // console.log(num);
    return num;
  }

  
  componentDidMount() {
    console.log('componentDidMount');
    if(this.state.key === '') {
      db.ref().on('value', (snapshot) => {
       const data = snapshot.val();
       console.log(data);
       if (data) {
         const keys = Object.keys(data).filter(key => key !== 'users');
         const key = keys[this.random(keys.length)];
         const values = Object.values(data[key].picks);
         const picks = values.sort((a, b) => a.rank - b.rank);
         console.log(picks);
         this.setState({
           key,
           user: data[key].user,
           picks,
           count: data[key].count
         })
       }
      })
    }
  }


  render() {
    return (
      <div className="App">
      { this.state.renderUserModal ? 
      <UserModal renderSelf={this.handleRender} addUser={this.addUser} /> 
      : null }
      <SearchBar processQueryResults={this.processQueryResults} />
      <Buttons renderSelf={this.handleRender} addUser={this.addUser} />
      { this.state.renderSearchResults ? 
        <SearchResults finalResults={this.state.finalResults} renderSelf={this.handleRender} addMovie={this.addMovie} />
        : null }
      <Picks picks={this.state.picks} removeMovie={this.removeMovie}/>
      </div>
    );
  }
}

export default App;
