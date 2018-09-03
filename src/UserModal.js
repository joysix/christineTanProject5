import React, { Component } from 'react';

class userModal extends Component {
    constructor() {
        super();
        this.state = {
            username: ''
        }
    }
 
    handleChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addUser(this.state.username);
    }

    render() {
        return (
            <div className="overlay">
                <button className="close overlay" onClick={() => this.props.renderSelf('renderUserModal', false)}>Close</button>
                <form className="user" onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Choose a username</label>
                    <input type="text" id="username" className="username" placeholder="tanenbaum" onChange={this.handleChange} />
                    <button className="username">Start</button>
                </form>
            </div>
        )
    }
}


export default userModal;