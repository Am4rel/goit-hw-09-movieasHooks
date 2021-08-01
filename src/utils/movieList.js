import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = (props) => {
    return (
                <ul className="listBox">
                    {props.movies.map(({ id, title, name, poster_path }) => {
                        const imgUrl = poster_path ? `https://image.tmdb.org/t/p/w200${poster_path}` : "https://abletrektours.com/wp-content/uploads/2020/01/Scandinavian-Mystery-e1578001346789.png";
                        return <li key={id} className="listItem">
                            <Link
                                to={{
                                    pathname: `/movies/${id}`,
                                    state: { from: props.location },
                                }}>
                                <img src={imgUrl} alt={title ? title : name} />
                                <p>{title ? title : name}</p>
                            </Link></li>
                    })}
                </ul>
            )
}

export default MovieList;   