import { GET_MOVIES, GET_MOVIE, GET_SEARCH, GET_USER, GET_TORRENTS, DEL_TORRENT, GET_SUBS, GET_VTT } from "./actions";

const initialState = {
  Movies: [],
  Movie: {},
  User: {},
  Torrents: [],
  Subs: [],
  Vtt: {},
};

function rootReducer(state = initialState, action) {
  if (action.type === GET_MOVIES) {
    return {
      ...state,
      Movies: action.payload,
    };
  }
  if (action.type === GET_MOVIE) {
    return {
      ...state, 
      Movie: action.payload,
    };
  }
  if (action.type === GET_SUBS) {
    return {
      ...state, 
      Subs: action.payload,
    };
  }
  if (action.type === GET_VTT) {
    return {
      ...state, 
      Vtt: action.payload,
    };
  }
  if (action.type === DEL_TORRENT) {
    return {
      ...state,
      Torrents: [],
    };
  }
  if (action.type === GET_TORRENTS) {
    const torrents = action.payload.map((torrent) => {torrent.size.slice(0, 3); return torrent});
    console.log(torrents)
    return {
      ...state,
      Torrents: torrents,
    };
  }
  if (action.type === GET_USER) {
    return {
      ...state,
      User: action.payload,
    };
  }
  if (action.type === GET_SEARCH) {
    return {
      ...state,
      Movies: action.payload,
    };
  }
  return state;
}

export default rootReducer;