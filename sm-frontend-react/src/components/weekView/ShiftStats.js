import { Divider } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core";
import HealthBar from "./HealthBar";
import { m } from "framer-motion";

const useStyles = makeStyles({
  nightShiftDiv: {
    "& p": {
      color: "white",
    },
  },
  main: {
    width: "100%",
    height: "100%",
    margin: 0,
    overflowY: "auto",
    overflowX: "hidden",
    overflow: "overlay",
  },
  head: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: "85px",
  },
  mainContent: {
    minHeight: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    gap: "9px",
  },
  morningShiftDiv: {
    color :'black',
    background: "#D8F4EE",
    borderRadius: "7px 0px 0px 7px",
    flex: 1,
  },
  nightShiftDiv: {
    color :'white',
    background: "#328F83",
    borderRadius: "7px 0px 0px 0px",
    flex: 1,
  },
  shiftTime: {
    width: 100,
    height: 100,
    margin: 20,
    alignSelf: "center",
  },
  topDiv: {
    display: "flex",
    alignContent: "center",
    height: "25%",
    "& div": {
      width: "90%",
      display: "flex",
      flexDirection: "column",
      "& p": {
        marginTop: 32,
      },
    },
  },
  divider: {
    width: "95%",
    height :1.5,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: '10px',
  },
  managerDiv: {
    paddingRight :10,
    paddingLeft :10,
    borderRadius:  '7px',
    top :10,
    left : 10,
    width :'45%',
    position :'absolute',
    '& p':{
      textAlign : 'center',
      fontSize :20,
      padding:0,
    },
    '& img':{
      width :80,
      display :'block',
      marginLeft : 'auto',
      marginRight : 'auto',
    },
  },
  infoDiv: {
    position : 'absolute',
    right : '7px',
    top  :'10px',
    height : 100,
    width : 110,
    padding : '10px',
    display: "grid",
    gridTemplateColumns: '1fr 1fr',
    justifyContent :'space-between',
    borderRadius  :'7px',
    "& p": {
      textAlign :'center',
      fontSize: 10,
    },
  },
  bottomDiv: {
    position :'relative',
  },
});

const shiftDiv = (shift, imgSrc, classes) => {
  return(
  <div
    className={
      shift.shift === "morning"
        ? classes.morningShiftDiv
        : classes.nightShiftDiv
    }
  >
    <div className={classes.topDiv}>
      <img
        className={classes.shiftTime}
        src={
          imgSrc +
          (shift.shift === "morning" ? "/Morning Icon.svg" : "/Night Icon.svg")
        }
      />
      <div>
        <p>
          {shift.shift.charAt(0).toUpperCase() + shift.shift.slice(1)} Shift
        </p>
        <HealthBar shiftHealth={shift.staffing} />{" "}
      </div>
    </div>

    <Divider
      className={classes.divider}
      style={{ backgroundColor: shift.shift === "morning" ? "black" : "white" }}
    />
    <div className={classes.bottomDiv}>
      <div className={classes.managerDiv} style = {{border : (shift.shift === 'night' ? '1.5px solid white' :'1.5px solid black')}}>
        <p>Manager</p>
        <img
          src={
            imgSrc +
            (shift.shift === "night"
              ? "/White Profile Icon.svg"
              : "/Black Profile Icon.svg")
          }
        />
        <p>{shift.manager.firstName} {shift.manager.lastName}</p>
      </div>
      <div className={classes.infoDiv} style = {{border : (shift.shift === 'night' ? '1.5px solid white' :'1.5px solid black')}}>
        <p>Sales</p>
        <p>{"$" + shift.sales}</p>
        <p>Staffing</p>
        <p>{shift.staffing[0] + "/" + shift.staffing[1]}</p>
        <p>Hours</p>
        <p>{shift.hours[0] + "/" + shift.hours[1]}</p>
      </div>
    </div>
  </div>
);
        }

const ShiftStats = ({ imgSrc, morningShift, nightShift }) => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <div className={classes.head}>Head</div>
      <div className={classes.mainContent}>
        {shiftDiv(morningShift, imgSrc, classes)}
        {shiftDiv(nightShift, imgSrc, classes)}
      </div>
    </div>
  );
};

export default ShiftStats;
