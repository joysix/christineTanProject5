import React, { Component } from 'react';
import { searchCall } from './axios';

class SearchBar extends Component {
    constructor() {
        super();
        this.state = {
            query: "",
            searched: []
        }
    }
    
    handleChange = (e) => {
        this.setState({
            query: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const query = this.state.query;
        searchCall(query);
    }
 
    componentDidMount = () => {
        console.log('component did mount');
    }

    render() {
        return(<div>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="search"></label>
                <input id="search" type="text" name={this.state.query} value={this.state.query} placeholder="search" onChange={this.handleChange} />
                <button>Search</button>
            </form>
        </div>)
    }
}

export default SearchBar;