import React, { useState, useEffect } from 'react';
import fetch from '../utils/fetch';

const MovieInfoReviews = (props) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("reviews", props.match.params.movieId).then(response => setReviews(response.data.results)).catch(error => console.log(error));
    }, [props.match.params.movieId])

    return (
        <>
            <h2 className="title">Reviews:</h2>
            {reviews.length > 0 ?
                <ul>
                    {reviews.map(({ author, content }) => {
                        return <li key={content}>
                            <p>Author: {author}</p>
                            <p>{content}</p>
                        </li>
                    })}
                </ul> :
                <p>We don't have any review of this film yet. You can be first!</p>}
        </>
    )
}

export default MovieInfoReviews;