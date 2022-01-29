import React from "react";
import "../styles/stream.css";

export default function Stream(params) {
  const magnet =
    params.match.params.magnet.toString(params.location.search) +
    params.location.search.toString();

  return (
    <div className="streamer">
    <video id="videoPlayer" width="650" controls muted="muted" autoPlay>
      <source src={`https://movion-back.herokuapp.com/video/${magnet}`} type="video/mp4" />
    </video>
    </div>
  );
}
