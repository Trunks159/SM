import React, { Component } from "react";
import Nav from "./Nav";
import { withStyles } from "@material-ui/core/styles";
import WeekView from "./WeekView";

const styles = () => ({
  main: {
      display: 'flex',
      height:'100%',
  },
});

const imgSrc = "http://localhost:5000/static/images/ScheduleTron";

class ScheduleTron extends Component {
  state = {
      current :'weekView',
  };

  render() {
    const { classes, colorPalette } = this.props;
    return (
      <div className={classes.main}>
        <Nav colorPalette={colorPalette} activeLink="weekView" imgSrc = {imgSrc}/>
        <WeekView colorPalette = {colorPalette} imgSrc = {imgSrc}/>
        {/* <Header/>
                <MainContent/> */}
      </div>
    );
  }
}

export default withStyles(styles)(ScheduleTron);
