import React from "react";

export default function Stream() {
    return <video id="videoPlayer" width="650" controls muted="muted" autoplay>
    <source
      src="https://movion-back.herokuapp.com/video"
      type="video/mp4"
    />
  </video>;
    }