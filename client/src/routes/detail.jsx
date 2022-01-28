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
const parseTorrent = require("parse-torrent");

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

  var link = parseTorrent(
    "magnet:?xt=urn:btih:0D1279FC43D98EEC98329E7846D02C834962A21F&dn=Peacemaker.2022.S01E04.720p.WEB.x265-MiNX%5BTGx%5D&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.birkenwald.de%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.moeking.me%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentor.org%3A2710%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2970%2Fannounce&tr=https%3A%2F%2Ftracker.foreverpirates.co%3A443%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce"
  );

  const handleTorrent = () => {
    var link2 = "0d1279fc43d98eec98329e7846d02c834962a21f";
    var client = new WebTorrent();
    client.add(link2, function (torrent) {
      console.log(torrent.files); 
      var file = torrent.files.find(function (file) {
        return file.name.endsWith(".mp4", ".mkv");
      });      
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
                    <button
                      onClick={handleTorrent}
                      value={e.magnet}
                    >
                      Magnet Link
                    </button>
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
