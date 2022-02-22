import React, { Component } from "react";
import scheduleIcon from "../../../assets/images/Schedule Icon.svg";
import { Button } from "@material-ui/core";
import HealthBar from "../HealthBar";
import dayIcon from "../../../assets/images/Day Icon.svg";
import nightIcon from "../../../assets/images/Night Icon.svg";
import { withStyles } from "@material-ui/core";

const styles = ()=>({
  day : {
    '@media (max-width : 620px)':{
      display : 'none',
    },
    display : 'flex',
    flexDirection : 'column',
    alignItems : 'center',
    paddingLeft  :10,
    paddingRight :10,
    borderRadius : '7px 7px 0px 0px',
    marginLeft : 10,
  },
  bar : {
    marginTop : 'auto',
    marginBottom : 10
  },
});

class Header extends Component {
  state = {};
  render() {
    const {classes} = this.props;
    return (
      <div
        style={{
          position: "relative",
          marginLeft: 0,
          marginBottom: 0,
          display: "flex",
          width :'100%',
        }}
      >
        <div
          style={{
            margin: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
        >
          <Button
            style={{ margin: 5, padding: 0, minWidth: 10 }}
            startIcon={<img src={scheduleIcon} />}
          ></Button>
          <p
            style={{
              fontSize: 8,
              margin: 0,
              color: "#00422D",
              textAlign: "center",
            }}
          >
            Back To Week
          </p>
        </div>
        <div
          style={{
            postion: "relative",
            background: "#328F83",
            margin: 0,
            borderRadius: "7px 7px 0px 0px",
            padding: 10,
          }}
        >
          <p
            style={{
              fontSize: 27,
              margin: 0,
              textAlign: "center",
              color: "white",
              overflowX: "visible",
            }}
          >
            Monday 9/17
          </p>
          <p
            style={{
              fontSize: 10,
              margin: 0,
              postion: "absolute",
              color: "white",
            }}
          >
            Projected Sales: $6000
          </p>
        </div>
        <div className={classes.day} style = {{background : '#00A870' }}>

            <img style = {{marginTop : 5}} src = {dayIcon}/>
            <HealthBar className = {classes.bar} shiftHealth={.8}/>
        </div>
        <div className={classes.day} style = {{background: '#737F7B'}}>
            <img src = {nightIcon} style = {{transform : 'rotate(-45deg)', marginTop : 10,marginBottom :10,}}/>
            <HealthBar className = {classes.bar} shiftHealth={.8}/>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
