import React, { Component } from "react";
import "./App.css";
import { Alert, AlertTitle } from "@material-ui/lab";
import NavBar from "./components/NavBar";
import Thumbnail from "./components/Thumbnail";
import ScheduleTron5000 from "./components/scheduletron5000/Scheduletron5000";
import PastDays from "./components/home/PastDays";
import User from "./components/user/User";
import Week from "./components/Week";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

import { BrowserRouter as Router, Route } from "react-router-dom";

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

  logoutUser = () => {
    fetch("/logout").then((response) =>
      response.json().then((data) => {
        this.setState({ current_user: data.current_user });
      })
    );
  };

  getUsers = () => {
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
  };

  componentDidMount() {
    this.getUsers();
    fetch("/scheduletron5000").then((response) =>
      response.json().then((data) => {
        this.setState({ days: data.days });
      })
    );
  }

  makeSlider = (user) => {
    let inactive_users = [...this.state.inactive_users];
    const index = this.state.inactive_users.indexOf(user);
    inactive_users.splice(index, 1);
    this.setState({ inactive_users: inactive_users });
    let active_users = [...this.state.active_users];
    active_users.push(user);
    this.setState({ active_users: active_users });
  };

  loginUser = (user) => {
    this.setState({ current_user: user });
  };
  render() {
    const dictionary = {
      "0": "Monday",
      "1": "Tuesday",
      "2": "Wednesday",
      "3": "Thursday",
      "4": "Friday",
      "5": "Saturday",
      "6": "Sunday",
    };

    return (
      <Router>
        <div className="App">
          <div className="main-flex">
            <NavBar
              current_user={this.state.current_user}
              handler={this.makeSlider}
              users={this.state.inactive_users}
              logoutUser={this.logoutUser}
              Thumbnail={Thumbnail}
            />
            {this.state.days.length > 0 ? (
              <p className="current-day">
                {
                  dictionary[
                    this.state.days
                      .filter((day) => day.is_current === true)[0]
                      .weekday.toString()
                  ]
                }
              </p>
            ) : null}
            <div className="content">
              <Route exact path="/" render={() => <PastDays />} />

              <Route
                path="/user/:username"
                render={(props) => {
                  const user = this.state.inactive_users.find(
                    (user) => user.username === props.match.params.username
                  );
                  return <User Thumbnail={Thumbnail} user={user} />;
                }}
              />
              <Route
                path="/login"
                render={() => <Login loginUser={this.loginUser} />}
              />
              <Route
                path="/register"
                render={() => <Register getUsers={this.getUsers} />}
              />
              <Route path="/scheduletron5000" component={ScheduleTron5000} />
            </div>
            <Week week={this.state.days} dictionary={dictionary} />
          </div>
          {/*
  
          
          

          {/*
          <div className="main">

            
            <Route path="/" render={() => <Days days={this.state.days} />} />
          
          
          <Route
            exact
            path="/scheduletron5000"
            component={<ScheduleTron5000 />}
          />
        
            
            </div>*/}
        </div>
      </Router>
    );
  }
}

export default App;
