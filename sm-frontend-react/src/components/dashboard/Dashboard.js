import React, { Component } from "react";
import Divider from "@mui/material/Divider";
import { Paper, styled } from "@mui/material";
import "./dashboard.css";
import Visualizer from "../scheduletron/weektabs/visualizer/Visualizer";
import { timeToValue } from "../TimeFunctions";

const StyledPaper = styled(Paper)({
  display: "grid",
  gridTemplateRows: "40px 1fr",
});

const DashHeader = () => (
  <div className="dash-header">
    <h1>Dashboard</h1>
    <Divider style={{ margin: "5px 0px" }} className="dash-divider1" />
    <Divider style={{ margin: "5px 0px" }} className="dash-divider2" />
  </div>
);

class DashSchedule extends Component {
  state = {
    day: null,
  };

  componentDidMount = () => {
    fetch(`/get_day/${9}-${13}-${2021}`)
      .then((response) => response.json())
      .then((theDay) => {
        this.setState({ day: theDay });
      });
  };

  render() {
    const { day } = this.state;
    return (
      day && (
        <Paper>
          <Visualizer
            day={day}
            workblocks={day.workblocks.map(({ user, startTime, endTime }) => ({
              startTime: timeToValue(startTime),
              endTime: timeToValue(endTime),
              user: user,
            }))}
            isDesktop = {true}
          />
        </Paper>
      )
    );
  }
}

const UpcomingShifts = () => {
  return (
    <StyledPaper>
      <Paper
        style={{
          background: "#F6F6F6",
          borderRadius: "7px 7px 0px 0px",
        }}
      >
        <p
          style={{
            background: "#275C78",
            margin: 0,
            height: "100%",
            width: "max-content",
            padding: "0px 10px",
            borderRadius: "7px 0px 0px 0px",
            color: "white",
          }}
        >
          My Upcoming Shifts
        </p>
      </Paper>
      <p>
        Ea et aliquip magna esse. Officia nostrud esse nisi excepteur. Aliquip
        aliquip in fugiat magna incididunt ad labore esse dolor. Anim pariatur
        esse pariatur ullamco occaecat. Voluptate aliquip quis fugiat occaecat
        mollit non aute id veniam sint nisi qui. Est incididunt in non
        consectetur incididunt fugiat consequat veniam.
      </p>
    </StyledPaper>
  );
};

const UpcomingReqOffs = () => {
  return <div></div>;
};

class Dashboard extends Component {
  state = {
    day: null,
  };

  render() {
    return (
      <div style={{ margin: "0px 80px", flex: 1 }}>
        <DashHeader />
        <div className="dash-content">
          <DashSchedule />
          <UpcomingShifts />
          <UpcomingReqOffs />
        </div>
      </div>
    );
  }
}

export default Dashboard;
