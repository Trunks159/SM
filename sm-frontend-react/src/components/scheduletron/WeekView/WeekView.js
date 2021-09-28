import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import DayBtn from "./DayBtn";
import { motion } from "framer-motion";


const styles = () => ({
  main: {
    width: "100%",
    height:'100%',
    margin :0,
    overflowY:'auto',
    overflowX:'hidden',
    overflow:'overlay',
    },
  head: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position:'relative',
    height:'85px',
  },
  headText: {
    width: "100%",
    display : 'flex',
    alignItems:'center',
    justifyContent:'center',
    fontSize : '29px',
  },
  mainContent: {
    minHeight: "100%",
    display:'flex',
    justifyContent:'center',
    
  },
  array:{
      marginTop:'30px',
    height: "100%",
    display: "flex",
    gap: "40px",
    flexDirection: "column",
    alignItems: "center",
  },
  forward: {
    height: "100px",
    marginLeft: "auto",
    display:"block",
    padding:0,
    marginRight:0,
    position:'absolute',
    right:-5,
    top:0,

  },
  dot:{
      width: '7px',
      margin: '10px',
  }
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


class WeekView extends Component {
  state = {};
  dot = (imgSrc) => (
    <img className={this.props.classes.dot} src={this.props.imgSrc + "/Dot.svg"} />
  );
  render() {
    const week = [
      {
        date: "9/13",
        variant: "warning",
        shiftHealth: [6, 10],
        weekday: "Monday",
        id: 1,
      },
      {
        date: "9/14",
        variant: "complete",
        shiftHealth: [10, 10],
        weekday: "Tuesday",
        id: 2,
      },
    ];
    const { classes, imgSrc, colorPalette } = this.props;
    return (
      <motion.div
          initial="out"
          animate="in"
          exit="out"
          variants={pageVariant2}
          transition={pageTransition}
          className = {classes.main}
        >
        <div className={classes.head}>
            <p className={classes.headText} >
              9/13 {this.dot(imgSrc)} {this.dot(imgSrc)} {this.dot(imgSrc)} 9/19
            </p>
          <Button className={classes.forward}>
            <img
              className={classes.forward}
              src={imgSrc + "/Forward Icon.svg"}
            />
          </Button>
        </div>
        <div
          className={classes.mainContent}
          style={{ background: colorPalette.secondaryLight }}
        >
            <div className = {classes.array}>
          {week.map((day, index) => (
            <DayBtn
              key={day.id}
              day={day}
              imgSrc={imgSrc}
              colorPalette={colorPalette}
                index = {index+1}
            />
          ))}
          </div>
        </div>
      </motion.div>
    );
  }
}

export default withStyles(styles)(WeekView);
