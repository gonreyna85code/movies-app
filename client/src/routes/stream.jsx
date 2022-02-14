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
  const subs = useSelector((state) => state.Subs);
  const [subId, setSubId] = useState(null);
  const magnet =
    params.match.params.magnet.toString(params.location.search) +
    params.location.search.toString();
  

  useEffect(() => {
    dispatch(getSubs(title, id));
  }, [dispatch, title, id]);

  console.log(subs);

  const handleClick = async (e) => {
    setSubId(e);
    console.log(e);
  };


  
  const link = development ? local + `video/${magnet}` : heroku + `video/${magnet}`

  
  
  
  
  
  return (
    <div className="streamer">
      <h1>{title}</h1>
      <video controls crossOrigin="anonymous"  width={650} preload="auto" >
        <source
          src={link}
          type="video/mp4"
        />
        <track
          label="English"
          kind="subtitles"
          srcLang="en"
          src={
            development
              ? local + `subtitulo/${subId}`
              : heroku + `subtitulo/${subId}`
          }
          default
        ></track>
      </video>

      <div className="subs">
        {subs.map((sub) => (
          <div className="sub" key={sub?.attributes?.files[0]?.file_id}>
            <button              
              onClick={(e) => handleClick(e.target.value)}
              value={sub?.attributes?.files[0]?.file_id}>
              {sub?.attributes?.files[0]?.file_name === null ? "No name subtitle" : sub?.attributes?.files[0]?.file_name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
