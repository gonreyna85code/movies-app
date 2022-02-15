import {
  GET_MOVIES,
  GET_MOVIE,
  GET_SEARCH,
  GET_USER,
  GET_TORRENTS,
  DEL_TORRENT,
  GET_SUBS,
} from "./actions";

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
    const torrent = () => {
        if (
        action.payload === "Not Found" ||
        action.payload === "No Disponible"
      ) {
        return action.payload;
      } else {
        
         for (let i = 0; i < action.payload.length; i++) {
          if (
            typeof action.payload[i].size === "string" &&
            action.payload[i].size.endsWith("GB")
          ) {
            action.payload[i].size = action.payload[i].size.slice(0, -3);
            action.payload[i].size = Number(action.payload[i].size) * 1000;
          }
          if (
            typeof action.payload[i].size === "string" &&
            action.payload[i].size.endsWith("MB")
          ) {
            action.payload[i].size = action.payload[i].size.slice(0, -3);
            action.payload[i].size = Number(action.payload[i].size);
          }
        }
        action.payload.sort((a, b) => {
          return a.size - b.size;
        });
        return action.payload;
      }
    };
    console.log(torrent())
    return {
      ...state,
      Torrents: torrent(),
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
