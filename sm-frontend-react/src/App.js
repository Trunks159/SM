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
    current_day: {},
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
          current_user: data.current_user,
          inactive_users: users,
        });
      })
    );
  };

  componentDidMount() {
    this.getUsers();
    fetch("/scheduletron5000").then((response) =>
      response.json().then(({ days }) => {
        const current_day = days
          .find((day) => day.is_current === true)
          .weekday.toString();
        this.setState({
          days: days,
          current_day: current_day,
        });
        console.log("Days: ", this.state.days);
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
  addDayToDb = async (day) => {
    console.log("The day that is sent:", day);
    const rawResponse = await fetch("/create_day", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ day: day }),
    });
    const content = await rawResponse.json();
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
                {dictionary[this.state.current_day]}
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
                path="/day/:date"
                render={(props) => {
                  const day = this.state.days.find(
                    (day) => day.date === props.match.params.date
                  );
                  console.log("Props date:", props.match.params.date);
                  this.addDayToDb(day);
                  this.setState({ current_day: day });
                  return <ScheduleTron5000 day={this.state.current_day} />;
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
