import { Button } from "@material-ui/core";
import React, { Component } from "react";
import closeIcon from "../../../assets/images/Close Icon.svg";
import whiteProfileIcon from "../../../assets/images/White Profile Icon.svg";
import addIcon from "../../../assets/images/Add Icon Alt 2.svg";
import { withStyles } from "@material-ui/styles";
import UserThumbnail from "./UserThumbnail";

const styles = () => ({
  blurred: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(0, 0, 0, .3)",
    width: "100vw",
    height: "100vh",
    backdropFilter: "blur(5px)",
    position: "fixed",
    bottom: 0,
    right: 0,
  },
  workersList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    padding : 10,
    margin : 5,
    marginTop : 0,
    height: '60%',
    overflowY : 'auto',
  },
  closeWindow: {
    alignSelf: "flex-end",
    margin: 20,
  },
  box1: {
    alignSelf: "center",
    background: "rgba(255, 255, 255, .58)",
    borderRadius: "50px",
    color: "white",
    height: 242,
    margin: 20,
  },
  box2: {
    alignSelf: "center",
    background: "rgba(255, 255, 255, .58)",
    borderRadius: "50px",
    color: "white",
    height: 339,
    width: 321,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    '& button':{
        alignSelf : 'stretch',
        margin : 20,
        border : '2px solid white',
    }
  },
  selectWorkers : {
  },
});

class AddWorkers extends Component {
  state = {
    worker: null,
  };
  render() {
    const { classes, workers, closeWindow } = this.props;
    return (
      <div className={classes.blurred}>
        <Button className={classes.closeWindow} onClick={closeWindow}>
          <img src={closeIcon} />
        </Button>

        <div className={classes.box1}>
          {this.state.worker ? (
            <>
              <p>
                {this.state.worker.firstName} {this.state.worker.lastName}
              </p>
            </>
          ) : (
            <>
              <img src={whiteProfileIcon} />
              <p className = {classes.selectWorkers}> Select Workers</p>
            </>
          )}
        </div>
        <div className={classes.box2}>
          <p style = {{fontSize : 22, margin : 10,}}>Select Workers</p>
          <div className={classes.workersList}>
            {workers.map(({ firstName }) => (
              <UserThumbnail
                key={firstName}
                name={firstName}
                available={true}
                selected={true}
              />
            ))}
          </div>
          <Button>
            <img src={addIcon} />
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AddWorkers);
