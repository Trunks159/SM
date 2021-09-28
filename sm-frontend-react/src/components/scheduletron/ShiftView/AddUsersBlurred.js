import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Button, Divider } from "@material-ui/core";

const styles = () => ({
    blurredDiv: {
        flexDirection: "column",
        backgroundColor: "rgba(0, 0, 0, .3)",
        width: "100vw",
        height: "100vh",
        position: "absolute",
        right: 0,
        bottom: 0,
        backdropFilter: "blur(5px)",
        borderRadius: "15px 0px 0px 0px",
        "& p": {
          color: "white",
          fontSize: 35,
        },
      },
    closeBtn: {
        position: "absolute",
        top: 5,
        right: 5,
        width: 45,
      },

      newDiv : {
        position :'absolute',
        width :'100%',
        height :'100%',
        display :'flex',
        flexDirection :'row',
        alignItems :'center',
      },
 
  usersDiv: {
    position: "absolute",
    right: 10,
    height: "80%",
    width: "45%",
    margin: "0 auto",
    marginTop: "50px",
    background: "rgba(255,255,255, .5)",
    padding: 10,
    borderRadius: 50,
  },
  usersList :{
    maxHeight :'100%',
    overflowY : 'auto',
    width : '70%',
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "auto",
    gridRowGap: "10px",
    justifyItems: "center",
    alignItems: "center",
},
  workerInfoNone:{
    background: "rgba(255,255,255, .7)",
    width :'45%',
    height : '46%',
    position :'fixed',
    left :10,
    borderRadius: 50,
  },
  
 
});

class AddUsersBlurred extends Component {
  state = {
    selectedUsers: [],
    lastSelectedUser : null,
  };

  render() {
    const { classes, imgSrc, users } = this.props;
    return (
      <div className={classes.blurredDiv}>
        <Button className={classes.closeBtn} onClick={this.handleClick}>
          <img
            style={{ width: "100%", height: "100%" }}
            src={imgSrc + "/Remove Icon.svg"}
          />
        </Button>
        <div className = {classes.newDiv}>
          {this.state.selectedUsers.length > 0 ? (
            <div className = {classes.workerInfo}>
              <img src={imgSrc + "/White Profile Icon.svg"} />
              <p>{this.state.lastSelectedUser.firstName}</p>
              <p>Hours This Week</p>
              <p>44</p>
              <p>Position</p>
              <p>{this.state.lastSelectedUser.position}</p>
              <p>Preferences</p>
              <p>Weekdays</p>
            </div>
          ) : (
            <div className = {classes.workerInfoNone}>
              <img src={imgSrc + "/White Profile Icon.svg"} />
              <p>Select Workers</p>
            </div>
          )}

        <div className={classes.usersDiv}>
          <p style = {{margin : 'none' }}>Select Workers</p>
          <Divider style={{ background: "white", margin : '0' }} />
          {users && (
            <ul className={classes.usersList}>
              {users.map((user) => (
                <li className={classes.userBtn} key={user.id}>
                  <img src={imgSrc + "/Profile Colored Icon.svg"} />
                  <p>{user.firstName}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AddUsersBlurred);
