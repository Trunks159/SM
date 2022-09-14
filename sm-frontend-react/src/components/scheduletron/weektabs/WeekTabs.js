import React, { Component } from "react";
import "./weektabs.css";
import TabPanels from "./TabPanels";
import { Redirect, withRouter, Link } from "react-router-dom";
import { Tabs, Tab, Collapse } from "@mui/material";
import { Paper, withStyles } from "@material-ui/core";

const styles = () => ({
  root: {
    justifyContent: "center",
    background: "white",
  },
  scroller: {
    flexGrow: "0",
  },
  tab: {
    textTransform: "none",
    transitionDuration: ".25s",
    background: "#275C78",
    margin: "0px 12.5px",
    borderRadius: "7px 7px 0px 0px",
    minWidth: 150,
    padding: "0px 20px",
  },
  tabLink: {
    flex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    color: "white",
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    fontSize: "32px",
  },
  tabs: {
    height: 80,
    "& .MuiTabs-flexContainer": {
      gap: 10,
      height: "100%",
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
  },
});

/*
  lets get this working on desktop before mobile because its 
  juust going to take too long to consider everything

  Need to make sure the timeslots respond to when the screen size changes
  Need the timeslots to be responsive to shiftfilter change
  
  Its kinda impossible to keep the actual time value in state
  it needs to be stored 100% as pixel and just kept that way.
  So i guess when theres overflow the time can be stored but...
  
  Perhaps we could deal with negative pixels?

  Lets say the filter is 3pm - 12AM
  and shift starts 1t 11AM and ends at 8PM
  How would you convert 11AM to pixels
  Could it be represented as -300px, 200px?
  This is tough.

  When there is overflow It'll be hidden of course and replaced with an dashed line
*/

class TabsContainer extends Component {
  state = {
    currentTab: this.props.dayIndex,
    currentDay: this.props.days && this.props.days[this.props.dayIndex],
    days: this.props.days,
    redirect: false,
  };

  changeTab = (e, newTab) => {
    this.setState({
      currentTab: newTab,
      currentDay: this.state.days[newTab],
    });
  };

  componentDidMount = () => {
    const { week, weekId } = this.props;
    if (Boolean(week) === false) {
      this.fetchWeekSchedule(weekId);
    }
  };

  fetchWeekSchedule = (weekId) => {
    fetch(`/get_week_schedule/${weekId}`)
      .then((response) => response.json())
      .then((response) => {
        if (response.weekSchedule) {
          this.props.setSelectedWeek({
            week: response.weekSchedule.schedule,
            id: response.weekSchedule.id,
          });
        } else {
          this.setState({ redirect: <Redirect to="/scheduletron" /> });
        }
      });
  };

  componentDidUpdate = (prevProps) => {
    const { weekId, dayIndex, days, weeks } = this.props;
    if (prevProps.days !== this.props.days) {
      this.setState({
        days: days,
        currentDay: days[dayIndex],
      });
    }
    if (prevProps.selectedWeek && prevProps.weekId !== weekId) {
      const theWeek = weeks.find((w) => (w.id = weekId));
      if (theWeek) {
        this.props.setSelectedWeek(theWeek);
      } else {
        this.fetchWeekSchedule(weekId);
      }
    }

    if(prevProps.dayIndex !== this.props.dayIndex){
      this.changeTab(0, this.props.dayIndex);
    }

  

  };

  render() {
    const { screenWidth, match, weekId, classes, weeks , dayIndex} = this.props;
    const isDesktop = screenWidth > 600;
    const { days, currentDay, currentTab, redirect } = this.state;
    return (
      redirect ||
      (days && (
        <Paper className="tabs-container">
          <Tabs
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            onChange={this.changeTab}
            value={currentTab}
            className={classes.tabs}
            style={{ display: isDesktop ? "flex" : "none" }}
          >
            {/*You might want to separate this but DONOT. For some reason 
    the scrollbuttons dont work or the indicator*/}
            {days.map((d, index) => {
              const isActive = index === dayIndex;
              return (
                <Tab
                  className={classes.tab}
                  value={index}
                  sx={{
                    opacity: isActive ? 1 : 0.5,
                  }}
                  label={
                    <Link
                      className={classes.tabLink}
                      to={`/scheduletron/${weekId}/${index}`}
                    >
                      <Collapse orientation={"horizontal"} in={isActive}>
                        <p style={{ marginRight: 7 }}>{d.weekday} </p>
                      </Collapse>

                      <p>{`${d.month}/${d.day}`}</p>
                    </Link>
                  }
                />
              );
            })}
          </Tabs>

          <TabPanels
            days={days}
            currentDay={currentDay}
            isDesktop={isDesktop}
          />
        </Paper>
      ))
    );
  }
}

export default withRouter(withStyles(styles)(TabsContainer));
