import React, { Component } from "react";
import { Button, withStyles } from "@material-ui/core";
import vsIcon from "../../../assets/images/Visualizer Icon.svg";
import editorIcon from "../../../assets/images/Editor Icon.svg";
import saveIcon from "../../../assets/images/Save Icon.svg";
import SchedulePaper from "../../dashboard/SchedulePaper";

const styles = () => ({
  main: {
    display: "flex",
    background: "#F6F6F6",
    margin: 20,
    height: "100%",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    borderRight: "1px solid #D6D6D6",
  },
  content: {
    stuff: 1,
  },
  label: {
    display: "flex",
    flexDirection: "column",
    alignItemss: "center",
  },
  saveBtn: {
    marginTop: "auto",
  },
});

const IconBtn = ({ img, label, isSave }) => {
  let style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: 8,
    margin: 10,
  };
  style = isSave ? { ...style, marginTop: "auto" } : style;

  return (
    <div style={style}>
      <Button>
        <img alt = '/' src={img} />
      </Button>
      <p style={{ margin: 0 }}>{label}</p>
    </div>
  );
};

class Main extends Component {
  state = {};
  render() {
    const { classes, schedule } = this.props;
    return (
      <div className={classes.main}>
        <div className={classes.nav}>
          <IconBtn img={vsIcon} label={"Visualizer"} />
          <IconBtn img={editorIcon} label={"Editor"} />
          <IconBtn img={saveIcon} label={"Save"} isSave={true} />
        </div>
        <div className={classes.content}>
          <SchedulePaper schedule={schedule} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Main);
