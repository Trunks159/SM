import React, { Component } from "react";
import "./App.css";
import Message from "./components/Message";
import NavBar from "./components/navbar/NavBar";
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
import Scheduletron from "./components/scheduletron/Scheduletron";
import Dashboard from "./components/dashboard/Dashboard";

class App extends Component {
  state = {
    users: null,
    currentUser: { isAuthenticated: false },
    message: null,
    redirect: null,
  };

  fetchUsers = () => {
    fetch("/users")
      .then((response) => response.json())
      .then(({ users, currentUser }) => {
        if (
          this.state.users !== users ||
          this.state.currentUser !== currentUser
        ) {
          console.log("Current: ", currentUser);
          this.setState({ users: users, currentUser: currentUser });
        }
      });
  };

  /*Most POST Requests Go Through This
    Fetches Users After Each Request*/
  postReq = async (url, content) => {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });

    this.fetchUsers();

    return rawResponse;
  };

  /*Most GET Requests Go Through This
    Fetches Users and Days After Each Reqeust*/
  getReq = (url) => {
    const rawResponse = fetch(url);
    this.fetchUsers();
    return rawResponse;
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

  getDay = () => {};

  /*Fetches Users */
  componentDidMount = () => {
    this.fetchUsers();
  };

  render() {
    return (
      this.state.users ? (
        <Router>
        <div className="App">
          <div className="Test">
            <NavBar currentUser={this.state.currentUser} />
            <Message message={this.state.message} />
            <div className="mainContent">
              <Route
                exact
                path="/"
                render={() => <Dashboard teamMembers = {this.state.users} currentUser = {this.state.currentUser}/>}
              />
              <Route
                path="/scheduletron"
                render={({ match: { url } }) => {
                  return <Scheduletron />;
                }}
              />

              <Route
                path="/login"
                render={() => {
                  console.log("Current: ", this.state.currentUser);
                  if (this.state.currentUser.isAuthenticated) {
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
                  if (this.state.currentUser.isAuthenticated) {
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
                          currentUser={this.state.currentUser}
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
                      return (
                        <AvailabilityForm
                          user={user}
                          currentUser={this.state.currentUser.isAuthenticated}
                          postReq={this.postReq}
                          notifyUser={this.notifyUser}
                          availability={user.availability}
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
          </div>
        </div>
      </Router>
      ):(null)
      
    );
  }
}

export default App;
