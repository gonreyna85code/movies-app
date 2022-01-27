import React, { useEffect } from "react";
import { getMovie } from "../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/detail.css";

export default function Detail(props) {
  const id = props.match.params.id;
  console.log(id);
  const movie = useSelector((state) => state.Movie);
  const image = "https://image.tmdb.org/t/p/w500" + movie?.poster_path;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovie(id));
  }, [dispatch, id]);
  console.log(movie);

  return ( id === movie.id ? (
    <div>
      <div className="detail">
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
              {!movie.torrents ? (
                <h3>No Conection</h3>
              ) : movie?.torrents === "No Disponible" ? (
                <h3>Login to get Premium functions</h3>
              ) : movie?.torrents === "Not Found" ? (
                <h3>
                  Some error ocurred wile searching for torrents, refresh the
                  page to search again!
                </h3>
              ) : (
                movie?.torrents?.map((e) => (
                  <li>
                    {e.title} <br />
                    <a href={e?.magnet}>Magnet Link</a>
                  </li>
                ))
              )}
            </div>
            <Link to="/">
              <button className="det-but">RETURN HOME</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <h1>Loading...</h1>
    </div>
  ));
}
