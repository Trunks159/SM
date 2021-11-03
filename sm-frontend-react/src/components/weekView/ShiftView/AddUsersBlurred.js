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
      margin: 0,
    },
  },
  closeBtn: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 45,
  },

  newDiv: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  usersDiv: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    right: 10,
    height: "80%",
    width: "45%",
    margin: "0 auto",
    marginTop: "50px",
    background: "rgba(255,255,255, .5)",
    padding: 10,
    borderRadius: 50,
    "& p": {},
    gap: "5px",
  },
  usersList: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "auto",
    gridRowGap: "10px",
    gridColumnGap: "10px",
    placeContent: "start",
    justifyItems: "center",
    overflowY: "auto",
    height: "77%",
    width: "85%",
    padding: "10px",
    overflowX: "hidden",
  },
  workerInfoNone: {
    background: "rgba(255,255,255, .7)",
    width: "45%",
    height: "46%",
    position: "fixed",
    left: 10,
    borderRadius: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  workerInfo: {
    background: "rgba(255,255,255, .7)",
    width: "45%",
    height: "46%",
    position: "fixed",
    left: 10,
    borderRadius: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& img": {
      width: 80,
      height: 80,
      margin: 20,
    },
  },
  userBtn: {
    "&:hover": {
      backgroundColor: "orange",
      border: "2px solid orange",
    },
    border: "2px solid white",
    borderRadius: 13,
    height: "80px",
    width: "80px",
    "& img": {
      width: "65%",
    },
    padding: "3px",
    paddingLeft: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2px",
  },
  p1: {
    fontSize: 36,
  },
  p2: {
    fontSize: 10,
  },
  p3: {
    fontSize: 23,
    color: "#328F83",
  },
  whiteAddIcon: {
    border: "2px solid white",
    borderRadius: "6px",
    width: "80%",
    height: "50px",
    margin: "7px",
  },
});

class AddUsersBlurred extends Component {
  state = {
    selectedUsers: [],
    lastSelectedUser: null,
  };

  changeSelectedUsers = (user) => {
    let { selectedUsers } = this.state;
    const foundUser = selectedUsers.find((u) => u === user);
    if (foundUser) {
      const index = selectedUsers.findIndex((u) => u === foundUser);
      selectedUsers = selectedUsers
        .slice(0, index)
        .concat(selectedUsers.slice(index + 1));
      selectedUsers = [...selectedUsers, foundUser];
      this.setState({ selectedUsers: selectedUsers });
    } else {
      selectedUsers.push(user);
      console.log("The User : ", user);
      this.setState({ selectedUsers: selectedUsers, lastSelectedUser: user });
    }
  };

  handleHover = (user) => {
    this.setState({ lastSelectedUser: user });
  };

  handleSubmit = () =>{
    this.props.submitUsers(this.state.selectedUsers);
      this.props.closeBlurredDiv();
      
  }

  render() {
    const { classes, imgSrc, users, closeBlurredDiv } = this.props;
    return (
      <div className={classes.blurredDiv}>
        <div className={classes.newDiv}>
          <Button className={classes.closeBtn} onClick={closeBlurredDiv}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={imgSrc + "/Remove Icon.svg"}
            />
          </Button>
          {this.state.selectedUsers.length > 0 ? (
            <div className={classes.workerInfo}>
              <img src={imgSrc + "/White Profile Icon.svg"} />
              <p className={classes.p1}>
                {this.state.lastSelectedUser.firstName}
              </p>
              <p className={classes.p2}>Hours This Week</p>
              <p className={classes.p3}>44</p>
              <p className={classes.p2}>Position</p>
              <p className={classes.p3}>
                {this.state.lastSelectedUser.position}
              </p>
              <p className={classes.p2}>Preferences</p>
              <p className={classes.p3}>Weekdays</p>
            </div>
          ) : (
            <div className={classes.workerInfoNone}>
              <img src={imgSrc + "/White Profile Icon.svg"} />
              <p>Select Workers</p>
            </div>
          )}

          <div className={classes.usersDiv}>
            <p style={{ fontSize: "20px", margin: "5px" }}>Select Workers</p>
            <Divider
              style={{ background: "white", margin: "5px", width: "100%" }}
            />
            {users && (
              <div className={classes.usersList}>
                {users.map((user) => {
                  user.isAvailable = true;
                  return (
                    <div
                      className={classes.userBtn}
                      style={{
                        background: user.isAvailable
                          ? this.state.selectedUsers.find((u) => u === user)
                            ? "#328F83"
                            : "#D8F4EE"
                          : "#F0F0F0",
                      }}
                      onMouseEnter={() => this.handleHover(user)}
                      onClick={() => this.changeSelectedUsers(user)}
                    >
                      <img src={imgSrc + "/White Profile Icon.svg"} />
                      <p>{user.firstName}</p>
                    </div>
                  );
                })}
              </div>
            )}
            <Button className={classes.whiteAddIcon} onClick = {this.handleSubmit}>
              <img src={imgSrc + "/White Add Icon.svg"} />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AddUsersBlurred);
