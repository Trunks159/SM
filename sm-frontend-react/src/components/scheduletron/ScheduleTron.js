import React, { Component } from "react";
import Nav from "./Nav/Nav";
import { withStyles } from "@material-ui/core/styles";
import WeekView from "./WeekView/WeekView";
import ShiftView from "./ShiftView/ShiftView";
import { AnimatePresence, motion } from "framer-motion";

const styles = () => ({
  main: {
    display: "flex",
    height: "100%",
    width:'100%',
  },
});

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

const imgSrc = "http://localhost:5000/static/images/ScheduleTron";

class ScheduleTron extends Component {
  state = {
    activePage: "shiftView",
    backdrop:false,
  };

  changeActivePage = (id) => {
    console.log("In change active page: ", id);
    if (id !== this.state.activePage) {
      this.setState({ activePage: id });
    }
  };

 
  /*         {this.state.activePage === 'weekView' ? <WeekView colorPalette = {colorPalette} imgSrc = {imgSrc}/> : null}
        {this.state.activePage === 'shiftView' ? <ShiftView colorPalette = {colorPalette} imgSrc = {imgSrc}/> : null} */

  render() {
    const { classes, colorPalette, days, doStuff } = this.props;
    return (
      <div className={classes.main}>
        
        
        <Nav
          colorPalette={colorPalette}
          activePage={this.state.activePage}
          changeActivePage={this.changeActivePage}
          imgSrc={imgSrc}
        />

        {this.state.activePage === "weekView" ? (
          <WeekView colorPalette={colorPalette} imgSrc={imgSrc} />
        ) : null}

        {this.state.activePage === "shiftView" ? (
          <ShiftView colorPalette={colorPalette} imgSrc={imgSrc} days = {days} activateBackdrop = {this.activateBackdrop} deactivateBackdrop = {this.deactivateBackdrop}/>
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(ScheduleTron);
