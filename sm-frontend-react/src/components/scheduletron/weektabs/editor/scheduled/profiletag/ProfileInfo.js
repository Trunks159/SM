import { Collapse, Button, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import expandIcon from "./assets/Expand Icon.svg";

const styles = () => ({
  expandBtn: {
    minWidth: 0,
    marginLeft: "auto",
  },
});

class ProfileInfo extends Component {
  state = {
    expanded: false,
    profileInfo: null,
  };

  componentDidUpdate = (prevProps) => {
    const { userId, dayId, expanded } = this.props;
    if (prevProps.expanded !== expanded) {
      if (Boolean(this.state.profileInfo) === false) {
        fetch(`/profile_info/${userId}/${dayId}`)
          .then((response) => response.json())
          .then((user) =>
            this.setState({ profileInfo: user, expanded: this.props.expanded })
          );
      } else {
        this.setState({ expanded: this.props.expanded });
      }
    }
  };

  render() {
    const { setExpanded, classes } = this.props;
    const { expanded } = this.state;
    return (
      <div
        style={{
          minHeight: 20,
          background: "#F0F0F0",
          display: "flex",
          flexDirection: "column",
          borderRadius: "0px 0px 7px 7px",
        }}
      >
        <Collapse in={this.state.expanded}>
          {this.state.profileInfo ? (
            <div>
              <p> {this.state.profileInfo.firstName} </p>
              <p> {this.state.profileInfo.lastName} </p>
              <p> {this.state.profileInfo.position} </p>
            </div>
          ) : (
            <p>Loading Profile</p>
          )}
        </Collapse>
        <Button
          onClick={() => setExpanded(!expanded)}
          className={classes.expandBtn}
        >
          <img
            alt={"expand"}
            style={{
              transitionDuration: ".3s",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg",
            }}
            src={expandIcon}
          />
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(ProfileInfo);
