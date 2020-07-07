import React, { Component } from "react";
import "./App.css";
import Sliders from "./components/Sliders";
import Times from "./components/Times";
import Week from "./components/Week";
//import data from "./range-data.json";

class App extends Component {
  state = {
    users: [
      {
        first_name: "jordan",
        last_name: "giles",
        username: "Trunks159",
        position: "manager",
        color: "#00FFFF",
        anonymous: false,
        id: 1,
      },
      {
        first_name: "eric",
        last_name: "brown",
        username: "ebrown",
        position: "",
        color: "#FFA500",
        anonymous: false,
        id: 2,
      },
      {
        first_name: "william",
        last_name: "mcaden",
        username: "wmcaden",
        color: "#FF6347",
        position: "",
        anonymous: false,
        id: 3,
      },
      {
        first_name: "abeil",
        last_name: "adilo",
        username: "aadilo",
        color: "#FF6347",
        position: "",
        anonymous: false,
        id: 4,
      },
      {
        first_name: "josh",
        last_name: "cress",
        username: "jcress",
        color: "#FF6347",
        position: "",
        anonymous: false,
        id: 5,
      },
    ],
    current_user: {
      first_name: "jordan",
      last_name: "giles",
      username: "Trunks159",
      position: "manager",
      anonymous: false,
    },
  };
  componentDidMount() {
    fetch("/schedule").then((response) =>
      response.json().then((data) => {
        this.setState({ users: data.users });
      })
    );
  }
  render() {
    return (
      <div className="App">
        <div className="float-container">
          <Week
            week={[
              {
                weekday: "Monday",
                date: "November 3",
              },
              {
                weekday: "Tuesday",
                date: "November 4",
              },
              {
                weekday: "Wednesday",
                date: "November 5",
              },
            ]}
          />
          <Times />
          <Sliders />
        </div>
        {/*<Test users={this.state.users} />*/}
        {/*<MyBarChart data={data} />*/}
        {/*<Registration />*/}
      </div>
    );
  }
}

export default App;
