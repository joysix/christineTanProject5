import React, { Component } from 'react';
import firebase from './components/firebase';
import { getQueryResults, getMovieDetails } from './components/axios';
import { arrayMove } from 'react-sortable-hoc';

import './styles/styles.css';

import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Buttons from './components/Buttons';
import UserModal from './components/UserModal';
import Picks from './components/Picks';
import Template from './components/Template';

const db = firebase.database();

class App extends Component {
  constructor() {
    // console.log('App constructor called');
    super();
    this.state = {
      key: '',
      count: 0,
      picks: [],
      user: '',
      users: '',
      finalResults: [],
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
    db.ref('users').update({ [user]: key});
    db.ref(key).set({ user: user, count: 0 });
    this.setState({
      key,
      count: 0,
      user,
      picks: [],
      renderUserModal: false
    })
  }
  
  updateMovieRank = () => {
    const key = this.state.key;
    const picks = this.state.picks;
    picks.forEach((movie, index) => {
      db.ref(`/${key}/picks`).child(movie.id).update({ rank: index + 1 });
    })
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
      const key = this.state.key;
      const rank = this.state.count + 1;
      finalDetails.rank = rank;
      db.ref(`/${key}`).update({count: rank});
      db.ref(`/${key}/picks`).child(finalDetails.id).set(finalDetails);
    })
  }


  addMovie = (id) => {
    this.setState({
      finalResults: [],
      renderSearchResults: false,
    })
    this.processMovieDetails(id);
  }
  
  removeMovie = (id) => {
    const key = this.state.key;
    const count = this.state.count - 1;
    db.ref(`/${key}`).update({count});
    db.ref(`/${key}/picks`).child(id).remove();
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      picks: arrayMove(this.state.picks, oldIndex, newIndex),
    });
    this.updateMovieRank();
  };
  
  random = (max, min = 0) => {
    const num = Math.floor(Math.random() * max + min)
    return num;
  }

  loadRandomList = () => {
    console.log('load random list');
    db.ref().once('value', (snapshot) => {
      console.log('once');
      const data = snapshot.val();
      const users = data.users;
      if (data) {
        const keys = Object.keys(data).filter(key => key !== 'users');
        const key = keys[this.random(keys.length)];
        let values;
        let picks;
        if (data[key].picks) {
          values = Object.values(data[key].picks);
          picks = values.sort((a, b) => a.rank - b.rank);
        }
        this.setState({
          key,
          count: data[key].count,
          picks,
          user: data[key].user,
          users
        })
      }
    })
  }

  
  componentDidMount() {
    console.log('component did mount');
    this.loadRandomList();

    db.ref().on('value', (snapshot) => {
      const data = snapshot.val();
      console.log('on on on', data);
      if (data && this.state.key) {
        const key = this.state.key;
        let values;
        let picks;
        let count;
        if (data[key].picks) {
          values = Object.values(data[key].picks);
          picks = values.sort((a, b) => a.rank - b.rank);
          count = picks.length;
        }
        this.setState({
          count,
          picks
        })
      }
    })
  }
  
  
  render() {
    return (
      <div className="App">
        { this.state.renderUserModal ? 
        <UserModal renderSelf={this.handleRender} addUser={this.addUser} /> 
        : null }
        <SearchBar processQueryResults={this.processQueryResults} />
        <Buttons renderSelf={this.handleRender} addUser={this.addUser} loadRandomList={this.loadRandomList}/>
        { this.state.renderSearchResults ? 
          <SearchResults finalResults={this.state.finalResults} renderSelf={this.handleRender} addMovie={this.addMovie} />
          : null }
        <Template />
        <Picks user={this.state.user} picks={this.state.picks} onSortEnd={this.onSortEnd} removeMovie={this.removeMovie}/>
      </div>
    );
  }
}

export default App;
