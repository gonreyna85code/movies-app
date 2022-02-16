import React, { useEffect, useState } from "react";
import "../styles/stream.css";
import { useDispatch, useSelector } from "react-redux";
import { getSubs } from "../redux/actions.js";

export default function Stream(params) {
  const development = process.env.NODE_ENV !== "production";
  const local = "http://localhost:4000/";
  const heroku = "https://movion-back.herokuapp.com/";
  const dispatch = useDispatch();
  const title = params.match.params.title;
  const id = params.match.params.id;
  const poster =
    "https://image.tmdb.org/t/p/w500/" + params.match.params.poster;
  const subs = useSelector((state) => state.Subs);
  const [subId, setSubId] = useState(null);
  const magnet =
    params.match.params.magnet.toString(params.location.search) +
    params.location.search.toString();

  useEffect(() => {
    dispatch(getSubs(title, id));
  }, [dispatch, title, id]);

  const handleClick = async (e) => {
    setSubId(e);
    console.log(e);
  };
  var cont = 1;
  const count = function () {
    return "Subtitle option N°:" + cont++;
  };
  return (
    <div className="streamer">
      <div className="video-player">
        <h1>{title}</h1>
        <video
          controls
          crossOrigin="anonymous"
          controlsList="nodownload"
          width={650}
          height={400}
          preload="none"
          autoPlay={true}
          poster={poster}
        >
          <source
            src={
              development
                ? local + `video/${magnet}`
                : heroku + `video/${magnet}`
            }
            type="video/mp4"
          />
          <track
            label="Spanish"
            kind="subtitles"
            srcLang="es"
            src={
              development
                ? local + `subtitulo/${subId}`
                : heroku + `subtitulo/${subId}`
            }
            default
          ></track>
          Your browser does not support this video file.
        </video>
      </div>
      <div className="subs">
        <h3>Subtitles</h3>
        {subs.map((sub) => (
          <div className="sub" key={sub?.attributes?.files[0]?.file_id}>
            <button
              className="stream-but"
              onClick={(e) => handleClick(e.target.value)}
              value={sub?.attributes?.files[0]?.file_id}
            >
              {count()}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
