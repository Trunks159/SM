import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Message from "./components/Message";
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
    current_day: null,
  };
  postReq = async (url, content) => {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });
    const result = await rawResponse.json();
    this.fetchDays();
    this.fetchUsers();
    return result;
  };

  getReq = async (url) => {
    const rawResponse = await fetch(url);
    const result = await rawResponse.json();
    this.fetchDays();
    this.fetchUsers();
    return result;
  };

  fetchDays = async () => {
    const rawResponse = await fetch("/get_days");
    rawResponse.json().then(({ days }) => {
      if (days !== this.state.days) {
        console.log("New Days: ", days);
        this.setState({
          days: days,
        });
      }
    });
  };

  fetchUsers = async () => {
    const rawResponse = await fetch("/users");
    rawResponse.json().then(({ users, current_user }) => {
      if (
        this.state.users !== users ||
        this.state.current_user !== current_user
      ) {
        this.setState({ users: users, current_user: current_user });
      }
    });
  };

  checkDb = ({ day, month, year }) => {
    const result = this.postReq("/access_day", {
      day: day,
      month: month,
      year: year,
    });
    result.then(({ day }) => {
      console.log("Checkdb input data: ", day);
      this.setState({ current_day: day });
      console.log("The current day now: ", this.state.current_day);
    });
    return this.state.current_day;
  };

  wipeDays = () => {
    this.getReq("/wipe_days");
    this.notifyUser("Days have been wiped");
  };

  notifyUser(message) {
    this.setState({
      message: message,
    });
    setTimeout(() => {
      this.setState({ message: null });
    }, 1600);
  }

  componentDidMount() {
    this.fetchDays();
    this.fetchUsers();
    if (this.state.current_day === null) {
      let today = this.getToday();
      today = this.state.days.find(
        (day) =>
          day.day === today.day &&
          day.month === today.month &&
          day.year === today.year
      );
      if (today) {
        this.setState({ current_day: today });
      } else {
        console.log("Couldnt find the day :(", this.state.days);
      }
    } else {
      console.log("Something went wrong: ", this.state.current_day);
    }
  }

  /*
    if (day) {
      const new_day = this.checkDb(day);
      if (new_day) {
        for (let workblock of neW_day.workblocks) {
          let user = this.state.users.find(
            (user) => user.id === workblock.user_id
          );
          this.removeSlider(user);
          this.makeSlider(user);
        }
      }
    }
*/

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
          <div className="main-flex">
            <NavBar
              current_user={this.state.current_user}
              users={this.state.users}
              logoutUser={() => this.getReq("/logout")}
              Thumbnail={Thumbnail}
            />

            <div className="content">
              <Message message={this.state.message} />
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
                  }
                }}
              />
              <Route
                path="/day/:date"
                render={(props) => {
                  const { date } = props.match.params;
                  const the_day = this.state.days.find(
                    (d) =>
                      d.month.toString() +
                        d.day.toString() +
                        d.year.toString() ===
                      date
                  );

                  if (the_day) {
                    const u = this.state.users.filter((user) => {
                      let users = the_day.workblocks.map((wb) => wb.user);
                      if (users.length > 0) {
                        if (users.find((u) => u === user)) {
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
                        fetchDays={this.fetchDays}
                        checkDb={this.checkDb}
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
                  return <Login postReq={this.postReq} />;
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
              days={this.state.days}
              dictionary={dictionary}
              wipeDays={this.wipeDays}
              checkDb={this.checkDb}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
