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
});

const MyTab = ({ weekday, date, index, value, weekId }) => {
  const isActive = index === value;
  console.log("index: ", index, "value: ", value, "weekday: ", weekday);
  return (
    <Link to={`/scheduletron/${weekId}/${index}`}>
      <Tab
        value={index}
        label={(isActive ? weekday : "") + date}
        className={`tab ${isActive ? "active" : "inactive"}`}
      />
    </Link>
  );
};

const MyTabs = ({ days, value, changeTab, weekId }) => {
  console.log("Duh value: ", value);
  return (
    <Tabs>
      {days.map((day, index) => (
        <MyTab
          key={index}
          weekday={day.weekday}
          date={`${day.month}/${day.day}`}
          weekId={weekId}
          index={index}
          value={value}
          changeTab={changeTab}
        />
      ))}
    </Tabs>
  );
};

class TabsContainer extends Component {
  state = {
    currentTab: this.props.dayIndex,
    day: this.props.days && this.props.days[this.props.dayIndex],
    days: this.props.days,
    redirect: false,
  };

  changeTab = (e, newTab) => {
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
          {/* <MyTabs
            changeTab={this.changeTab}
            days={days}
            value={currentTab}
            weekId={weekId}
          />
*/}
          <Tabs
            onChange={this.changeTab}
            value={currentTab}
            classes={{ root: classes.root, scroller: classes.scroller }}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            <Tab
              style={{ width: "200px" }}
              value={0}
              label={
                <Link
                  style={{
                    background: "red",
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  to={"/scheduletron/1/0"}
                >
                  Tab0
                </Link>
              }
            ></Tab>
            <Tab
              style={{ width: "200px" }}
              value={1}
              label={
                <Link
                  style={{
                    background: "orange",
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  to={"/scheduletron/1/1"}
                >
                  Tab1
                </Link>
              }
            ></Tab>
            <Tab
              style={{ width: "200px" }}
              value={2}
              label={
                <Link
                  style={{
                    background: "green",
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  to={"/scheduletron/1/2"}
                >
                  Tab2
                </Link>
              }
            ></Tab>
          </Tabs>

          <TabPanels days={days} currentDay={day} isDesktop={isDesktop} />
        </div>
      ))
    );
  }
}

export default withRouter(withStyles(styles)(TabsContainer));
