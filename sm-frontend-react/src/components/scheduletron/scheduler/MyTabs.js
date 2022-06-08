import React, { Component } from "react";
import { Paper } from "@mui/material";

const Tab = ({ weekday, date, isActive }) => (
  <button
    className="tab"
    style={{ background: isActive ? "#275C78" : "#627E8C" }}
  >
    {isActive && <p>{weekday} </p>}
    <p>{date}</p>
  </button>
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
    return (
      <Paper className="tab-content">
        Officia non mollit sunt consectetur minim velit sunt cupidatat
        consectetur qui culpa. Duis non ad aliqua tempor ex velit duis
        reprehenderit ex cillum incididunt est reprehenderit. Voluptate laborum
        ad pariatur laborum cillum quis sint. Dolor ullamco pariatur eiusmod
        officia aute sint elit sint. Officia non mollit sunt consectetur minim
        velit sunt cupidatat consectetur qui culpa. Duis non ad aliqua tempor ex
        velit duis reprehenderit ex cillum incididunt est reprehenderit.
        Voluptate laborum ad pariatur laborum cillum quis sint. Dolor ullamco
        pariatur eiusmod officia aute sint elit sint. Officia non mollit sunt
        consectetur minim velit sunt cupidatat consectetur qui culpa. Duis non
        ad aliqua tempor ex velit duis reprehenderit ex cillum incididunt est
        reprehenderit. Voluptate laborum ad pariatur laborum cillum quis sint.
        Dolor ullamco pariatur eiusmod officia aute sint elit sint. Officia non
        mollit sunt consectetur minim velit sunt cupidatat consectetur qui
        culpa. Duis non ad aliqua tempor ex velit duis reprehenderit ex cillum
        incididunt est reprehenderit. Voluptate laborum ad pariatur laborum
        cillum quis sint. Dolor ullamco pariatur eiusmod officia aute sint elit
        sint. Officia non mollit sunt consectetur minim velit sunt cupidatat
        consectetur qui culpa. Duis non ad aliqua tempor ex velit duis
        reprehenderit ex cillum incididunt est reprehenderit. Voluptate laborum
        ad pariatur laborum cillum quis sint. Dolor ullamco pariatur eiusmod
        officia aute sint elit sint. Officia non mollit sunt consectetur minim
        velit sunt cupidatat consectetur qui culpa. Duis non ad aliqua tempor ex
        velit duis reprehenderit ex cillum incididunt est reprehenderit.
        Voluptate laborum ad pariatur laborum cillum quis sint. Dolor ullamco
        pariatur eiusmod officia aute sint elit sint. Officia non mollit sunt
        consectetur minim velit sunt cupidatat consectetur qui culpa. Duis non
        ad aliqua tempor ex velit duis reprehenderit ex cillum incididunt est
        reprehenderit. Voluptate laborum ad pariatur laborum cillum quis sint.
        Dolor ullamco pariatur eiusmod officia aute sint elit sint. Officia non
        mollit sunt consectetur minim velit sunt cupidatat consectetur qui
        culpa. Duis non ad aliqua tempor ex velit duis reprehenderit ex cillum
        incididunt est reprehenderit. Voluptate laborum ad pariatur laborum
        cillum quis sint. Dolor ullamco pariatur eiusmod officia aute sint elit
        sint. Officia non mollit sunt consectetur minim velit sunt cupidatat
        consectetur qui culpa. Duis non ad aliqua tempor ex velit duis
        reprehenderit ex cillum incididunt est reprehenderit. Voluptate laborum
        ad pariatur laborum cillum quis sint. Dolor ullamco pariatur eiusmod
        officia aute sint elit sint. Officia non mollit sunt consectetur minim
        velit sunt cupidatat consectetur qui culpa. Duis non ad aliqua tempor ex
        velit duis reprehenderit ex cillum incididunt est reprehenderit.
        Voluptate laborum ad pariatur laborum cillum quis sint. Dolor ullamco
        pariatur eiusmod officia aute sint elit sint. Officia non mollit sunt
        consectetur minim velit sunt cupidatat consectetur qui culpa. Duis non
        ad aliqua tempor ex velit duis reprehenderit ex cillum incididunt est
        reprehenderit. Voluptate laborum ad pariatur laborum cillum quis sint.
        Dolor ullamco pariatur eiusmod officia aute sint elit sint. Officia non
        mollit sunt consectetur minim velit sunt cupidatat consectetur qui
        culpa. Duis non ad aliqua tempor ex velit duis reprehenderit ex cillum
        incididunt est reprehenderit. Voluptate laborum ad pariatur laborum
        cillum quis sint. Dolor ullamco pariatur eiusmod officia aute sint elit
        sint. Officia non mollit sunt consectetur minim velit sunt cupidatat
        consectetur qui culpa. Duis non ad aliqua tempor ex velit duis
        reprehenderit ex cillum incididunt est reprehenderit. Voluptate laborum
        ad pariatur laborum cillum quis sint. Dolor ullamco pariatur eiusmod
        officia aute sint elit sint. Officia non mollit sunt consectetur minim
        velit sunt cupidatat consectetur qui culpa. Duis non ad aliqua tempor ex
        velit duis reprehenderit ex cillum incididunt est reprehenderit.
        Voluptate laborum ad pariatur laborum cillum quis sint. Dolor ullamco
        pariatur eiusmod officia aute sint elit sint. Officia non mollit sunt
        consectetur minim velit sunt cupidatat consectetur qui culpa. Duis non
        ad aliqua tempor ex velit duis reprehenderit ex cillum incididunt est
        reprehenderit. Voluptate laborum ad pariatur laborum cillum quis sint.
        Dolor ullamco pariatur eiusmod officia aute sint elit sint. Officia non
        mollit sunt consectetur minim velit sunt cupidatat consectetur qui
        culpa. Duis non ad aliqua tempor ex velit duis reprehenderit ex cillum
        incididunt est reprehenderit. Voluptate laborum ad pariatur laborum
        cillum quis sint. Dolor ullamco pariatur eiusmod officia aute sint elit
        sint. Officia non mollit sunt consectetur minim velit sunt cupidatat
        consectetur qui culpa. Duis non ad aliqua tempor ex velit duis
        reprehenderit ex cillum incididunt est reprehenderit. Voluptate laborum
        ad pariatur laborum cillum quis sint. Dolor ullamco pariatur eiusmod
        officia aute sint elit sint. Officia non mollit sunt consectetur minim
        velit sunt cupidatat consectetur qui culpa. Duis non ad aliqua tempor ex
        velit duis reprehenderit ex cillum incididunt est reprehenderit.
        Voluptate laborum ad pariatur laborum cillum quis sint. Dolor ullamco
        pariatur eiusmod officia aute sint elit sint. Officia non mollit sunt
        consectetur minim velit sunt cupidatat consectetur qui culpa. Duis non
        ad aliqua tempor ex velit duis reprehenderit ex cillum incididunt est
        reprehenderit. Voluptate laborum ad pariatur laborum cillum quis sint.
        Dolor ullamco pariatur eiusmod officia aute sint elit sint. Officia non
        mollit sunt consectetur minim velit sunt cupidatat consectetur qui
        culpa. Duis non ad aliqua tempor ex velit duis reprehenderit ex cillum
        incididunt est reprehenderit. Voluptate laborum ad pariatur laborum
        cillum quis sint. Dolor ullamco pariatur eiusmod officia aute sint elit
        sint. Officia non mollit sunt consectetur minim velit sunt cupidatat
        consectetur qui culpa. Duis non ad aliqua tempor ex velit duis
        reprehenderit ex cillum incididunt est reprehenderit. Voluptate laborum
        ad pariatur laborum cillum quis sint. Dolor ullamco pariatur eiusmod
        officia aute sint elit sint. Officia non mollit sunt consectetur minim
        velit sunt cupidatat consectetur qui culpa. Duis non ad aliqua tempor ex
        velit duis reprehenderit ex cillum incididunt est reprehenderit.
        Voluptate laborum ad pariatur laborum cillum quis sint. Dolor ullamco
        pariatur eiusmod officia aute sint elit sint. Officia non mollit sunt
        consectetur minim velit sunt cupidatat consectetur qui culpa. Duis non
        ad aliqua tempor ex velit duis reprehenderit ex cillum incididunt est
        reprehenderit. Voluptate laborum ad pariatur laborum cillum quis sint.
        Dolor ullamco pariatur eiusmod officia aute sint elit sint. Officia non
        mollit sunt consectetur minim velit sunt cupidatat consectetur qui
        culpa. Duis non ad aliqua tempor ex velit duis reprehenderit ex cillum
        incididunt est reprehenderit. Voluptate laborum ad pariatur laborum
        cillum quis sint. Dolor ullamco pariatur eiusmod officia aute sint elit
        sint. Officia non mollit sunt consectetur minim velit sunt cupidatat
        consectetur qui culpa. Duis non ad aliqua tempor ex velit duis
        reprehenderit ex cillum incididunt est reprehenderit. Voluptate laborum
        ad pariatur laborum cillum quis sint. Dolor ullamco pariatur eiusmod
        officia aute sint elit sint. Officia non mollit sunt consectetur minim
        velit sunt cupidatat consectetur qui culpa. Duis non ad aliqua tempor ex
        velit duis reprehenderit ex cillum incididunt est reprehenderit.
        Voluptate laborum ad pariatur laborum cillum quis sint. Dolor ullamco
        pariatur eiusmod officia aute sint elit sint. Officia non mollit sunt
        consectetur minim velit sunt cupidatat consectetur qui culpa. Duis non
        ad aliqua tempor ex velit duis reprehenderit ex cillum incididunt est
        reprehenderit. Voluptate laborum ad pariatur laborum cillum quis sint.
        Dolor ullamco pariatur eiusmod officia aute sint elit sint. Officia non
        mollit sunt consectetur minim velit sunt cupidatat consectetur qui
        culpa. Duis non ad aliqua tempor ex velit duis reprehenderit ex cillum
        incididunt est reprehenderit. Voluptate laborum ad pariatur laborum
        cillum quis sint. Dolor ullamco pariatur eiusmod officia aute sint elit
        sint. Officia non mollit sunt consectetur minim velit sunt cupidatat
        consectetur qui culpa. Duis non ad aliqua tempor ex velit duis
        reprehenderit ex cillum incididunt est reprehenderit. Voluptate laborum
        ad pariatur laborum cillum quis sint. Dolor ullamco pariatur eiusmod
        officia aute sint elit sint. Officia non mollit sunt consectetur minim
        velit sunt cupidatat consectetur qui culpa. Duis non ad aliqua tempor ex
        velit duis reprehenderit ex cillum incididunt est reprehenderit.
        Voluptate laborum ad pariatur laborum cillum quis sint. Dolor ullamco
        pariatur eiusmod officia aute sint elit sint.
      </Paper>
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
