import React, { Component } from "react";
import Divider from "@mui/material/Divider";
import { Button, Paper, styled } from "@mui/material";
import "./dashboard.css";
import Visualizer from "../scheduletron/weektabs/visualizer/Visualizer";
import { timeToValue } from "../TimeFunctions";
import launchIcon from "./assets/Launch Icon.svg";
import { Link } from "react-router-dom";

const StyledPaper = styled(Paper)({
  display: "grid",
  gridTemplateRows: "40px 1fr",
  height: 270,
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
        <Paper
          className="dash-schedule"
          style={{
            maxWidth: 1000,
            position: "relative",
            height: 540,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              background: "#F6F6F6",
              height: 40,
              display: "flex",
              alignItems: "center",
              borderRadius: "7px 7px 0px 0px",
              width: "100%",
            }}
          >
            <div
              style={{
                color: "white",
                background: "#275C78",
                height: "100%",
                display: "flex",
                alignItems: "center",
                borderRadius: "7px 7px 0px 0px",
                padding: "0px 20px",
              }}
            >
              <h6 style={{ paddingRight: 10, fontWeight: "normal" }}>
                Here's today's schedule:
              </h6>
              <h3
                style={{ fontWeight: 600 }}
              >{`${day.weekday} ${day.month}/${day.day}`}</h3>
            </div>
          </div>

          <Visualizer
            day={day}
            workblocks={day.workblocks.map(({ user, startTime, endTime }) => ({
              startTime: timeToValue(startTime),
              endTime: timeToValue(endTime),
              user: user,
            }))}
            isDesktop={this.props.isDesktop}
          />
          <Link
            to={`/scheduletron/${day.weekId}/${day.index}`}
            className="dash-schedule-link"
          >
            <img src={launchIcon} />
          </Link>
        </Paper>
      )
    );
  }
}

const UpcomingShifts = () => {
  return (
    <StyledPaper>
      <div
        style={{
          background: "#F6F6F6",
          borderRadius: "7px 7px 0px 0px",
          display: "flex",
          height: 50,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#275C78",
            width: "max-content",
            borderRadius: "7px 7px 0px 0px",
            padding: "0px 15px",
          }}
        >
          <h3
            style={{
              padding: "0px 10px",
              borderRadius: "7px 0px 0px 0px",
              color: "white",
              fontWeight: "normal",
            }}
          >
            My Upcoming Shifts
          </h3>
        </div>
      </div>
      <p style={{ overflowY: "auto" }}>
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
    const { currentUser, isDesktop } = this.props;
    return (
      <div className="dashboard">
        <DashHeader />
        <div className="dash-content">
          <DashSchedule isDesktop={isDesktop} />
          <UpcomingShifts />
          <UpcomingReqOffs />
        </div>
      </div>
    );
  }
}

export default Dashboard;
