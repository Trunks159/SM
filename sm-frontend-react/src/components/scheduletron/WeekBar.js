import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import DayBtn from "./DayBtn";
import { motion, AnimatePresence } from "framer-motion";

const styles = () => ({
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#E1E9EE",
    justifyContent: "space-evenly",
    minWidth: 1,
    padding: "0px 15px",
    overflowX: "hidden",
  },
});

class WeekBar extends Component {
  render() {
    const { week, classes, path, setDay } = this.props;
    return (
      <AnimatePresence>
        <motion.div
          className={classes.main}
          initial={{ width: "0px" }}
          animate={{ width: "100px" }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0 }}
        >
          {week.map(({ weekday, staffing, month, day, id }) => (
            <DayBtn
              weekday={weekday}
              completion={Math.round(
                (staffing.actual / staffing.projected) * 100
              )}
              date={`${month}/${day}`}
              id={id}
              path={path}
              setDay={setDay}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    );
  }
}

export default withStyles(styles)(WeekBar);
