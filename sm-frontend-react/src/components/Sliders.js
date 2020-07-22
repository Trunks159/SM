import React, { Component } from "react";
import VerticleSlider from "./VerticleSlider";

class Sliders extends Component {
  state = {};

  render() {
    const { handler, users, weSliding } = this.props;
    return (
      <div className="sliders">
        {users.length > 0 ? (
          users.map((user) => {
            return (
              <VerticleSlider
                weSliding={weSliding}
                handler={handler}
                user={user}
                key={user.id}
              />
            );
          })
        ) : (
          <h1>You Gotta Add Some Workers</h1>
        )}
      </div>
    );
  }
}

export default Sliders;
