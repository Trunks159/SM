import React, { Component } from "react";
import VerticleSlider from "./VerticleSlider";

class Sliders extends Component {
  state = {
    sliders: [
      {
        id: null,
        nalue: [],
      },
    ],
  };

  handleChange = (event, new_value, id) => {
    let i = 0;
    for (let slider of this.state.sliders) {
      if (slider.id == id) {
        slider.value = new_value;
        console.log(slider);
      }
    }
  };

  render() {
    const { handler, users } = this.props;
    return (
      <div className="sliders">
        {users.length > 0 ? (
          users.map((user) => {
            /*this.setState({
              sliders: [
                ...this.state.sliders,
                { id: user.id, value: [800, 1600] },
              ],
            });*/
            return (
              <VerticleSlider
                handler={handler}
                user={user}
                handleChange={this.handleChange}
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
