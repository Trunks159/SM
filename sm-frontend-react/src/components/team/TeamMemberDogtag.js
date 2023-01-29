import React from "react";
import detailsIcon from "./assets/Details Icon.svg";

function DogTag({ firstName, lastName, position }) {
  return (
    <div>
      <h2>{firstName.charAt(0)}</h2>
      <p>{firstName}</p>
      <p>{lastName}</p>
      <caption>{position}</caption>
      <img src={detailsIcon} alt="details" />
    </div>
  );
}

export default DogTag;
