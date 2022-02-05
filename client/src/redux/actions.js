import axios from "axios";
const API = "d5e36f6a7c8e47ef01dce85748500322";
export const GET_MOVIES = "GET_MOVIES";
export const GET_MOVIE = "GET_MOVIE";
export const GET_SEARCH = "GET_SEARCH";
export const GET_REGISTER = "GET_REGISTER";
export const GET_USER = "GET_USER";
export const GET_TORRENTS = "GET_TORRENTS";
export const DEL_TORRENT = "DEL_TORRENT";
export const GET_SUBS = "GET_SUBS";


axios.defaults.withCrendentails = true;
axios.defaults.Credentials = "includes";

export function getMovies() {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API}`
      );
      return dispatch({ type: "GET_MOVIES", payload: json.data.results });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getSubs() {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `http://bsplayer-subtitles.com/index.php?cmd=search&p=exploresub&q=eternals&lang=SPA`
      );
      console.log(json.data)
      return dispatch({ type: "GET_MOVIES", payload: json.data.results });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getMovie(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API}`
      );
      console.log(json.data);
      return dispatch({ type: "GET_MOVIE", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getTorrents(title) {
  return async function (dispatch) {
    try {
      let json = await axios({
        method: "GET",
        withCredentials: true,
        Credentials: "includes",
        url: `https://movion-back.herokuapp.com/movie/${title}`,
      });
      console.log(json.data);
      return dispatch({ type: "GET_TORRENTS", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getSearch(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API}&language=en-US&query=${name}&page=1&include_adult=false`
      );
      return dispatch({ type: "GET_SEARCH", payload: json.data.results });
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
        Credentials: "includes",
        url: "https://movion-back.herokuapp.com/register",
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
        Credentials: "includes",
        url: "https://movion-back.herokuapp.com/login",
      });
      console.log(json.data);
      return dispatch({ type: "LOGIN", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUser() {
  return async function (dispatch) {
    try {
      const json = await axios({
        method: "GET",
        withCredentials: true,
        Credentials: "includes",
        url: "https://movion-back.herokuapp.com/user",
      });
      console.log(json.data);
      return dispatch({ type: "GET_USER", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function logout() {
  return async function (dispatch) {
    try {
      const json = await axios({
        method: "GET",
        withCredentials: true,
        Credentials: "includes",
        url: "https://movion-back.herokuapp.com/logout",
      });
      console.log("Usuario no logueado");
      return dispatch({ type: "LOGOUT", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function delTorrent() {
  return function (dispatch) {
    return dispatch({ type: "DEL_TORRENT" });
  };
}
