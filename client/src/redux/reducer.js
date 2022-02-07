import { GET_MOVIES, GET_MOVIE, GET_SEARCH, GET_USER, GET_TORRENTS, DEL_TORRENT, GET_SUBS } from "./actions";

const initialState = {
  Movies: [],
  Movie: {},
  User: {},
  Torrents: [],
  Subs: [],
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
  if (action.type === DEL_TORRENT) {
    return {
      ...state,
      Torrents: [],
    };
  }
  if (action.type === GET_TORRENTS) {
    return {
      ...state,
      Torrents: action.payload.sort((a, b) => b.size - a.size),
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