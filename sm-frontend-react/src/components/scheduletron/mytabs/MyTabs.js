import React, { Component } from "react";
import "./mytabs.css";
import Options from "./Options";
import NewDrawer from "./NewDrawer";
import DayNightToggle from "./daynight/DayNightToggle";
import DayNightSwitches from "./daynight/DayNightSwitches";
import TimeLine from "./TimeLine";
import TimeSlot from "./TimeSlot";

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

class Tabs extends Component {
  state = {
    value: 0,
  };

  handleTab = (value) =>
    this.state.value === value || this.setState({ value: value });

  render() {
    return (
      <div className="tabs">
        {this.props.days.map((day, index) => (
          <Tab
            weekday={day.weekday}
            date={`${day.month}/${day.day}`}
            index={index}
            value={this.state.value}
            handleTab={this.handleTab}
          />
        ))}
      </div>
    );
  }
}

class Actions extends Component {
  state = {};
  render() {
    return (
      <NewDrawer>
        <Options />
      </NewDrawer>
    );
  }
}

class TabContent extends Component {
  state = {};
  render() {
    return <div></div>;
  }
}

class TabsContainer extends Component {
  state = {
    day: this.props.day,
    days: this.props.days,
  };

  componentDidMount = () => {
    console.log("Duh day: ", this.props.days);
    if (Boolean(this.props.day) === false) {
      fetch(`/get_week_schedule/${this.props.dayId}`)
        .then((response) => response.json())
        .then(({ day, weekSchedule, scheduleSet }) => {
          console.log("Lets see: ", weekSchedule);
          const { handleSelect, setScheduleSet } = this.props;
          this.setState({ day: day, days: weekSchedule.schedule });
          handleSelect({ week: weekSchedule.schedule, id: weekSchedule.id });
          setScheduleSet(scheduleSet);
        });
    }
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.day !== this.props.day) {
      this.setState({ day: this.props.day });
    }
  };

  render() {
    const { days, day } = this.state;
    const { screenWidth } = this.props;
    return (
      day && (
        <div className="tabs-container">
          <Tabs days={this.state.days} />
          <div className="tab-content">
            {screenWidth > 849 ? <DayNightSwitches /> : <DayNightToggle />}
            <div className="bar-graph">
              <TimeLine isDesktop={screenWidth >= 849} />
              {day.workblocks.map((workblock) => (
                <TimeSlot workblock={workblock} />
              ))}
            </div>
          </div>

          <Actions />
        </div>
      )
    );
  }
}

export default TabsContainer;
