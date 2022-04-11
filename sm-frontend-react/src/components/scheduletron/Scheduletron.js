import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import HealthBar from "./HealthBar";
import homeIcon from "../../assets/images/Home Icon.svg";
import scheduleIcon from '../../assets/images/Schedule Icon White.svg'
import settingsIcon from '../../assets/images/Settings Icon Not Active.svg'
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
            height : '100%',
            width :  50,
            padding : 10,
            display :'flex',
            flexDirection : 'column'
          }}
        >
          <Link style={{ color: "white", textDecoration: "none" }}>
            <img src={homeIcon} />
            <p>Home</p>
          </Link>
          <Link style={{ color: "white", textDecoration: "none" }}>
            <img src={scheduleIcon} />
            <p style={{visibility : 'hidden' }}>Schedule</p>
          </Link>
          <Link style={{ color: "white", textDecoration: "none" , marginTop : 'auto'}}>
            <img src={settingsIcon} />
            <p style={{visibility : 'hidden'}}>Settings</p>
          </Link>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Scheduletron);
