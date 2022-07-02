import React, { Component } from "react";
import "./mytabs.css";
import Functions from "./functions/Functions";
import { Paper } from "@mui/material";
import MainContent from "./MainContent";

const Tab = ({ weekday, date, index, value, handleTab }) => {
  const isActive = index === value;
  return (
    <button
      onClick={() => handleTab(index)}
      className={`tab ${isActive ? "active" : "inactive"}`}
    >
      {isActive && <p>{weekday} </p>}
      <p>{date}</p>
    </button>
  );
};

function Tabs({ days }) {
  const [value, setValue] = React.useState(0);
  return (
    <div className="tabs">
      {days.map((day, index) => (
        <Tab
          weekday={day.weekday}
          date={`${day.month}/${day.day}`}
          index={index}
          value={value}
          handleTab={(newValue) => newValue === value || setValue(newValue)}
        />
      ))}
    </div>
  );
}

class TabsContainer extends Component {
  state = {
    day: this.props.day,
    days: this.props.days,
    currentFunction: 1,
  };

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

  setCurrentFunction = (e, newValue) =>
    newValue !== this.state.currentTab &&
    this.setState({ currentFunction: newValue });

  render() {
    const isDesktop = this.props.screenWidth > 849;
    const { days, day, currentFunction } = this.state;

    return (
      day && (
        <div className="tabs-container">
          <Tabs days={days} />
          <Paper style={{ display: "flex" }}>
            <Functions
              isDesktop={isDesktop}
              currentFunction={currentFunction}
              setCurrentFunction={this.setCurrentFunction}
            />
            <MainContent  isDesktop = {isDesktop} day = {day} currentFunction = {currentFunction}/>

          </Paper>
        </div>
      )
    );
  }
}

export default TabsContainer;
