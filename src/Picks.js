import React, { Component } from 'react';
// import { SortableContainer, SortableElement } from 'react-sortable-hoc';



class Picks extends Component {
    constructor() {
        super();
        this.state = {
        //     renderClass: false,
        }
    }

    // handleToggle = () => {
    //     if (this.state.renderClass) {
    //         this.setState({
    //             renderClass: false
    //         })
    //     } else {
    //         this.setState({
    //             renderClass: true
    //         })
    //     }
    // }

    render() {
        return(
            <div className="picks">
                <div className="title-block"></div>
                { this.props.picks.map(pick => {
                    return (
                    <div id={pick.id} className="pick">
                        <img src={pick.bg} alt={pick.title} />
                        <p id={pick.id} className="title">{pick.title} ({pick.year})</p>
                        <div id={pick.id} className="buttons">
                            {/* <button className="read" onClick={this.handleToggle()}>STORY</button> */}
                            <button className="remove" onClick={() => this.props.removeMovie(pick.id)}>X</button>
                        </div>
                        <div id={pick.id} className="frame">
                            <div id={pick.id} className="synopsis">
                                {pick.overview}
                            </div>
                            {/* <div id={pick.id} className={ this.state.renderClass ? "synopsis show" : "synopsis" } >
                                {pick.overview}
                            </div> */}
                        </div>
                    </div>
                    )
                })}
            </div>
        )
    }
}

export default Picks;