import React, { useEffect } from "react";
import { getMovie } from "../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";



export default function Detail(props) {
  const id = props.match.params.id;
  const movie = useSelector((state) => state.Movie);
  const image = movie?.image;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovie(id));
  }, [dispatch, id]);
  console.log(movie)
  return (
    <div>
      <div className="detail">
        <h1>{movie.title}</h1>
        <div>
          <img src={image} width={400} alt="" />
        </div>
        <div>
            <h3>{movie.plot}</h3>
        </div>
        <div>
          {movie.torrents?.map(e => (
            <li>
            {e.title}
            <a href={e.magnet}>Magnet Link</a>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}