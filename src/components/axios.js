import axios from 'axios';

const url = 'https://api.themoviedb.org/3/';
const api_key = '2b03b1ad14b5664a21161db2acde3ab5';
const language = 'en-US';

export function getQueryResults(query, page = 1) {
    // console.log('axios getQueryResults called');
    return axios.get(`${url}search/multi`, {
        params: {
            api_key,
            language,
            query,
            page
        }
    }).then((res) => {
        
        const noTv = res.data.results.filter((hit) => {
            return !(hit.media_type === 'tv')
        });
        
        const results = noTv.map((hit) => {
            let work;
            if (hit.media_type === 'movie') {
                work = [{ id: hit.id, title: hit.title, poster: hit.poster_path }];
            } 
            
            else if (hit.media_type === 'person') {
                const moviesOnly = hit.known_for.filter((movie) => {
                    return movie.media_type === 'movie'
                });

                work = moviesOnly.map((movie) => {
                    return { id: movie.id, title: movie.title, poster: movie.poster_path }; 
                });

            }
            return work;
        })

        const resultsArr = [].concat(...results);
        const finalResults = resultsArr.filter(movie => movie.poster);
        return finalResults;
    });
}

export function getMovieDetails(id) {
    // console.log('axios getMovieDetails called');
    return axios.get(`${url}movie/${id}`, {
        params: {
            api_key
        }
    }).then((res) => {
        const data = res.data;
        
        let bg;

        if (!data.backdrop_path) {
            bg = data.poster_path;
        } else {
            bg = data.backdrop_path;
        }

        let movieDetails = {
            id: data.id,
            title: data.title,
            year: parseInt(data.release_date, 10),
            tagline: data.tagline,
            overview: data.overview,
            bg: `https://image.tmdb.org/t/p/original${bg}`
        }

        return movieDetails;
    });
}
