import React, { useEffect } from "react";
import "../styles/stream.css";
import { useDispatch, useSelector } from "react-redux";
import { getSubs } from "../redux/actions.js";

export default function Stream(params) {
  const dispatch = useDispatch();
  const title = params.match.params.title;
  const subs = useSelector((state) => state.Subs);
  const magnet =
    params.match.params.magnet.toString(params.location.search) +
    params.location.search.toString();
  const buffer = `https://movion-back.herokuapp.com/video/${magnet}`;
  console.log(buffer);

  useEffect(() => {
    dispatch(getSubs(title));
  }, [dispatch, title]);

  const subtitulos = subs?.data?.filter((sub) => sub?.attributes?.language === "en");

  console.log(subtitulos);

  return (
    <div className="streamer">
      <h1>{title}</h1>
      <video id="videoPlayer" width="650" controls muted="muted" autoPlay>
        <source src={buffer} type="video/mp4" />
      </video>
    </div>
  );
}
