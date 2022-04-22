import React, { Component } from "react";
import { Button, withStyles } from "@material-ui/core";
import vsIcon from "../../../assets/images/Visualizer Icon.svg";
import editorIcon from "../../../assets/images/Editor Icon.svg";
import saveIcon from "../../../assets/images/Save Icon.svg";
import SchedulePaper from "../../dashboard/SchedulePaper";
import BasicTabs from "./TabPanel";
import Visualizer from "./Visualizer";

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
    width: "100%",
    margin: 10,
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

const IconBtn = ({ img, label, isSave, isActive, handleBtn }) => {
  let style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: 8,
    margin: "10px 0",
    padding: "15px 0px",
  };
  style = isSave ? { ...style, marginTop: "auto" } : style;
  style = isActive ? { ...style, borderRight: "3px solid #707070" } : style;
  return (
    <div style={style}>
      <Button onClick={() => handleBtn(label.toLowerCase())}>
        <img alt="/" src={img} />
      </Button>
      <p style={{ margin: 0 }}>{label}</p>
    </div>
  );
};

class Main extends Component {
  state = {
    active: "visualizer",
  };

  handleBtn = (btnName) => {
    this.setState({ active: btnName });
  };

  render() {
    const { classes, schedule } = this.props;
    return (
      <div className={classes.main}>
        {/*
        <div className={classes.nav}>
          <IconBtn
            img={vsIcon}
            label={"Visualizer"}
            isActive={this.state.active === "visualizer"}
            handleBtn={this.handleBtn}
          />
          <IconBtn
            img={editorIcon}
            label={"Editor"}
            isActive={this.state.active === "editor"}
            handleBtn={this.handleBtn}
          />
          <IconBtn
            img={saveIcon}
            label={"Save"}
            isActive={this.state.active === "save"}
            isSave={true}
            handleBtn={this.handleBtn}
          />
        </div>
        */}
        <BasicTabs visualizer = {<Visualizer schedule={schedule}/>}/> 

      </div>
    );
  }
}

export default withStyles(styles)(Main);
