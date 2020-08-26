import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Thumbnail from "./components/Thumbnail";
import ScheduleTron5000 from "./components/scheduletron5000/Scheduletron5000";
import PastDays from "./components/home/PastDays";
import User from "./components/user/User";
import Week from "./components/Week";
import CurrentDay from "./components/CurrentDay";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
/*import { Alert, AlertTitle } from "@material-ui/lab";*/

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class App extends Component {
  state = {
    days: [],
    message: null,
    date: [2020, 11, 3],
    img: "",
    users: [],
    current_user: { is_authenticated: false },
    current_day: {},
  };
  fetchDays = () => {
    let today = new Date();
    today = {
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
    };

    fetch("/get_days").then((response) =>
      response.json().then(({ days }) => {
        console.log("Days: ", days);
        this.setState({
          days: days,
          current_day: days.find(
            (day) =>
              day.day === today.day &&
              day.month === today.month &&
              day.year === today.year
          ),
        });
      })
    );
  };
  fetchUsers() {
    fetch("/users").then((response) =>
      response.json().then((data) => {
        let users = data.users.map((user) => {
          user["value"] = ["08:00", "16:00"];
          return user;
        });
        this.setState({ users: users, current_user: data.current_user });
      })
    );
  }

  checkDb = async ({ day, month, year }) => {
    const rawResponse = await fetch("/access_day", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ day: day, month: month, year: year }),
    });
    const content = await rawResponse.json();
    console.log("Checkdb input data: ", content);
    this.setState({ current_day: content.day });
    console.log("The current day now: ", this.state.current_day);
  };

  changeCurrentDay = (day) => {
    if (day) {
      this.checkDb(day);
      return this.state.current_day;
    }
    this.fetchDays();
  };

  logoutUser = () => {
    fetch("/logout").then((response) =>
      response.json().then((data) => {
        this.setState({ current_user: data.current_user });
      })
    );
  };

  loginUser = (user) => {
    this.setState({ current_user: user });
  };

  componentDidMount() {
    this.fetchDays();
    this.fetchUsers();
  }

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
              users={this.state.users}
              logoutUser={this.logoutUser}
              Thumbnail={Thumbnail}
            />

            <div className="content">
              <Route exact path="/" render={() => <PastDays />} />
              <Route
                path="/user/:username"
                render={(props) => {
                  const user = this.state.users.find(
                    (user) => user.username === props.match.params.username
                  );
                  return <User Thumbnail={Thumbnail} user={user} />;
                }}
              />
              <Route
                path="/day/:month/:day/:year"
                render={(props) => {
                  const { month, day, year } = props.match.params;
                  const the_day = this.state.days.find((d) => {
                    if (d.month === parseInt(month, 10)) {
                      if (d.day === parseInt(day, 10)) {
                        return d.year === parseInt(year, 10);
                      }
                    }
                    return false;
                  });
                  return (
                    <ScheduleTron5000
                      day={the_day}
                      users={this.state.users}
                      current_user={this.state.current_user}
                      fetchDays={this.fetchDays}
                      changeCurrentDay={this.changeCurrentDay}
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
                  return <Login loginUser={this.loginUser} />;
                }}
              />
              <Route
                path="/register"
                render={() => {
                  if (this.state.current_user.is_authenticated) {
                    return <Redirect to="/" />;
                  }
                  return <Register getUsers={this.getUsers} />;
                }}
              />
            </div>
            <CurrentDay day={this.state.current_day} dictionary={dictionary} />
            <Week
              week={this.state.days}
              dictionary={dictionary}
              changeCurrentDay={this.changeCurrentDay}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
