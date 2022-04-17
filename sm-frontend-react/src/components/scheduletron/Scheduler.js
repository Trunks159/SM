import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Scheduler extends Component {
  state = {
    day : this.props.day,
  };

  componentDidMount = ()=>{
    if(!!this.state.day){
      fetch(`/get_week_schedule${}`)
    } 
  }

  render() {
      const {match} = this.props;
    console.log('Match??: ', match);
    return (<div>Stuff2


    </div>);
  }
}

export default withRouter(Scheduler);
