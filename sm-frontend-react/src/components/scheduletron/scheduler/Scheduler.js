import { Paper } from "@material-ui/core";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Scheduler extends Component {
  state = {
    day: this.props.day,
  };

  componentDidMount = () => {
    console.log("Dauh day: ", this.props);
    if (!!this.state.day === false) {
      fetch(`/get_week_schedule/${this.props.match.params.week}`)
        .then((response) => response.json())
        .then((day) => {
          console.log("I run for some reason");
          this.setState({ day: day });
          this.props.handleSelect(day.weekSchedule);
        });
    }
  };

  render() {
    const { match } = this.props;
    console.log("Match??: ", match);
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F0F0F0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Paper
          elevation={2}
          style={{
            height: "80%",
            display: "inline-flex",
            margin: 10,
            background: "white",
            borderRadius: 7,
          }}
        >
          <div></div>
        </Paper>
        <Link>Back To Yesterday</Link>
        <Link>To Tommorrow</Link>
      </div>
    );
  }
}

export default withRouter(Scheduler);
