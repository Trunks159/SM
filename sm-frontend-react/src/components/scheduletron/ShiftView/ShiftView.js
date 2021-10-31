import React, { Component } from "react";
import {Button, Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { motion } from "framer-motion";
import ProfileTag from "./ProfileTag";
import AddUsersBlurred from "./AddUsersBlurred";
import { valueToDt } from "../../mySlider/TimeFunctions";

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
    marginBottom:0,
    
  },

  btn: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  sortBtn: {
    textTransform: "none",
    background: "white",
    borderRadius: 7,
    alignSelf: "start",
  },

  usersList:{
    display:'flex',
    flexDirection :'column',
    gap :'10px',
    overflowY :'auto',
    maxHeight:'90%',
    paddingBottom :'200px',


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
    slug : 'shiftview',
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
      {
        firstName: "Kramer",
        id: 241,
        position: "crew",
      },
      {
        firstName: "Thomas",
        id: 241,
        position: "crew",
      },
      {
        firstName: "Cream",
        id: 241,
        position: "crew",
      },
      {
        firstName: "Ice",
        id: 241,
        position: "crew",
      },
      {
        firstName: "Sam",
        id: 241,
        position: "crew",
      },
      {
        firstName: "John",
        id: 241,
        position: "crew",
      },
      {
        firstName: "Tim",
        id: 241,
        position: "crew",
      },
    ],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { workblocks } = this.state;
    const { postReq} = this.props;
   /* days = days.filter((item) => item.checked);*/
    if (workblocks) {
      workblocks = workblocks.map((workblock) => {
        return {
          userId  : workblock.user.id, 
          startTime : valueToDt(workblock.startTime).toTimeString().slice(0,5), 
          endTime : valueToDt(workblock.endTime).toTimeString().slice(0,5),
        };
      });
      let req = postReq("/edit_schedule", {
        workblocks : workblocks,
      });
      this.setState({ snackbar: { open: true } });
    }
  };

  handleSlider = (e, new_value, id) => {
    let { workblocks } = this.state;
    let workblock = this.state.workblocks.find((wb) => wb.user.id === id);

    if (workblock) {
      const index = workblocks.indexOf(workblock);
      workblocks.splice(index, 1, workblock)
      /*
      workblocks.splice(index, 1);
      workblock.startTime = new_value[0];
      workblock.endTime = new_value[1];
      workblocks.push(workblock);*/
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

  submitUsers = (users) => {
    this.addUsers(users);
  };

  componentDidMount = ()=>{
    this.props.changeCurrentUrl(this.state.slug);
  }

  /*let main = document.getElementById("mainContent");
    main.style.filter = "blur(4px)";
    main.style.pointerEvents = 'none';
    let modal = document.getElementById("myModal");*/

  render() {
    const { classes, colorPalette, imgSrc , day} = this.props;

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
            <div className = {classes.usersList}>
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
            </div>
            <Button className={classes.btn} onClick={this.handleClick}>
              <img src={imgSrc + "/Add Users Icon.svg"} />
            </Button>
          </div>
          
          {this.state.addUsersOpen && (
            <AddUsersBlurred
              submitUsers = {this.submitUsers}
              imgSrc={imgSrc}
              users={this.state.users}
              closeBlurredDiv={this.handleClick}
            />
          )}
        </div>
      </motion.div>
    );
  }
}

export default withStyles(styles)(ShiftView);
