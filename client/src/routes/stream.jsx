import React from "react";
import "../styles/stream.css";

export default function Stream(params) {
  console.log(params);
  const magnet =
    params.match.params.magnet.toString(params.location.search) +
    params.location.search.toString();
    const buffer = `https://movion-back.herokuapp.com/video/${magnet}`
    console.log(buffer)




  return (
    <div className="streamer">
    <video id="videoPlayer" width="650" controls muted="muted" autoPlay>
      <source src={buffer} type="video/mp4" />
    </video>
    </div>
  );
}
