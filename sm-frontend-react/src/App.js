import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Message from "./components/Message";
import Thumbnail from "./components/Thumbnail";
import ScheduleTron5000 from "./components/scheduletron5000/Scheduletron5000";
import PastDays from "./components/home/PastDays";
import User from "./components/user/User";
import AvailabilityForm from "./components/user/UserAvailability";
import Week from "./components/Week";
import CurrentDay from "./components/CurrentDay";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import AddUserPaper from "./components/AddUserPaper";

class App extends Component {
  state = {
    days: [],
    users: [],
    current_user: { is_authenticated: false },
    current_day: null,
    message: null,
    redirect: null,
  };

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
    /*result.json().then(({ day }) => {
      this.setState({ current_day: day });
    });*/

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

  getToday() {
    let today = new Date();
    return {
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
    };
  }

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
    return (
      <Router>
        <div className="App">
          <NavBar
            current_user={this.state.current_user}
            users={this.state.users}
            getReq={this.getReq}
            postReq={this.postReq}
            Thumbnail={Thumbnail}
            notifyUser={this.notifyUser}
          />
          <Message message={this.state.message} />
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
                    <User user={user} current_user={this.state.current_user} />
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
                  return (
                    <AvailabilityForm
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
          </Switch>
          {/*
            <div className="content">
              
              <Route exact path="/" render={() => <PastDays />} />
              <Route
                path="/user/:username"
                render={(props) => {
                  const user = this.state.users.find(
                    (user) => user.username === props.match.params.username
                  );
                  if (user) {
                    return <User Thumbnail={Thumbnail} user={user} />;
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
                path="/day/:date"
                render={(props) => {
                  const { date } = props.match.params;
                  let the_day = this.state.days.find(
                    (d) =>
                      d.month.toString() +
                        d.day.toString() +
                        d.year.toString() ===
                      date
                  );

                  if (the_day) {
                    the_day.workblocks = the_day.workblocks.map((wb) => {
                      wb.user = this.state.users.find(
                        (user) => user.id === wb.user_id
                      );
                      return wb;
                    });
                    const u = this.state.users.filter((user) => {
                      let users = the_day.workblocks.map((wb) => wb.user);
                      if (users.length > 0) {
                        if (users.includes(user)) {
                          return false;
                        }
                      }
                      return true;
                    });

                    return (
                      <ScheduleTron5000
                        day={the_day}
                        users={u}
                        workblocks={the_day.workblocks}
                        current_user={this.state.current_user}
                        postReq={this.postReq}
                      />
                    );
                  }
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
                  return <Register users={this.state.users} postReq={this.postReq}/>;
                }}
              />
            </div>*/}
          {/* 
            <CurrentDay day={this.state.current_day} dictionary={dictionary} />
            <Week
              days={this.state.days}
              dictionary={dictionary}
              wipeDays={this.wipeDays}
              reqDay={this.reqDay}
            />*/}
        </div>
      </Router>
    );
  }
}

export default App;
