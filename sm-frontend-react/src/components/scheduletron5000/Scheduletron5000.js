import React, { Component } from "react";
import VerticleSlider from "./VerticleSlider";
import Times from "./Times";
/*import { Redirect } from "react-router-dom";*/

class Scheduletron5000 extends Component {
  state = {
    users: this.props.users,
    workblocks: this.props.workblocks,
    message: null,
    day: this.props.day,
  };

  weSliding = (e, new_value, user) => {
    let workblocks = [...this.state.workblocks];
    let workblock = workblocks.find((workblock) => workblock.user === user);
    const index = workblocks.indexOf(workblock);
    workblocks.splice(index, 1);
    workblock.times = new_value;
    workblocks.splice(index, 0, workblock);
    this.setState({ workblocks: workblocks });
  };

  makeSlider = (user) => {
    /*I want to initiate a workblock here */
    const workblock = {
      user: user,
      times: ["08:00", "16:00"],
      day: this.state.day,
    };
    let users = [...this.state.users];
    const index = users.indexOf(user);
    users.splice(index, 1);
    let workblocks = [...this.state.workblocks];
    workblocks.push(workblock);
    this.setState({ users: users, workblocks: workblocks });
    /*
    let inactive_users = [...this.state.inactive_users];
    const index = this.state.inactive_users.indexOf(user);
    inactive_users.splice(index, 1);
    this.setState({ inactive_users: inactive_users });
    let active_users = [...this.state.active_users];
    active_users.push(user);
    this.setState({ active_users: active_users });*/
  };
  removeSlider = (user) => {
    let workblocks = [...this.state.workblocks];
    const index = workblocks.indexOf(
      workblocks.find((workblock) => workblock.user === user)
    );
    workblocks.splice(index, 1);
    this.setState({});
    let users = [...this.state.users];
    users.push(user);
    this.setState({ users: users, workblocks: workblocks });
  };

  saveChanges = async () => {
    const workblocks = this.state.workblocks.map((workblock) => ({
      user_id: workblock.user.id,
      start_time: workblock.times[0],
      end_time: workblock.times[1],
    }));
    console.log("The day is apparently: ", this.state.day.id);
    const rawResponse = await fetch("/receive_data", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        day_id: this.state.day.id,
        workblocks: workblocks,
      }),
    });
    const content = await rawResponse.json();
    console.log(content);
    /*this.props.fetchDays();*/

    this.setState({
      message: "This day's schedule has been saved!",
    });
    setTimeout(() => {
      this.setState({ message: null });
    }, 1600);
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        day: this.props.day,
        users: this.props.users,
        workblocks: this.props.workblocks,
      });
    }
  }

  /*
  componentDidMount = () => {
    if (this.props.day) {
      const day = this.props.checkDb(this.props.day);
      this.setState({ inactive_users: this.props.users, day: day });
      console.log("Inactive Users: ", this.state.inactive_users, "day: ", day);
      if (day) {
        for (let workblock of day.workblocks) {
          let user = this.state.inactive_users.find(
            (user) => user.id === workblock.user_id
          );
          this.removeSlider(user);
          this.makeSlider(user);
        }
      }
    }
  };

  */
  render = () => {
    console.log("Workblocks are: ", this.state.workblocks);
    return (
      <div className="scheduletron">
        <div className="timesliders">
          <Times />
          <div className="sliders">
            {this.state.workblocks.length > 0 ? (
              this.state.workblocks.map((workblock) => (
                <VerticleSlider
                  weSliding={this.weSliding}
                  removeSlider={this.removeSlider}
                  user={workblock.user}
                  key={workblock.user.id}
                />
              ))
            ) : (
              <h1>You Gotta Add Some Workers</h1>
            )}
          </div>
        </div>
        {this.state.users.length > 0
          ? this.state.users.map((user) => (
              <button
                className="inactive-user"
                key={user.id}
                onClick={() => this.makeSlider(user)}
              >
                {user.first_name} {user.last_name[0]}.
              </button>
            ))
          : null}
        <button
          onClick={() => {
            console.log(this.state.day);
            console.log(this.state.workblocks);
          }}
        >
          Display Workblocks
        </button>
        <button className="btn" onClick={this.saveChanges}>
          Save Changes
        </button>
      </div>
    );
  };
}

export default Scheduletron5000;
