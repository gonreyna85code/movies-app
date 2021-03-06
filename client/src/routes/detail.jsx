import React, { useEffect } from "react";
import {
  getMovie,
  getTorrents,  
  delTorrent,
  getUser,
  logout,
} from "../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/detail.css";


export default function Detail(props) {
  const id = props.match.params.id;
  const movie = useSelector((state) => state.Movie);
  const torrents = useSelector((state) => state.Torrents);
  const user = useSelector((state) => state.User);
  const image = "https://image.tmdb.org/t/p/w500" + movie?.poster_path;
  console.log(image)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovie(id));
    dispatch(delTorrent());
    dispatch(getUser());
  }, [dispatch, id]);

  const handleClick = () => {
    dispatch(getTorrents(movie?.title));
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  while (Number(id) !== Number(movie?.id)) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div>
      <div className="detail">
        <div className="user">
          {user === "No Disponible" ? (
            <Link to="/login">
              <button className="loger">LOGIN</button>
            </Link>
          ) : (
            <button className="loger" onClick={handleLogout}>
              LOGOUT
            </button>
          )}
        </div>
        <div className="movie-container">
          <div className="img">
            <img className="imagen" src={image} width={400} alt="" />
          </div>
          <div className="right">
            <div className="movie-info">
              <h2 className="title">{movie?.title}</h2>
              <div>
                <h3>{movie?.overview}</h3>
              </div>
            </div>
            <div className="torrents">
              {torrents === "No Disponible" ? (
                <h3>Login to get Premium functions</h3>
              ) : torrents === "Not Found" ? (
                <h3>
                  Some error ocurred wile searching for movies, click the
                  SEARCH button to search again!
                </h3>
              ) : torrents.length === 0 ? (
                <h3>Click SEARCH to search for downloads!</h3>
              ) : (
                torrents?.map((e) => (
                  <li key={e.desc} >
                    {e.title} <br />
                    &emsp;&emsp;&emsp;
                    <a href={e.magnet}>
                    <button className="magnet-but">
                      Magnet Link
                    </button>
                    </a>
                    {e.size < 3500 ? <Link         
                      to={`/video/${movie.original_title}/${movie.imdb_id}${movie?.poster_path}/${e.magnet}`}
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      &emsp;&emsp;<button className="watch-but">
                      Watch
                    </button>
                    </Link> : null}
                    &emsp;{e.size + "  MB"}
                  </li>
                ))
              )}
            </div>
            <button className="det-but" onClick={handleClick}>
              SEARCH
            </button>
            <Link to="/">
              <button className="det-but">RETURN HOME</button>
            </Link>
          </div>
        </div>
      </div>      
    </div> 
    
 );
}
