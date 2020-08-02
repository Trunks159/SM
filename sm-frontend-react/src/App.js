import React, { Component } from "react";
import "./App.css";
import { Alert, AlertTitle } from "@material-ui/lab";
import NavBar from "./components/NavBar";
import ScheduleTron5000 from "./components/scheduletron5000/Scheduletron5000";
import Days from "./components/home/Days";
import Week from "./components/Week";
import Thumbnail from "./components/Thumbnail";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

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

  makeSlider = (user) => {
    let inactive_users = [...this.state.inactive_users];
    const index = this.state.inactive_users.indexOf(user);
    inactive_users.splice(index, 1);
    this.setState({ inactive_users: inactive_users });
    let active_users = [...this.state.active_users];
    active_users.push(user);
    this.setState({ active_users: active_users });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="flex-box">
            <NavBar
              current_user={this.state.current_user}
              handler={this.makeSlider}
              users={this.state.inactive_users}
              Thumbnail={Thumbnail}
              logoutUser={this.logoutUser}
            />
            <div className="current-day">
              <h1>Monday</h1>
            </div>
            <Route path="/login" render={() => <Login />} />
            <Route path="/register" render={() => <Register />} />
            <Week />
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
