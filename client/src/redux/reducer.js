import { GET_MOVIES, GET_MOVIE, GET_SEARCH, GET_USER, GET_TORRENTS, DEL_TORRENT, GET_SUBS } from "./actions";

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
  if (action.type === DEL_TORRENT) {
    return {
      ...state,
      Torrents: [],
    };
  }
  if (action.type === GET_TORRENTS) {
    const torrents = action.payload.map((torrent) => {
    for(let i = 0; i < action.payload.length; i++) {
      if(action.payload[i].size.includes("GB")) {
        action.payload[i].size = Number(action.payload[i].size.slice(0, -2)) * 1000;
      }
      if(action.payload[i].size.includes("MB")) {
        action.payload[i].size = Number(action.payload[i].size.slice(0, -2));
      }

      

    }
    return torrent;
  });
    console.table(torrents)
    return {
      ...state,
      Torrents: action.payload,
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