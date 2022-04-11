import React, { Component } from "react";
import scheduleIcon from "../../assets/images/Schedule Icon Black.svg";
import { Button, Paper, withStyles } from "@material-ui/core";

const styles = () => ({
  label: {
    flexDirection: "column",
    color: "black",
    fontSize: 25,
  },
  button: {
    padding: 30,
    display: "flex",
  },
});

class Home extends Component {
  state = {};
  render() {
    const { match, classes } = this.props;
    return (
      <div>
        <p>To start, select schedule to view or edit</p>
        <div>
          <Paper
            style={{
              width: 145,
              height: 205,
              background: "#DADADA",
              position: "relative",
              borderRadius : '7px',
            }}
          >
            <Paper
              style={{

                width: "20%",
                height: "100%",
                background: "#F0F0F0",
                position: "absolute",
                borderRadius : '7px 0px 0px 7px',
              }}
            ></Paper>
            <Button  style = {{position : 'absolute', left : 0, right : 0, marginLeft : 'auto', marginRight : 'auto'}} classes={{ label: classes.label, root: classes.button }}>
              9/17
              <img style={{ }} src={scheduleIcon} />
              9/24
            </Button>
          </Paper>
        </div>
        <div></div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
