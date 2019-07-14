import React from "react";
const Meme = props => (
  <div key={props.meme.id}>
    <p>{`${props.meme.url} by steven`}</p>
  </div>
);
export default Meme;
