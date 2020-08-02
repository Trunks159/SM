import React, { Component } from "react";
import "./App.css";
import { Alert, AlertTitle } from "@material-ui/lab";
import NavBar from "./components/NavBar";
import Day from "./components/Day";
import Week from "./components/Week";
import Times from "./components/scheduletron5000/Times";
import Sliders from "./components/scheduletron5000/Sliders";
import Days from "./components/home/Days";
import Thumbnail from "./components/Thumbnail";
import Login from "./components/login/Login";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  state = {
    days: [],
    message: null,
    date: [2020, 11, 3],
    img: "",
    active_users: [],
    inactive_users: [],
    current_user: {},
  };

  async firstAsync() {
    const values = this.state.active_users.map((user) => ({
      id: user.id,
      value: user.value,
    }));
    const rawResponse = await fetch("/receive_data", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date: this.state.date, values: values }),
    });
    const content = await rawResponse.json();

    console.log(content);
  }

  logoutUser = () => {
    fetch("/logout").then((response) =>
      response.json().then((data) => {
        this.setState({ current_user: data.current_user });
      })
    );
  };

  componentDidMount() {
    fetch("/users").then((response) =>
      response.json().then((data) => {
        let users = data.users.map((user) => {
          user["value"] = ["08:00", "16:00"];
          return user;
        });
        this.setState({
          inactive_users: users,
          current_user: data.current_user,
        });
      })
    );
    fetch("/scheduletron5000").then((response) =>
      response.json().then((data) => {
        this.setState({ days: data.days });
      })
    );
  }

  saveChanges = (e) => {
    this.setState({
      message: "This day's schedule has been saved!",
    });
    setTimeout(() => {
      this.setState({ message: null });
    }, 1600);
    this.firstAsync();
  };

  weSliding = (e, new_value, user) => {
    let users = [...this.state.active_users];
    const index = users.indexOf(user);
    users.splice(index, 1);
    user.value = new_value;
    users.splice(index, 0, user);
    this.setState({ active_users: users });
  };

  makeSlider = (user) => {
    let inactive_users = [...this.state.inactive_users];
    const index = this.state.inactive_users.indexOf(user);
    inactive_users.splice(index, 1);
    this.setState({ inactive_users: inactive_users });
    let active_users = [...this.state.active_users];
    active_users.push(user);
    this.setState({ active_users: active_users });
  };

  removeSlider = (user) => {
    let active_users = [...this.state.active_users];
    const index = this.state.active_users.indexOf(user);
    active_users.splice(index, 1);
    this.setState({ active_users: active_users });
    let inactive_users = [...this.state.inactive_users];
    inactive_users.push(user);
    this.setState({ inactive_users: inactive_users });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="tes">
            <NavBar
              current_user={this.state.current_user}
              handler={this.makeSlider}
              users={this.state.inactive_users}
              Thumbnail={Thumbnail}
              logoutUser={this.logoutUser}
            />
            <Route
              exact
              path="/"
              render={() => <Days days={this.state.days} />}
            ></Route>
            <Switch>
              <Route
                exact
                path="/other"
                render={() => (
                  <div>
                    {this.state.message && (
                      <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        {this.state.message}
                      </Alert>
                    )}
                    <div className="wrapper">
                      <Day />
                      <div className="box-3">
                        <Times />
                        <Sliders
                          handler={this.removeSlider}
                          users={this.state.active_users}
                          weSliding={this.weSliding}
                        />
                        <button className="btn" onClick={this.saveChanges}>
                          Save Changes
                        </button>
                      </div>
                      <Week
                        week={[
                          {
                            weekday: "Tues.",
                            date: "Nov 4",
                          },
                          {
                            weekday: "Wed.",
                            date: "Nov 5",
                          },
                          {
                            weekday: "Thurs.",
                            date: "Nov 6",
                          },
                          {
                            weekday: "Fri.",
                            date: "Nov 7",
                          },
                          {
                            weekday: "Sat.",
                            date: "Nov 8",
                          },
                          {
                            weekday: "Sun.",
                            date: "Nov 9",
                          },
                        ]}
                      />
                    </div>
                  </div>
                )}
              />
              <Route
                exact
                path="/login"
                component={<Login current_user={this.state.current_user} />}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
