import React, { useEffect, useState } from 'react';
import fetch from '../utils/fetch';
import MovieList from '../utils/movieList'
import '../Styles/Search.css';


const SearchMovie = (props) => {
    const [searchQuery, setSearchQuery] = useState(props.location.search.split("=")[1]);
    const [movieList, setMovieList] = useState([]);

    const onInput = e => setSearchQuery(e.target.value);

    const filmSearch = () => {
        fetch("search", null, searchQuery).then(response => setMovieList(response.data.results));
    }

    const onFormSubmit = e => {
        e.preventDefault();
        setMovieList([]);
        
        props.history.push(`${props.match.url}?query=${searchQuery}`);
        filmSearch();
    }

    useEffect(() => {
        props.location.search !== "" && filmSearch();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <form onSubmit={onFormSubmit}>
                <label className="form">
                    Enter the part of film title:
                    <input type="text" onChange={onInput}></input>
                </label>
                <button type="submit">Search film!</button>
            </form>
            
            {props.location.search !== "" && <> <h2 className="title">Here's your search results:</h2><MovieList movies={movieList}  location={props.location} /></>}
        </>
    )
}

export default SearchMovie;