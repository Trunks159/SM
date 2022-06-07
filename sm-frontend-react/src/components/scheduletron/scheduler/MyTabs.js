import React, { Component } from "react";

const Tab = ({ weekday, date, isActive }) => (
  <div className="tab" style = {{background : isActive ?  '#275C78' : '#627E8C'}}>
    {isActive && <p>{weekday} </p>}
    <p>{date}</p>
  </div>
);

class Tabs extends Component {
  state = {
    value: 0,
  };
  render() {
    return (
      <div className="tabs">
        {this.props.days.map((day, index) => (
          <Tab
            weekday={day.weekday}
            date={`${day.month}/${day.day}`}
            isActive={index === this.state.value}
          />
        ))}
      </div>
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
