import React, { useEffect, useState } from 'react';
import MovieList from '../utils/movieList';
import fetch from '../utils/fetch';

const Main = (props) => {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        fetch("trends").then(response => setMovies(response.data.results));
    }, [])

    return (
        <>
            <h1 className="title">Trending movies today:</h1>
            {movies.length > 0 ? <MovieList movies={movies} location={props.location}/> : <h2>Loading...</h2>}
        </>
    )
}

export default Main;