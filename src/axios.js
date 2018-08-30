import axios from 'axios';

const url = 'https://api.themoviedb.org/3/';
const api_key = '2b03b1ad14b5664a21161db2acde3ab5';
const language = 'en-US';

export function searchCall(query) {
    axios.get(`${url}search/multi`, {
        params: {
            api_key,
            language,
            query
        }
    }).then((res) => {
        const results = res.data.results.map((hit) => {
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
        const finalResults = [].concat(...results);
        console.log(finalResults);
    });
}