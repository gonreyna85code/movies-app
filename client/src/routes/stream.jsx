import React, { useEffect, useState } from "react";
import "../styles/stream.css";
import { useDispatch, useSelector } from "react-redux";
import { getSubs } from "../redux/actions.js";

export default function Stream(params) {
  const dispatch = useDispatch();
  const title = params.match.params.title;
  const id = params.match.params.id;
  const subs = useSelector((state) => state.Subs);
  const [sub, setSub] = useState(null);
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
    console.log(e)
    const sub = `https://movion-back.herokuapp.com/subtitulo/${e}`;
    setSub(sub);
    console.log(sub);
  };
  

  return (
    <div className="streamer">
      <h1>{title}</h1>
      <video id="videoPlayer" width="650" controls muted="muted" autoPlay>
        <source src={buffer} type="video/mp4" />
      </video>
      <div className="subs">
        {subs.map((sub) => (
          <div className="sub">
            <button onClick={(e) => handleClick(e.target.value)} value={sub?.attributes?.files[0]?.file_id}>
              <span value={sub?.attributes?.files[0]?.file_id}>{sub?.attributes?.files[0]?.file_name}</span>{" "}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
