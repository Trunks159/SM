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

  function updatePredicate() {
    dispatch(updateScreenWidth(window.innerWidth));
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

  useEffect(() => {
    fetchUsers();
    updatePredicate();
    window.addEventListener("resize", updatePredicate);
    return () => {
      window.removeEventListener("resize", updatePredicate);
    };
  }, []);

  return users ? (
    <Router>
      <div className="App">
        <NavBar currentUser={currentUser} handleLogout={handleLogout} />
        <Notification message={message} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return currentUser.isAuthenticated ? (
                <Redirect to="/scheduletron" />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route
            path="/login"
            render={() => {
              if (currentUser.isAuthenticated) {
                return <Redirect to="/" />;
              }
              return (
                <Login users={users} notifyUser={notifyUser} screenWidth={0} />
              );
            }}
          />

          <Route
            path="/register"
            render={({ match }) => {
              return currentUser.isAuthenticated ? (
                <Redirect to="/" />
              ) : (
                <Register users={users} notifyUser={notifyUser} match={match} />
              );
            }}
          />
          <Route
            path="/scheduletron/:weekId?/:dayId?"
            render={({ match }) => {
              return currentUser.isAuthenticated ? (
                <Scheduletron notifyUser={notifyUser} match={match} />
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
                  currentUser={currentUser.isAuthenticated}
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
    </Router>
  ) : (
    <p>Loading Right Now...</p>
  );
}

export default App;
