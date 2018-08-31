import React from 'react';

const searchResults = (props) => {
    console.log('searchResults called')
    return (
        <div className="search-results">
        <button className="close overlay" onClick={() => props.renderSelf()}>x</button>
            {props.finalResults.map((result) => {
                return (
                    <div className={`movie-thumb ${result.id}`} key={result.id} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${result.poster})`}} onClick={() => props.addMovie(`${result.id}`)}>
                    <button className="add">add</button>
                    </div>
                )
            })}   
        </div>
    )
}

export default searchResults;