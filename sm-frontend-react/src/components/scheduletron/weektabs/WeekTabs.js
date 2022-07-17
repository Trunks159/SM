import React, { Component } from "react";
import "./weektabs.css";
import TabPanels from "./TabPanels";
import { Redirect, withRouter, Link } from "react-router-dom";
import { Tabs, Tab } from "@mui/material";
import { withStyles } from "@material-ui/core";

const styles = () => ({
  root: {
    justifyContent: "center",
    background: "white",
  },
  scroller: {
    flexGrow: "0",
  },
  tab: {
    textTransform : 'none',
    transitionDuration : '.25s',
    background: "#275C78",
    margin : '0px 12.5px' ,
    borderRadius : '7px 7px 0px 0px',

  },
  tabLink: {
    flex : 1,
    width : '100%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    color: "white",

    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    fontSize : '32px',
  },
  tabs: {
    stuff: 1,
    
    "& .MuiTabs-flexContainer": {
      gap : 10,
      height : '100%'
    },
    "& .MuiTabs-indicator": {
      display : 'none'
    },
  },
});

class TabsContainer extends Component {
  state = {
    currentTab: this.props.dayIndex,
    day: this.props.days && this.props.days[this.props.dayIndex],
    days: this.props.days,
    redirect: false,
  };

  changeTab = (e, newTab) => {
    console.log("This.state.days: ", this.state.days);
    this.setState({
      currentTab: newTab,
      day: this.state.days[newTab],
    });
  };

  componentDidMount = () => {
    const { week, weekId, setSelectedWeek } = this.props;
    if (Boolean(week) === false) {
      fetch(`/get_week_schedule/${weekId}`)
        .then((response) => response.json())
        .then((response) => {
          if (response.weekSchedule) {
            setSelectedWeek({
              week: response.weekSchedule.schedule,
              id: response.weekSchedule.id,
            });
          } else {
            this.setState({ redirect: <Redirect to="/scheduletron" /> });
          }
        });
    }
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.days !== this.props.days) {
      this.setState({
        days: this.props.days,
        day: this.props.days[this.props.dayIndex],
      });
    }
  };

  render() {
    const { screenWidth, match, weekId, classes } = this.props;
    const isDesktop = screenWidth > 849;
    const { days, day, currentTab, redirect } = this.state;
    return (
      redirect ||
      (days && (
        <div className="tabs-container">

     <Tabs
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
      onChange={this.changeTab}
      value={currentTab}
      className = {classes.tabs}
    >
      {/*You might want to separate this but DONOT. For some reason 
      the scrollbuttons dont work or the indicator*/}
      {days.map((d, index) => {
        const isActive = index === currentTab;
        return (
          <Tab
          className={classes.tab}
          value={index}
          sx = {{width : isActive ? 300 : 150, opacity : isActive ? 1 : .5 }}
            label={
              <Link className={classes.tabLink} to={`/scheduletron/${weekId}/${index}`}>
                {`${index === currentTab ? d.weekday : ""} ${d.month}/${d.day}`}
              </Link>
            }
            
          />
        );
      })}
    </Tabs>
    

         
          <TabPanels days={days} currentDay={day} isDesktop={isDesktop} />
        </div>
      ))
    );
  }
}

export default withRouter(withStyles(styles)  (TabsContainer));
