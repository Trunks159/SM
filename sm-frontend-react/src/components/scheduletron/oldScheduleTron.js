import React, { Component } from "react";
import Nav from "./Nav/Nav";
import { withStyles } from "@material-ui/core/styles";
import WeekView from "./ScheduleNav/ScheduleNav";
import ShiftView from "./ShiftView/ShiftView";
import ShiftStats from "./ShiftStats";
import { AnimatePresence, motion } from "framer-motion";

const styles = () => ({
  main: {
    display: "flex",
    height: "100%",
    width: "100%",
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



class ScheduleTron extends Component {
  state = {
    activePage: "weekView",
    backdrop: false,
    week : null,
  };

  getWeek = () =>{
    /*Requests a week from backend, backend is expecting a monday */
    const x = this.props.postReq('/get_week', {month : 10, day : 11, year: 2021});
    x.then((data) =>
    data.json().then(({ week }) => {
      this.setState({week: week})
    })
  );
  } 
  componentDidMount = ()=>{
    this.getWeek();
  }

  changeActivePage = (id) => {
    console.log("In change active page: ", id);
    if (id !== this.state.activePage) {
      this.setState({ activePage: id });
    }
  };

  /*
  accessDay = (id) =>{
    day = this.state.days.find((day)=>day.id = id);
    if (day){
      this.props.getReq('/access_day').json().then(()=>{

      });
    }
    else{
      console.log('Cant find the day with id: ', id);
    }
  }
*/

  /*         {this.state.activePage === 'weekView' ? <WeekView colorPalette = {colorPalette} imgSrc = {imgSrc}/> : null}
        {this.state.activePage === 'shiftView' ? <ShiftView colorPalette = {colorPalette} imgSrc = {imgSrc}/> : null} */

  render() {
    const { classes, colorPalette, days, postReq, getReq, imgSrc, changeCurrentUrl } = this.props;
    const morningShift = {
      manager: { firstName: "jordan", lastName: "giles" },
      shift: "morning",
      sales: 3000,
      staffing: [6, 8],
      hours: [48, 58],
    };
    const nightShift = {
      manager: { firstName: "alphonso", lastName: "howard" },
      shift: "night",
      sales: 3000,
      staffing: [2, 7],
      hours: [16, 45],
    };
    return (
      <div className={classes.main}>
        {/* 
          <Nav
          colorPalette={colorPalette}
          activePage={this.state.activePage}
          changeActivePage={this.changeActivePage}
          imgSrc={imgSrc}
        />

        */}
        
        {this.state.activePage === "weekView" ? (
          <WeekView colorPalette={colorPalette} imgSrc={imgSrc} postReq = {postReq} changeCurrentUrl = {changeCurrentUrl}/>
        ) : null}

        {this.state.activePage === "shiftView" ? (
          <ShiftView colorPalette={colorPalette} imgSrc={imgSrc} days={days}  changeCurrentUrl = {changeCurrentUrl}/>
        ) : null}

        {this.state.activePage === "shiftStats" ? (
          <ShiftStats
            colorPalette={colorPalette}
            imgSrc={imgSrc}
            days={days}
            morningShift={morningShift}
            nightShift={nightShift}
            changeCurrentUrl = {changeCurrentUrl}
          />
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(ScheduleTron);
