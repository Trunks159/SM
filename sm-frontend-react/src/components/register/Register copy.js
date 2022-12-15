import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { Redirect, Route, Switch} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import RegisterPg1 from "./RegisterPg1";
import RegisterPg2 from "./RegisterPg2";
import { withRouter } from "react-router-dom";

const pageVariant2 = {
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

const styles = () => ({
  header: {
    wholeThing: {
      overflowX: "hidden",
    },
    fontWeight: "500",
    margin: 30,
    fontSize: 40,
    textTransform: "capitalize",
  },
  submit: {
    width: 100,
    marginLeft: "auto",
    color: "#00C5FF",
    borderColor: "#00C5FF",
  },
  submitLink: {
    textDecoration: "none",
  },
  backBtn: {
    width: 100,
    marginLeft: "auto",
    color: "#00C5FF",
    borderColor: "#00C5FF",
    textDecoration: "none",
  },
  input: {
    margin: 10,
  },
});

class Register extends Component {
  state = {};

  render() {
    const { classes, postReq, notifyUser, users, match } = this.props;

    return users ? null : (
      <Switch>
        <Route
          exact
          path={match.path}
          render={() => (
            <AnimatePresence className={classes.wholeThing} exitBeforeEnter>
              <motion.div
                initial="out"
                animate="in"
                exit="out"
                variants={pageVariant2}
                transition={pageTransition}
              >
                <RegisterPg1
                  users={users}
                  postReq={postReq}
                  notifyUser={notifyUser}
                  classes={classes}
                />
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
                    variants={pageVariant2}
                    transition={pageTransition}
                  >
                    <RegisterPg2
                      firstName={props.params.firstName}
                      lastName={props.match.params.lastName}
                      postReq={postReq}
                      notifyUser={notifyUser}
                      classes={classes}
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
}

export default withStyles(styles)(withRouter(Register));
