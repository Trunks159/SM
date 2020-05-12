import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";

class App extends Component {
  state = {
    current_user: {
      first_name: "jordan",
      last_name: "giles",
      username: "Trunks159",
      position: "manager",
      anonymous: false,
    },
  };
  render() {
    return (
      <div className="App">
        <NavBar current_user={this.state.current_user} />
      </div>
    );
  }
}

export default App;
