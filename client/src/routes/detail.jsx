import React, { useEffect } from "react";
import { getMovie } from "../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Detail(props) {
  const id = props.match.params.id;
  console.log(id);
  const movie = useSelector((state) => state.Movie);
  const image = 'https://image.tmdb.org/t/p/w500'+ movie?.poster_path;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovie(id));
  }, [dispatch, id]);
  console.log(movie)
  return (
    <div>
      <div className="detail">
      <Link to="/">
            <button >Volver al Home</button>
          </Link>
        <h1>{movie?.title}</h1>
        <div>
          <img src={image} width={400} alt="" />
        </div>
        <div>
            <h3>{movie?.overview}</h3>
        </div>
        <div>
          {movie?.torrents === 'No Disponible' ? <h3>Login to get Premium functions</h3> : movie?.torrents?.map(e => (
            <li>
            {e.title}
            <a href={e?.magnet}>Magnet Link</a>
            </li>
          ))}
        </div>
      </div>
    </div> 
  );
}