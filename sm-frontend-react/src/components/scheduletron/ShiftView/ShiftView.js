import React, { Component } from "react";
import { Backdrop, Button, Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { motion } from "framer-motion";
import ProfileTag from "./ProfileTag";
import AddUsersBlurred from "./AddUsersBlurred";

const styles = () => ({
  main: {
    width: "100%",
  },
  head: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: "85px",
  },
  mainContent: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  workblocks: {
    margin: "10px",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
  },

  btn: {
    position: "fixed",
    bottom: 7,
    right: 10,
  },
  sortBtn: {
    textTransform: "none",
    background: "white",
    borderRadius: 7,
    alignSelf: "start",
  },
  
  userBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "white",
    height: 80,
    width: 80,
    borderRadius: 10,
    textTransform: "none",
    "& img": {
      justifySelf: "center",
      marginTop: "11.11%",
      margin: 0,
      width: "50%",
    },
    "& p": {
      marginBottom: 0,
      marginTop: 5,
      fontSize: 12,
      color: "#328F83",
    },
  },
});

const pageVariant2 = {
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "-100vw",
  },
};

const pageTransition = {
  duration: 0.2,
  transition: "linear",
};

class ShiftView extends Component {
  state = {
    addUserOpen: false,
    workblocks: [
      {
        startTime: 0,
        endTime: 100,
        user: {
          firstName: "Nick",
          id: 1,
          position: "manager",
        },
      },
      {
        startTime: 0,
        endTime: 100,
        user: {
          firstName: "Jordan",
          id: 1,
          position: "crew",
        },
      },
    ],
    users: [
      {
        firstName: "Kimberly",
        id: 2,
        position: "crew",
      },
      {
        firstName: "Shareem",
        id: 14,
        position: "crew",
      },
      {
        firstName: "Mike",
        id: 123,
        position: "manager",
      },
      {
        firstName: "Bob",
        id: 241,
        position: "crew",
      },
    ],
    selectedUsers: [],
  };

  handleSlider = (e, new_value, id) => {
    let { workblocks } = this.state;
    let workblock = this.state.workblocks.find((wb) => wb.user.id === id);

    if (workblock) {
      const index = workblocks.indexOf(workblock);
      workblocks.splice(index, 1);
      workblock.startTime = new_value[0];
      workblock.endTime = new_value[1];
      workblocks.push(workblock);
      this.setState({ workblocks: workblocks });
    } else {
      console.log("Cant find it");
    }
    console.log("Workblocks: ", this.state.workblocks);
  };

  addUsers = (users) => {
    const workblocks = users.map((user) => ({
      user: user,
      startTime: 0,
      endTime: 100,
    }));
    this.setState({ workblocks: this.state.workblocks.concat(workblocks) });
  };

  handleClick = () => {
    this.setState({ addUsersOpen: !this.state.addUsersOpen });
  };

  lastSelectedUser = () => {};

  /*let main = document.getElementById("mainContent");
    main.style.filter = "blur(4px)";
    main.style.pointerEvents = 'none';
    let modal = document.getElementById("myModal");*/

  render() {
    const { classes, colorPalette, imgSrc } = this.props;

    return (
      <motion.div
        initial="out"
        animate="in"
        exit="out"
        variants={pageVariant2}
        transition={pageTransition}
        className={classes.main}
      >
        <div className={classes.head}>stuff</div>
        <div
          className={classes.mainContent}
          style={{ background: colorPalette.secondaryLight }}
        >
          <div className={classes.workblocks}>
            <Button className={classes.sortBtn}>
              Sort
              <img src={imgSrc + "/Details Icon.svg"} />
            </Button>
            {this.state.workblocks.map(({ user, startTime, endTime }) => (
              <ProfileTag
                id={user.id}
                firstName={user.firstName}
                position={user.position}
                key={user.id}
                startTime={startTime}
                endTime={endTime}
                imgSrc={imgSrc}
                handleSlider={this.handleSlider}
              />
            ))}
            <Button className={classes.btn} onClick={this.handleClick}>
              <img src={imgSrc + "/Add Users Icon.svg"} />
            </Button>
          </div>

          {this.state.addUsersOpen && <AddUsersBlurred imgSrc={imgSrc} users = {this.state.users} />}
        </div>
      </motion.div>
    );
  }
}

export default withStyles(styles)(ShiftView);
