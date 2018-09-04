import React from 'react';

const SearchResults = (props) => {
    // console.log('searchResults called')
    return (
        <div className="overlay">
            <button className="close" onClick={() => props.renderSelf('renderSearchResults', false)}>Close</button>
            <div className="search-results">
                <div className="thumbs">
                    {props.finalResults.map((result) => {
                        return (
                            <div className={`thumb ${result.id}`} key={result.id} title={result.title} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${result.poster})`}} onClick={() => props.addMovie(`${result.id}`)}>
                            <button className="add">Add</button>
                            </div>
                        )
                    })}   
                </div>
            </div>
        </div>
    )
}

export default SearchResults;