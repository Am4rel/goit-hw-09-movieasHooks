import axios from 'axios';

const BASE_URL = "https://api.themoviedb.org/3/";
const AUTH_TOKEN = "4e3ee43a33940cdc2c536aa8c24e20b3";

 async function fetch (fetchType, movieId = null, query=null) {
    const fetchTypes = {
        trends: `${BASE_URL}trending/all/day?api_key=${AUTH_TOKEN}`,
        search: `${BASE_URL}search/movie?api_key=${AUTH_TOKEN}&query=${query}&page=1`,
        filmInfo: `${BASE_URL}movie/${movieId}?api_key=${AUTH_TOKEN}`,
        actors: `${BASE_URL}movie/${movieId}/credits?api_key=${AUTH_TOKEN}`,
        reviews: `${BASE_URL}movie/${movieId}/reviews?api_key=${AUTH_TOKEN}`,
        similar: `${BASE_URL}movie/${movieId}/similar?api_key=${AUTH_TOKEN}`,
    };

     const data = await axios(fetchTypes[fetchType]);

    return data;
};

export default fetch;