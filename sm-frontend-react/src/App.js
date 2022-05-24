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
    //logged in user, the user logged in in Flask also
    currentUser: { isAuthenticated: false },
    message: null,
    isDesktop: false,
  };

  /*Fetches Users adds listener that will let React
  know what size the screen is at any time*/
  componentDidMount = () => {
    this.fetchUsers();
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updatePredicate);
  };

  /*API Call that gets users and puts them in state
    and gets the Logged in user
  */
  fetchUsers = () => {
    fetch("/users")
      .then((response) => response.json())
      .then(({ users, currentUser }) => {
        if (
          /*if the data from the api call is different
          than the data we have, update state*/
          this.state.users !== users ||
          this.state.currentUser !== currentUser
        ) {
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

  //Places an alert of some kind under the nav bar
  notifyUser = (message) => {
    this.setState({
      message: message,
    });
    setTimeout(() => {
      this.setState({ message: null });
    }, 4000);
  };

  //Updates state to what the screen size is
  updatePredicate = () => {
    this.setState({ isDesktop: window.innerWidth > 600 });
  };

  /*Logs the user out in flask via get req and calss
  fetchUsers to refresh the currentUser*/
  handleLogout = () => {
    fetch("/logout")
      .then((response) => response.json())
      .then(() => {
        this.fetchUsers();
        this.updatePredicate();
      });
  };

  render() {
    const { users } = this.state;
    return users ? (
      <Router>
        <div className="App">
          <NavBar
            currentUser={this.state.currentUser}
            handleLogout={this.handleLogout}
          />
          <Message message={this.state.message} />
          <main>
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  return this.state.currentUser.isAuthenticated ? (
                    <Dashboard
                      teamMembers={this.state.users}
                      currentUser={this.state.currentUser}
                    />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              />
              <Route
                path="/login"
                render={() => {
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
            </Switch>
          </main>
          {/*
          <div className="Test">
            
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  return this.state.currentUser.isAuthenticated ? (
                    <Dashboard
                      teamMembers={this.state.users}
                      currentUser={this.state.currentUser}
                    />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              />

              <Route
                path="/scheduletron"
                render={() => {
                  return this.state.currentUser.isAuthenticated ? (
                    <Scheduletron />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              />

              <Route
                path="/login"
                render={() => {
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

              <Route
                exact
                path="/user/:username"
                render={(props) => {
                  const user = this.state.users.find(
                    (user) => user.username === props.match.params.username
                  );
                  if (user) {
                    return (
                      <User user={user} currentUser={this.state.currentUser} />
                    );
                  } else {
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
          </div> */}
        </div>
      </Router>
    ) : (
      <p>Loading Right Now...</p>
    );
  }
}

export default App;
