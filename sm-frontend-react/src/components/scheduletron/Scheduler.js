import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Scheduler extends Component {
  state = {};
  render() {
      const {match} = this.props;

    return <div>Stuff2</div>;
  }
}

export default withRouter(Scheduler);
