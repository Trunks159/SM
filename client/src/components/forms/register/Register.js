import React, { useState } from "react";
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

function Register({ match, users }) {
  const [user, setUser] = useState(null);
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
              <RegisterPart1 users={users} setUser={setUser} />
            </motion.div>
          </AnimatePresence>
        )}
      />

      <Route
        path={`/register/:firstName/:lastName`}
        render={({ match }) =>
          user ? (
            <motion.div
              initial="out"
              animate="in"
              exit="out"
              variants={pageVariant}
              transition={pageTransition}
              style={{ flex: 1, display: "flex" }}
            >
              <RegisterPart2 user={user} users={users} />
            </motion.div>
          ) : (
            <Redirect to="/register" />
          )
        }
      />
    </Switch>
  );
}

export default Register;
