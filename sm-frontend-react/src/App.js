import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/navbar/NavBar";
import User from "./components/user/User";
import AvailabilityForm from "./components/user/UserAvailability";
import Login from "./components/forms/login/Login";
import Register from "./components/forms/register/Register";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Scheduletron from "./components/scheduletron/Scheduletron";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import Team from "./components/team/Team";
import { createTheme, ThemeProvider } from "@mui/material";
//ACTIONS
const updateCurrentUser = (newUser) => ({
  type: "UPDATE_CURRENT_USER",
  payLoad: newUser,
});

const updateScreenWidth = (newWidth) => ({
  type: "UPDATE_SCREEN_WIDTH",
  payLoad: newWidth,
});

const updateAllUsers = (newUsers) => ({
  type: "UPDATE_ALL_USERS",
  payLoad: newUsers,
});

const theme = createTheme();

function App() {
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const users = useSelector((state) => state.allUsers);

  function fetchUsers() {
    fetch("/users")
      .then((response) => response.json())
      .then((newData) => {
        if (
          /*if the data from the api call is different
    than the data we have, update state*/
          users !== newData.users ||
          currentUser !== newData.currentUser
        ) {
          dispatch(updateCurrentUser(newData.currentUser));
          dispatch(updateAllUsers(newData.users));
        }
      });
  }

  function notifyUser(message) {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 4000);
  }

  function handleLogout() {
    fetch("/logout")
      .then((response) => response.json())
      .then(() => {
        fetchUsers();
        notifyUser();
      });
  }

  function updatePredicate() {
    dispatch(updateScreenWidth(window.innerWidth));
  }

  useEffect(() => {
    //componentDidMount
    window.addEventListener("resize", updatePredicate);
    updatePredicate(window.innerWidth);
    fetchUsers();
    return () => {
      window.removeEventListener("resize", updatePredicate);
    };
  }, []);

  return users ? (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <NavBar currentUser={currentUser} handleLogout={handleLogout} />
          <Notification message={message} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return currentUser.username ? (
                  <Redirect to="/scheduletron" />
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />
            <Route
              path="/login"
              render={() => {
                if (currentUser.username) {
                  return <Redirect to="/" />;
                }
                return (
                  <Login
                    users={users}
                    notifyUser={notifyUser}
                    screenWidth={0}
                  />
                );
              }}
            />

            <Route
              path="/register"
              render={({ match }) => {
                return currentUser.username ? (
                  <Redirect to="/" />
                ) : (
                  <Register
                    users={users}
                    notifyUser={notifyUser}
                    match={match}
                  />
                );
              }}
            />
            <Route
              path="/team"
              render={() => {
                return currentUser.username ? (
                  <Team teamMembers={users} />
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />
            <Route
              path="/scheduletron/:weekId?/:dayId?"
              render={() => {
                return currentUser.username ? (
                  <Scheduletron />
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />
          </Switch>

          <Route
            exact
            path="/user/:username"
            render={(props) => {
              const user = users.find(
                (user) => user.username === props.match.params.username
              );
              if (user) {
                return <User user={user} currentUser={currentUser} />;
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
              const user = users.find(
                (user) => user.username === props.match.params.username
              );
              if (user) {
                return (
                  <AvailabilityForm
                    user={user}
                    notifyUser={notifyUser}
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
        </div>
      </ThemeProvider>
    </Router>
  ) : (
    <p>Loading Right Now...</p>
  );
}

export default App;
