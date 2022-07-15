import React, { Component } from "react";
import "./weektabs.css";
import TabPanels from "./TabPanels";
import { Switch, Route, Redirect } from "react-router-dom";

const Tab = ({ weekday, date, index, value, changeTab, dayId }) => {
  const isActive = index === value;
  return (
    <button
      onClick={() => changeTab(index, dayId)}
      className={`tab ${isActive ? "active" : "inactive"}`}
    >
      {isActive && <p>{weekday} </p>}
      <p>{date}</p>
    </button>
  );
};

class MyTabs extends Component {
  render() {
    const { days, currentTab, changeTab } = this.props;
    return (
      <div className="tabs" ref={this.myRef}>
        {days.map((day, index) => (
          <Tab
            weekday={day.weekday}
            date={`${day.month}/${day.day}`}
            dayId={day.id}
            index={index}
            value={currentTab}
            changeTab={(newTab) => newTab === currentTab || changeTab(newTab)}
          />
        ))}
      </div>
    );
  }
}

class TabsContainer extends Component {
  state = {
    currentTab: 6,
    day: this.props.days && this.props.days[0],
    days: this.props.days,
    redirect: false,
  };

  changeTab = (newTab, dayId) =>
    this.setState({
      currentTab: newTab,
      day: this.state.days.find((d) => d.id === dayId),
    });

  componentDidMount = () => {
    const { week, weekId, setSelectedWeek } = this.props;
    Boolean(week) === false &&
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
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.days !== this.props.days) {
      this.setState({
        days: this.props.days,
        day: this.props.days[0],
      });
    }
  };

  render() {
    const isDesktop = this.props.screenWidth > 849;
    const { days, day, currentTab, redirect } = this.state;
    return (
      redirect ||
      (days && (
        <div className="tabs-container">
          <MyTabs
            changeTab={this.changeTab}
            days={days}
            currentTab={currentTab}
          />
          <Switch>
            <Route
              path={"/scheduletron/day_schedule/:dayId"}
              render={({ match }) => {
                return (
                  <TabPanels
                    days={days}
                    currentDay={day}
                    isDesktop={isDesktop}
                  />
                );
              }}
            />
          </Switch>
        </div>
      ))
    );
  }
}

export default TabsContainer;
