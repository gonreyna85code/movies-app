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
    const torrents = action.payload
      for(let i = 0; i < action.payload.length; i++) {      
      if(typeof torrents[i].size === 'string' && torrents[i].size.endsWith("GB") ){
      torrents[i].size = torrents[i].size.slice(0, -3);
      torrents[i].size  = Number(torrents[i].size)*1000}
      if(typeof torrents[i].size === 'string' && torrents[i].size.endsWith("MB")){
      torrents[i].size = torrents[i].size.slice(0, -3)
      torrents[i].size  = Number(torrents[i].size)}     
    } 
    torrents.sort((a, b) => {
      return a.size - b.size;
    });
    
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