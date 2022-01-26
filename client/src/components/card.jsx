import React from "react";

export default function Card(props) {
  const { Imagen } = props;
  return (
    <div className="card">
      <div>
        <img src={Imagen} width="100%" alt="No imagen" className="card-img" />
      </div>
    </div>
  );
}
 