import React, { Component } from "react";
import "./App.css";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

class App extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    fetch("/users").then((response) =>
      response.json().then((data) => {
        this.setState({ users: data.users });
      })
    );
  }
  removeSlider(user) {
    const users = [...this.state.users];
    users.splice(users.indexOf(user), 1);
    this.setState({ users: users });
  }

  render() {
    return (
      <div className="App">
        {this.state.users.map((user) => (
          <div className="slider" id="di">
            <Typography id="range-slider" gutterBottom>
              <button className="btn" onClick={() => this.removeSlider(user)}>
                {user.first_name[0].toUpperCase() + user.first_name.slice(1)}
              </button>
            </Typography>
            <Slider
              orientation="vertical"
              defaultValue={[0, 50]}
              aria-labelledby="vertical-slider"
            />
          </div>
        ))}
      </div>
    );
  }
}

export default App;
