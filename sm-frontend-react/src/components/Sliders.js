import React from "react";
import VerticleSlider from "./VerticleSlider";

const Sliders = ({ handler, users }) => (
  <div className="sliders">
    {users.length > 0 ? (
      users.map((user) => <VerticleSlider handler={handler} user={user} />)
    ) : (
      <h1>You Gotta Add Some Workers</h1>
    )}
  </div>
);

export default Sliders;
