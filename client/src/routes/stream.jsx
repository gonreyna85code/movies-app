import React, { useEffect } from "react";
import "../styles/stream.css";
import { useDispatch, useSelector } from "react-redux";
import { getSubs, getVtt } from "../redux/actions.js";
import subtitle from "./subtitle.vtt";

export default function Stream(params) {
  const dispatch = useDispatch();
  const title = params.match.params.title;
  const id = params.match.params.id;
  const subs = useSelector((state) => state.Subs);
  const vtt = useSelector((state) => state.Vtt);
  const magnet =
    params.match.params.magnet.toString(params.location.search) +
    params.location.search.toString();
  const buffer = `https://movion-back.herokuapp.com/video/${magnet}`;
  console.log(buffer);

  useEffect(() => {
    dispatch(getSubs(title, id));
  }, [dispatch, title, id]);

  console.log(subs);

  const handleClick = async (e) => {
    dispatch(getVtt(e));
    console.log(vtt);
  };

  return (
    <div className="streamer">
      <h1>{title}</h1>
      <video controls crossorigin="anonymous" >
        <source src={`https://movion-back.herokuapp.com/video/${magnet}`} type="video/mp4" />        
        <track label="English" kind="subtitles" srclang="en" src='https://movion-back.herokuapp.com/subtitulo/7143421' default></track>
      </video>


      <div className="subs">
        {subs.map((sub) => (
          <div className="sub">
            <button
              onClick={(e) => handleClick(e.target.value)}
              value={sub?.attributes?.files[0]?.file_id}
            >
              {sub?.attributes?.files[0]?.file_name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
