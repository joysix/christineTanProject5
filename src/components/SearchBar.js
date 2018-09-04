import React, { Component } from 'react';

class SearchBar extends Component {
    constructor() {
        super();
        this.state = {
            query: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            query: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.processQueryResults(this.state.query);
        this.setState({
            query: ''
        })
    }

    render() {
        return(
            <form className="search" onSubmit={this.handleSubmit}>
                <label htmlFor="search">Search</label>
                <input id="search" type="text" className="search" name={this.state.query} value={this.state.query} placeholder="search movies..." onChange={this.handleChange} />
                <button className="submit"><i className="fas fa-search"></i></button>
            </form>
        )
    }
}

export default SearchBar;