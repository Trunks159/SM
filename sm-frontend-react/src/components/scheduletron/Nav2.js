import { Button, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import scheduleIcon from "../../assets/images/Schedule Icon White.svg";
import settingsIcon from "../../assets/images/Settings Icon.svg";
import searchIcon from "../../assets/images/Search Icon.svg";
import logo from "../../assets/images/Logo.svg";
import "./scheduletron.css";

const styles = () => ({
  label: {
    flexDirection: "column",
    alignItems : 'center'
  },
});

class Nav2 extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <div className="nav2">
        <Button
          style = {{color : 'white', borderRight : '2px solid white'}}

        >
          <div style={{display : 'flex', flexDirection : 'column', alignItems : 'center',}}>
          <img style = {{}} src={scheduleIcon} />
              <p>
                    Schedules
              </p>
          </div>
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Nav2);
