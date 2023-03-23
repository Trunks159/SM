import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";
import Team from "./components/team/Team";
import Notification from "./components/Notification";
import NavBar from "./components/navbar/NavBar";
import Login from "./components/forms/login/Login";
import Register from "./components/forms/register/Register";
import Home from "./components/home/Home";
import Scheduletron from "./components/scheduletron/Scheduletron";
import "./App.css";
import dayjs from "dayjs";

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
  ////UTILITIES/////////////////
  const dispatch = useDispatch();

  ////GLOBAL STATE///////////////////////////////

  const currentUser = useSelector((state) => state.currentUser);
  const users = useSelector((state) => state.allUsers);
  const alert = useSelector((state) => state.alert);

  ////SIDE EFFECTS////////////////////////////////
  function fetchUsers() {
    fetch("/api/users")
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
  function updatePredicate() {
    dispatch(updateScreenWidth(window.innerWidth));
  }

  useEffect(() => {
    //Initializes screenwidth in redux and adds an event listener
    //fetches users too
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
    const redirect = (() => {
      //if user is logged in, they cant sign in or register
      //if user isnt logged in, they cant do anything other then logging in
      //this redirects if neccessary
      if (props.reverseAuthenticator && currentUser.username) {
        return () => <Redirect to="/" />;
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
  return users.length > 0 ? (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="app">
          <main>
            <NavBar currentUser={currentUser} />
            <Notification />
            <Switch>
              <RouteWithAuthenticator
                path="/register"
                reverseAuthenticator
                render={({ match }) => <Register users={users} match={match} />}
              />
              <RouteWithAuthenticator
                path="/login"
                reverseAuthenticator
                render={() => <Login users={users} />}
              />
              <RouteWithAuthenticator
                path="/logout"
                render={() => <Logout />}
              />

              <RouteWithAuthenticator exact path="/" render={() => <Home />} />

              <RouteWithAuthenticator
                path="/team"
                render={() => <Team teamMembers={users} />}
              />
              <RouteWithAuthenticator
                path="/scheduletron/:date?"
                render={({ match }) => {
                  let date = match.params.date;
                  return date ? (
                    <Scheduletron date={dayjs(match.params.date).format()} />
                  ) : (
                    <Redirect
                      to={`/scheduletron/${dayjs().format("YYYY-MM-DD")}`}
                    />
                  );
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
