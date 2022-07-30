import React, { Component } from "react";
import "./weektabs.css";
import TabPanels from "./TabPanels";
import { Redirect, withRouter, Link } from "react-router-dom";
import { Tabs, Tab, Collapse } from "@mui/material";
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
    stuff: 1,

    "& .MuiTabs-flexContainer": {
      gap: 10,
      height: "100%",
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
  },
});

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
    console.log("WeekId: ");
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
      console.log('Get outa here')
      if (theWeek) {
        this.props.setSelectedWeek(theWeek);
      } else {
        this.fetchWeekSchedule(weekId);
      }
    }
  };

  render() {
    const { screenWidth, match, weekId, classes, weeks } = this.props;
    const isDesktop = screenWidth > 600;
    const { days, currentDay, currentTab, redirect } = this.state;
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
            className={classes.tabs}
          >
            {/*You might want to separate this but DONOT. For some reason 
      the scrollbuttons dont work or the indicator*/}
            {days.map((d, index) => {
              const isActive = index === currentTab;
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
        </div>
      ))
    );
  }
}

export default withRouter(withStyles(styles)(TabsContainer));
