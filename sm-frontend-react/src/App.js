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

  logoutUser = () => {
    fetch("/logout").then((response) =>
      response.json().then((data) => {
        this.setState({ current_user: data.current_user });
      })
    );
  };

  componentDidMount() {
    console.log("render");
    fetch("/users").then((response) =>
      response.json().then((data) => {
        let users = data.users.map((user) => {
          user["value"] = ["08:00", "16:00"];
          return user;
        });

        this.setState({
          current_user: data.current_user,
          users: users,
        });
      })
    );
    fetch("/scheduletron5000").then((response) =>
      response.json().then(({ current_day, days }) => {
        console.log("Lets find out the date:", current_day.date);
        this.setState({
          days: days,
          current_day: current_day,
        });
      })
    );
  }

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
    console.log(content);
  };

  loginUser = (user) => {
    this.setState({ current_user: user });
  };

  changeCurrentDay = (day) => {
    this.setState({ current_day: day });
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
              users={this.state.users}
              logoutUser={this.logoutUser}
              Thumbnail={Thumbnail}
            />
            <CurrentDay day={this.state.current_day} dictionary={dictionary} />
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
                  return (
                    <ScheduleTron5000
                      date={{
                        month: props.match.params.month,
                        day: props.match.params.day,
                        year: props.match.params.year,
                      }}
                      changeCurrentDay={this.changeCurrentDay}
                      users={this.state.users}
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
            <Week
              week={this.state.days}
              dictionary={dictionary}
              changeCurrentDay={this.changeCurrentDay}
            />
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
