import React, { Component } from 'react';

class SearchBar extends Component {
    constructor() {
        // console.log('SearchBar constructor called');
        super();
        this.state = {
            query: ''
        }
    }

    // updates query state to value of user input
    handleChange = (e) => {
        // console.log('SearchBar handleChange called');
        this.setState({
            query: e.target.value
        });
    }

    // prevents refresh when form submits, then calls processQueryResults
    handleSubmit = (e) => {
        // console.log('SearchBar handleSubmit called');
        e.preventDefault();
        this.props.processQueryResults(this.state.query);
        this.setState({
            query: ''
        })
    }

    render() {
        // console.log('SearchBar render called');
        return(
            <form className="search-bar" onSubmit={this.handleSubmit}>
                <label htmlFor="search">Search</label>
                <input id="search" type="text" name={this.state.query} value={this.state.query} placeholder="search" onChange={this.handleChange} />
                <button className="submit"><i className="fas fa-search"></i></button>
            </form>
        )
    }
}

export default SearchBar;