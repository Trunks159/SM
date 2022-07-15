import React, { Component } from "react";
import "./weektabs.css";
import TabPanels from "./TabPanels";
import { Switch, Route, Redirect, withRouter, Link } from "react-router-dom";
import { Tabs, Tab } from "@mui/material";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    justifyContent: "center",
    background: "white",
  },
  scroller: {
    flexGrow: "0",
  },
});

const MyTab = ({ weekday, date, index, value, weekId, key }) => {
  const isActive = index === value;
  console.log("index: ", index, "value: ", value, "isactive: ", isActive);
  return (
    <Link to={`/scheduletron/${weekId}/${index}`}>
      <Tab
        key={key}
        value={index}
        label={(isActive ? weekday : "") + date}
        className={`tab ${isActive ? "active" : "inactive"}`}
      />
    </Link>
  );
};

const MyTabs = ({ days, value, changeTab, weekId }) => {
  const classes = useStyles();
  console.log("Duh value: ", value);
  return (
    <Tabs
      classes={{ root: classes.root, scroller: classes.scroller }}
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
      value={value}
      onChange={changeTab}
    >
      <Tab label={"Tab1"} value={0} />
      <Tab label={"Tab2"} value={1} />
      {/*days.map((day, index) => (
        <MyTab
          key={index}
          weekday={day.weekday}
          date={`${day.month}/${day.day}`}
          weekId={weekId}
          index={index}
          value={value}
          changeTab={changeTab}
        />
      ))*/}
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

  changeTab = (newTab, dayId) => {
    console.log("Newtab: ", newTab);
    this.setState({
      currentTab: newTab,
      day: this.state.days.find((d) => d.id === dayId),
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
    const { screenWidth, match, weekId } = this.props;
    const isDesktop = screenWidth > 849;
    const { days, day, currentTab, redirect } = this.state;
    return (
      redirect ||
      (days && (
        <div className="tabs-container">
          <MyTabs
            changeTab={this.changeTab}
            days={days}
            value={currentTab}
            weekId={weekId}
          />
          <TabPanels days={days} currentDay={day} isDesktop={isDesktop} />
        </div>
      ))
    );
  }
}

export default withRouter(TabsContainer);
