import React, { Component } from "react";
import "./weektabs.css";
import Functions from "./functions/Functions";
import { Paper } from "@mui/material";
import MainContent from "./MainContent";
import TabPanels from "./TabPanels";

const Tab = ({ weekday, date, index, value, changeTab }) => {
  const isActive = index === value;
  return (
    <button
      onClick={() => changeTab(index)}
      className={`tab ${isActive ? "active" : "inactive"}`}
    >
      {isActive && <p>{weekday} </p>}
      <p>{date}</p>
    </button>
  );
};

function Tabs({ days, currentTab, changeTab }) {
  return (
    <div className="tabs">
      {days.map((day, index) => (
        <Tab
          weekday={day.weekday}
          date={`${day.month}/${day.day}`}
          index={index}
          value={currentTab}
          changeTab={(newTab) => newTab === currentTab || changeTab(newTab)}
        />
      ))}
    </div>
  );
}

class TabsContainer extends Component {
  state = {
    currentTab : 0,
    day: this.props.day,
    days: this.props.days,
  };

  changeTab = (newTab)=> this.setState({currentTab : newTab});

  componentDidMount = () => {
    Boolean(this.props.day) === false &&
      fetch(`/get_week_schedule/${this.props.dayId}`)
        .then((response) => response.json())
        .then(({ day, weekSchedule, scheduleSet }) => {
          const { handleSelect, setScheduleSet } = this.props;
          this.setState({ day: day, days: weekSchedule.schedule });
          handleSelect({ week: weekSchedule.schedule, id: weekSchedule.id });
          setScheduleSet(scheduleSet);
        });
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.day !== this.props.day) {
      this.setState({ day: this.props.day });
    }
  };

 
  render() {
    const isDesktop = this.props.screenWidth > 849;
    const { days, day, currentTab } = this.state;

    return (
      day && (
        <div className="tabs-container">
          <Tabs changeTab={this.changeTab} days={days} currentTab = {currentTab} />
          <TabPanels days = {days} currentDay = {day} />
        </div>
      )
    );
  }
}

export default TabsContainer;
