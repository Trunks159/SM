import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navBar/NavBar";
import Message from "./components/Message";
import Thumbnail from "./components/Thumbnail";
import WeekView from "./components/weekView/WeekView";
import User from "./components/user/User";
import AvailabilityForm from "./components/user/UserAvailability";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";


const colorPalette = {
  primary: "#328F83",
  secondary: "#D8F4EE",
  secondaryLight: "#EEF9F7",
  grey: "#979797",
  blue: "#00BCFF",
  orange: "#FFB932",
  red: "#FF0000",
  brightGreen: "#5EFF00",
};

class App extends Component {
  state = {
    days: [],
    users: [],
    current_url : '/',
    current_user: { is_authenticated: false },
    current_day: null,
    message: null,
    redirect: null,
    popup :null,
  };

  changeCurrentUrl = (newUrl)=>{
    this.setState({current_url :newUrl});
  }

  fetchDays = async () => {
    const x = await fetch("/get_days");
    x.json().then(({ days }) => {
      if (days !== this.state.days) {
        this.setState({
          days: days,
        });
      }
    });
  };


  fetchUsers = async () => {
    const x = await fetch("/users");

    x.json().then(({ users, current_user }) => {
      if (
        this.state.users !== users ||
        this.state.current_user !== current_user
      ) {
        this.setState({ users: users, current_user: current_user });
      }
    });
  };

  /*Most POST Requests Go Through This
    Fetches Users and Days After Each Reqeust*/
  postReq = async (url, content) => {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });

    this.fetchDays();
    this.fetchUsers();

    return rawResponse;
  };

  /*Most GET Requests Go Through This
    Fetches Users and Days After Each Reqeust*/
  getReq = async (url) => {
    const rawResponse = await fetch(url);

    this.fetchDays();
    this.fetchUsers();

    return rawResponse;
  };

  /*REQUESTS DAY FROM DB AND CHANGES CURRENTDAY IN STATE
    CALLED FROM WEEK COMPONENT*/
  reqDay = ({ day, month, year }) => {
    const result = this.postReq("/access_day", {
      day: day,
      month: month,
      year: year,
    });

    result.then((response) => {
      if (response.ok === true) {
        response.json().then(({ day }) => {
          this.setState({ current_day: day });
        });
      } else {
        this.notifyUser({
          content: "Error, Couldn't get day from database",
          title: "Warning",
          severity: "warning",
        });
        this.setState({ redirect: <Redirect to="/" /> });
      }
    });

    return this.state.current_day;
  };

  wipeDays = () => {
    this.getReq("/wipe_days");
    this.notifyUser({
      content: "Days have been wiped",
      title: "Success",
      severity: "success",
    });
  };

  notifyUser = (message) => {
    this.setState({
      message: message,
    });
    setTimeout(() => {
      this.setState({ message: null });
    }, 4000);
  };

  getToday() {
    let today = new Date();
    return {
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
    };
  }

  /*Fetches Days and Users and Sets Current Day To Today */
  componentDidMount = async () => {
    await this.fetchUsers();
    const x = await fetch("/get_days");
    x.json().then(({ days }) => {
      if (days !== this.state.days) {
        let today = this.getToday();
        today = days.find(
          (d) =>
            d.day === today.day &&
            d.month === today.month &&
            d.year === today.year
        );
        this.setState({
          current_day: today,
          days: days,
        });
      }
    });
  };

  render() {
    const dictionary = {
      0: "Monday",
      1: "Tuesday",
      2: "Wednesday",
      3: "Thursday",
      4: "Friday",
      5: "Saturday",
      6: "Sunday",
    };
    const imgSrc = "http://localhost:5000/static/images/ScheduleTron";
    return (
      <Router>
        <div className="App">
        
          <NavBar
            colorPalette = {colorPalette}
            imgSrc = {imgSrc}
            current_user={this.state.current_user}
            users={this.state.users}
            getReq={this.getReq}
            postReq={this.postReq}
            Thumbnail={Thumbnail}
            notifyUser={this.notifyUser}
          />
          {this.state.popup}
            <Message message={this.state.message} />
            <Route
              path="/"
              render={() => {
                return (
                  <WeekView
                    imgSrc = {imgSrc}
                    colorPalette={colorPalette}
                    users = {this.state.users}
                  />
                );
              }}
            />
            <Route
              path="/login"
              render={() => {
                if (this.state.current_user.is_authenticated) {
                  return <Redirect to="/" />;
                }
                return (
                  <Login
                    users={this.state.users}
                    notifyUser={this.notifyUser}
                    postReq={this.postReq}
                  />
                );
              }}
            />
            <Route
              path="/register"
              render={() => {
                if (this.state.current_user.is_authenticated) {
                  return <Redirect to="/" />;
                }
                return (
                  <Register
                    users={this.state.users}
                    postReq={this.postReq}
                    notifyUser={this.notifyUser}
                  />
                );
              }}
            />
            <Switch>
              <Route
                exact
                path="/user/:username"
                render={(props) => {
                  const user = this.state.users.find(
                    (user) => user.username === props.match.params.username
                  );
                  if (user) {
                    return (
                      <User
                        user={user}
                        current_user={this.state.current_user}
                      />
                    );
                  } else {
                    console.log("Couldn't find user");
                    this.notifyUser({
                      content: "Couldn't find user...",
                      severity: "error",
                      title: "error",
                    });
                    return <Redirect to="/" />;
                  }
                }}
              />
              <Route
                path="/user/:username/availability"
                render={(props) => {
                  const user = this.state.users.find(
                    (user) => user.username === props.match.params.username
                  );
                  if (user) {
                    const convertAvailability = (timeData) => {
                      /*if (timeData) {
                        let times = timeData.split("-");
                        let t1 = new Date("01 Jan 1970 " + times[0] + ":00");
                        let t2 = new Date("01 Jan 1970 " + times[1] + ":00");
                        let v1 =
                          ((t1.getHours() - 7 + t1.getMinutes() / 60) / 16.5) *
                          100;
                        let v2 =
                          ((t2.getHours() - 7 + t2.getMinutes() / 60) / 16.5) *
                          100;
                        console.log("V1 AND V2:", [v1, v2]);
                        return [v1, v2];
                      }*/
                      return [0, 50];
                    };
                    return (
                      <AvailabilityForm
                        user={user}
                        current_user={this.state.current_user}
                        postReq={this.postReq}
                        notifyUser={this.notifyUser}
                        availability={user.availability}
                        convertAvailability={convertAvailability}
                      />
                    );
                  } else {
                    console.log("Couldn't find user");
                    this.notifyUser({
                      content: "Couldn't find user...",
                      severity: "error",
                      title: "error",
                    });
                    return <Redirect to="/" />;
                  }
                }}
              />
            </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
