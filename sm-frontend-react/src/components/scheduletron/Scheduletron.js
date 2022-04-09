import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import HealthBar from "./HealthBar";
import homeIcon from "../../assets/images/Home Icon.svg";
import { Link } from "react-router-dom";

const styles = () => ({
  main: {
    background: "red",
    width: "100%",
    height: "100%",
  },
});

class Scheduletron extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    const schedules = [
      [
        {
          weekday: "Monday",
          date: "9/17",
          health: ".9",
        },
        {
          weekday: "Monday",
          date: "9/18",
          health: ".9",
        },
        {
          weekday: "Monday",
          date: "9/18",
          health: ".9",
        },
        {
          weekday: "Monday",
          date: "9/19",
          health: ".9",
        },
        {
          weekday: "Monday",
          date: "9/20",
          health: ".9",
        },
        {
          weekday: "Monday",
          date: "9/21",
          health: ".1",
        },
        {
          weekday: "Monday",
          date: "9/22",
          health: ".5",
        },
      ],
    ];

    return (
      <div className={classes.main}>
        <div
          style={{
            background: "#51636D",
          }}
        >
          <Link style={{ color: "white", textDecoration: "none" }}>
            <img src={homeIcon} />
            <p>Home</p>
          </Link>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Scheduletron);
