import axios from "axios";
const API = "k_5p0p373c";
export const GET_MOVIES = "GET_MOVIES";
export const GET_MOVIE = "GET_MOVIE";
export const GET_SEARCH = 'GET_SEARCH';


export function getMovies() {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `https://imdb-api.com/en/API/Top250Movies/${API}`
      );
      return dispatch({ type: "GET_MOVIES", payload: json.data.items });
    } catch (error) {
      console.log(error);
    } 
  };
}
export function getMovie(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        `https://imdb-api.com/en/API/Title/${API}/${id}`
      );
      let json2 = await axios.get(`http://localhost:3001/movie/${json.data.title}`);
      
      json.data.torrents = json2.data;
      return dispatch({ type: "GET_MOVIE", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getSearch(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `https://imdb-api.com/en/API/SearchMovie/${API}/${name}`
      );
      return dispatch({ type: "GET_SEARCH", payload: json.data.results});
    } catch (error) {
      console.log(error);
    }
  };
}

