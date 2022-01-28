import React, { useEffect } from "react";
import WebTorrent from "webtorrent";
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
  console.log(Number(id));
  const movie = useSelector((state) => state.Movie);
  const torrents = useSelector((state) => state.Torrents);
  const user = useSelector((state) => state.User);
  console.log(Number(movie?.id));
  const image = "https://image.tmdb.org/t/p/w500" + movie?.poster_path;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovie(id));
    //dispatch(delTorrent());
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

  console.log(torrents);
  const handleTorrent = (e) => {
    console.log(e);
    var client = new WebTorrent();
    client.add(e, function (torrent) {
      console.log(torrent.files); // Torrents can contain many files. Let's use the .mp4 file
      var file = torrent.files.find(function (file) {
        return file.name.endsWith(".mp4", ".mkv");
      });
      // Display the file by adding it to the DOM. Supports video, audio, image, etc. files
      file.appendTo("body");
    });
  };

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
                  Some error ocurred wile searching for torrents, click the
                  TORRENTS button to search again!
                </h3>
              ) : torrents.length === 0 ? (
                <h3>Click TORRENTS to search for downloads!</h3>
              ) : (
                torrents?.map((e) => (
                  <li>
                    {e.title} <br />
                    <button onClick={(e) => handleTorrent(e?.magnet)}>Magnet Link</button>
                    {e.size}
                  </li>
                ))
              )}
            </div>
            <button className="det-but" onClick={handleClick}>
              TORRENTS
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
