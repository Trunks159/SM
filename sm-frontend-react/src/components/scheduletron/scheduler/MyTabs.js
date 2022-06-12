import React, { Component } from "react";
import { Paper } from "@mui/material";
import Options from "./Options";
import NewDrawer from "./NewDrawer";

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

class TabContent extends Component {
  state = {};
  render() {
    return (
      <NewDrawer>
        <Options />
      </NewDrawer>
    );
  }
}

class TabsContainer extends Component {
  state = {};
  render() {
    const { days } = this.props;
    return (
      <div className="tabs-container">
        <Tabs days={days} />
        <TabContent />
      </div>
    );
  }
}

export default TabsContainer;
