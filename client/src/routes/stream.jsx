import React, { useEffect, useState } from "react";
import "../styles/stream.css";
import { useDispatch, useSelector } from "react-redux";
import { getSubs, getVtt } from "../redux/actions.js";

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

  var caption = [];

  const handleClick = async (e) => {
    dispatch(getVtt(e))
    caption = await vtt;
  };
  console.log(vtt);


  return (
    <div className="streamer">
      <h1>{title}</h1>
      <video id="videoPlayer" width="650" controls>
        <source src={buffer} type="video/mp4" />
        <track label="Español" kind="subtitles" srclang="es" src={caption} default />
      </video>
      
      <div className="subs">
        {subs.map((sub) => (
          <div className="sub">
            <button onClick={(e) => handleClick(e.target.value)} value={sub?.attributes?.files[0]?.file_id}>
              {sub?.attributes?.files[0]?.file_name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
