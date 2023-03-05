import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/navbar/NavBar";
import Login from "./components/forms/login/Login";
import Register from "./components/forms/register/Register";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  useLocation,
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

const updateAlert = (newAlert) => ({
  type: "UPDATE_ALERT",
  payLoad: newAlert,
});

const theme = createTheme();

function App() {
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const users = useSelector((state) => state.allUsers);
  const alert = useSelector((state) => state.alert);

  //API CALLS//////////////////////
  function fetchUsers() {
    fetch("/api/get_all_users")
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

  function handleLogout() {
    fetch("/api/logout")
      .then((response) => response.json())
      .then(() => {
        fetchUsers();
        dispatch(
          updateAlert({
            content: "Logout Successful",
            severity: "success",
            title: "Success!",
          })
        );
      });
  }
  ////////////////////

  function updatePredicate() {
    dispatch(updateScreenWidth(window.innerWidth));
  }

  useEffect(() => {
    //Initializes screenwidth in redux and adds an event listener
    window.addEventListener("resize", updatePredicate);
    updatePredicate(window.innerWidth);
    fetchUsers();
    return () => {
      window.removeEventListener("resize", updatePredicate);
    };
  }, []);

  //COMPONENTS/////////////////////////////////////

  function RouteWithAuthenticator(props) {
    const { reverseAuthenticator, render } = props;
    const location = useLocation();
    const redirect = (() => {
      //if user is logged in, they cant sign in or register
      //if user isnt logged in, they cant do anything other then logging in
      //this redirects if neccessary
      if (props.reverseAuthenticator && currentUser.username) {
        return () => <Redirect to="/scheduletron" />;
      } else if (
        //reverseauth is false
        //user isnt authenticated
        !Boolean(reverseAuthenticator) &&
        !Boolean(currentUser.username)
      ) {
        return () => <Redirect to="/login" />;
      }
    })();

    return <Route {...props} render={redirect || render} />;
  }

  function Logout() {
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
      handleLogout();
      setRedirect(true);
    }, []);
    return redirect && <Redirect to="/login" />;
  }
  //////////////////
  console.log("Current: ", currentUser.username);
  return users ? (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="app">
          <main>
            <NavBar currentUser={currentUser} />
            <Notification />
            <Switch>
              <RouteWithAuthenticator
                exact
                path="/"
                render={() => <Redirect to="/scheduletron" />}
              />

              <RouteWithAuthenticator
                path="/team"
                render={() => <Team teamMembers={users} />}
              />
              <RouteWithAuthenticator
                path="/scheduletron/:weekId?/:dayId?"
                render={() => <Scheduletron />}
              />
              <RouteWithAuthenticator
                path="/register"
                reverseAuthenticator
                render={({ match }) => <Register users={users} match={match} />}
              />
              <RouteWithAuthenticator
                path="/logout"
                render={() => <Logout />}
              />
              <RouteWithAuthenticator
                path="/login"
                reverseAuthenticator
                render={(props) => {
                  return <Login users={users} />;
                }}
              />
            </Switch>
          </main>
        </div>
      </ThemeProvider>
    </Router>
  ) : (
    <p>Loading Right Now...</p>
  );
}

export default App;
