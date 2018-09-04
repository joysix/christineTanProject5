import React, { Component } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

class Picks extends Component {
    
    SortableItem = SortableElement(({ pick }) => {
        return (
            <li id={pick.id} className="pick" style={{ backgroundImage: `url(${pick.bg})` }} title={pick.tagline ? pick.tagline : pick.title}>
                <p id={pick.id} className="title">
                    <span className="title-year">{pick.title} ({pick.year})</span>
                </p>
                <p id={pick.id} className="rank">{pick.rank}</p>
                <div id={pick.id} className="buttons">
                    <button className="remove" onClick={() => this.props.removeMovie(pick.id)} title="remove movie">X</button>
                </div>
                <div id={pick.id} className="frame">
                    <div id={pick.id} className="synopsis">
                        {pick.overview}
                    </div>
                </div>
            </li>
        );
    });

    SortableList = SortableContainer(({ items }) => {
        return (
            <ul className="picks">
                <div className="title-block">
                    <h2>{this.props.user}'s</h2>
                    <h1>Top 10</h1>
                </div>
                { items ? items.map((pick, index) => (
                    <this.SortableItem key={`item-${index}`} index={index} pick={pick} />
                )) : null }
            </ul>
        );
    });

    render() {
        return <this.SortableList items={this.props.picks} onSortEnd={this.props.onSortEnd} axis={'xy'}/>;
    }
}

export default Picks;