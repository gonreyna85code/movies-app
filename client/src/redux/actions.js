import axios from "axios";
const API = "k_5p0p373c";
export const GET_MOVIES = "GET_MOVIES";
export const GET_MOVIE = "GET_MOVIE";
export const GET_SEARCH = 'GET_SEARCH';
export const GET_REGISTER = 'GET_REGISTER';


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
      let json2 = await axios.get(`https://movieon-back.herokuapp.com/movie/${json.data.title}`);

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
export function register(register) {
  return async function (dispatch) {
    try {
      const json = await axios({
        method: "POST",
        data: {
          username: register.username,
          password: register.password,
          profile: register.profile,
        },
        withCredentials: true,  
        url: 'https://movieon-back.herokuapp.com/register' ,
      });
      return dispatch({ type: "REGISTER", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}
export function login(login) {
  return async function (dispatch) {
    try {
      const json = await axios({
        method: "POST",
        data: {
          username: login.username,
          password: login.password,          
        },
        withCredentials: true,
        url:  'https://movieon-back.herokuapp.com/login',
      });         
      return dispatch({ type: "LOGIN", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

