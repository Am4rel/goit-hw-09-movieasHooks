import fetch from '../utils/fetch';
import React, {useEffect, useState} from 'react';

const MovieInfoCast = (props) => {
    const [cast, setCast] = useState([]);

    useEffect(() => {
        fetch("actors", props.match.params.movieId).then(response => setCast(response.data.cast)).catch(error => console.log(error));
    }, [props.match.params.movieId]);

    return (
        <>
            <h2 className="title">Cast:</h2>
            {cast.length > 0 &&
                <ul className="listBox">
                    {cast.map(({ profile_path, name, character, cast_id }) => {
                        const actorImg = profile_path ? `https://image.tmdb.org/t/p/w200${profile_path}` : "https://www.kstech.com//images/easyblog_images/4072/incognito_mode_400.jpg"
                        return <li key={cast_id} className="listItem">
                            <img src={actorImg} alt={name}/>
                            <p>{name}</p>
                            <p>Character: {character}</p>
                        </li>
                    })}
                </ul>}
        </>
    )
}

export default MovieInfoCast;