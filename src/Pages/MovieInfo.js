import React, { useEffect, useState } from 'react';
import fetch from '../utils/fetch';
import MovieInfoCast from '../Components/MovieInfoCast';
import MovieInfoReviews from '../Components/MovieInfoReviews';
import MovieList from '../utils/movieList';
import { NavLink, Route, Switch } from 'react-router-dom';
import '../Styles/moviePage.css';


const MovieInfo = (props) => {
    const [title, setTitle] = useState("");
    const [userScore, setUserScore] = useState(0);
    const [overview, setOverview] = useState("");
    const [genres, setGenres] = useState([]);
    const [date, setDate] = useState("");
    const [poster, setPoster] = useState("");
    const [similar, setSimilar] = useState([]);
    const [similarLastIndex, setSimilarLastIndex] = useState(7);
    const productionYear = date.split("-")[0];

    useEffect(() => {
        fetch("filmInfo", props.match.params.movieId).then(response => {
            const { title, overview, vote_average, genres, release_date, poster_path } = response.data;
            const genresList=[]
            genres.map((genre) => { return genresList.push(genre.name) })
            const posterImg = poster_path ? `https://image.tmdb.org/t/p/w300${poster_path}` : "https://image.flaticon.com/icons/png/512/2790/2790961.png"

            setTitle(title);
            setUserScore(vote_average);
            setOverview(overview);
            setGenres(genresList);
            setDate(release_date);
            setPoster(posterImg);
        }).catch(error => console.log(error));

        fetch("similar", props.match.params.movieId).then(response => setSimilar(response.data.results)).catch(error => console.log(error));
    }, [props.match.params.movieId]);

    const onBackButtonClick = () => {
        const { state } = props.location;

        if (state) {
            props.history.push(state.from);
            return;
        };
        
        props.history.push({
            pathname: '/',
        });
    }

    const onNextButtonClick = () => {
        similarLastIndex < 19 && setSimilarLastIndex(similarLastIndex + 7 );
    }

    const onPreviousButtonClick = () => {
        similarLastIndex > 8 && setSimilarLastIndex(similarLastIndex - 7 );
    }

        
    return (
        <>
            <div>
                <div className="filmInfoBox">
                    <img src={poster} alt={`${title} poster`} width="300" />
                    <div className="filmInfoBoxMain">
                        <button type="button" onClick={onBackButtonClick}>{`<-- Back`}</button>
                        <h2 className="filmInfoBoxItem">{title} ({productionYear})</h2>
                        <p className="filmInfoBoxItem">User score: {userScore}</p>
                        <h4 className="filmInfoBoxItem">Overwiev</h4>
                        <p className="filmInfoBoxItem">{overview ? overview : <span>Here should be an overview, but we don't have it yet...</span>}</p>
                        <h4 className="filmInfoBoxItem">Genres</h4>
                        <ul className="filmInfoBoxItem">
                            {genres.map(genre => <li key={genre}>{genre}</li>)}
                        </ul>
                    </div>
                </div>
                <div>
                    <h2 className="title">Similar movies:</h2>
                    <div className="similarMoviesBox">
                        <button type="button" onClick={onPreviousButtonClick} disabled={similarLastIndex < 8}>Previous</button>
                        <MovieList movies={similar.slice(similarLastIndex - 7, similarLastIndex)} location={props.location} />
                        <button type="button" onClick={onNextButtonClick} disabled={similarLastIndex > 20}>Next</button>
                    </div>
                </div>
                <div className="additionalInfo">
                    <h2 className="title">Additional information:</h2>
                    <ul className="additionalInfoList">
                        <li>
                            <NavLink  className="NavLink" activeClassName="NavLink-active"
                                to={{
                                    pathname: `${props.match.url}/cast`,
                                    state: props.location.state && { from: props.location.state.from },
                                }}>Cast
                            </NavLink>
                        </li>
                        <li>
                            <NavLink  className="NavLink" activeClassName="NavLink-active"
                                to={{pathname: `${props.match.url}/reviews`,
                                    state: props.location.state && { from: props.location.state.from },
                                }}>Reviews
                            </NavLink>
                        </li>
                    </ul>
            
                </div>
            </div>
            <Switch>
                <Route path={`${props.match.path}/cast`} component={MovieInfoCast} />
                <Route path={`${props.match.path}/reviews`} component={MovieInfoReviews} />
            </Switch>
        </>
    )
}

export default MovieInfo;