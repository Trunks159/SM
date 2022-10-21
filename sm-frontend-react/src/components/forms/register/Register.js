import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import "../forms.css";
import { AnimatePresence, motion } from "framer-motion";
import RegisterPart1 from "./RegisterPart1";
import RegisterPart2 from "./RegisterPart2";

//form styles are the same so just a classname
//inputs are styled by styled components
//They are spaced by margins
//Buttons are styled buttons

const pageVariant = {
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "-100vw",
  },
};

const pageTransition = {
  duration: 0.2,
  transition: "linear",
};

function Register({ match, users, notifyUser }) {
  return (
    <Switch>
      <Route
        exact
        path={match.path}
        render={() => (
          <AnimatePresence exitBeforeEnter>
            <motion.div
              initial="out"
              animate="in"
              exit="out"
              variants={pageVariant}
              transition={pageTransition}
              style={{ flex: 1, display: "flex" }}
            >
              <RegisterPart1 users={users} notifyUser={notifyUser} />
            </motion.div>
          </AnimatePresence>
        )}
      />

      <Route
        path={`/register/:firstName/:lastName`}
        render={(props) => {
          const found = users.find(
            (u) =>
              u.firstName === props.match.params.firstName &&
              u.lastName === props.match.params.lastName
          );
          if (found) {
            if (found.username) {
              return <Redirect to={match.path} />;
            } else {
              return (
                <motion.div
                  initial="out"
                  animate="in"
                  exit="out"
                  variants={pageVariant}
                  transition={pageTransition}
                  style={{ flex: 1, display: "flex" }}
                >
                  <RegisterPart2
                    firstName={props.match.params.firstName}
                    lastName={props.match.params.lastName}
                    notifyUser={notifyUser}
                  />
                </motion.div>
              );
            }
          } else {
            return <Redirect to={"/register"} />;
          }
        }}
      />
    </Switch>
  );
}

export default Register;
