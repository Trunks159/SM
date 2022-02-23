import React from "react";
import { Button, Divider, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ReactComponent as BackIcon } from "../../../assets/images/Back Icon.svg";

const useStyles = makeStyles({
  main: {
    background: "#F0F0F0",
    border: "1px solid #54F2D1",
    borderRadius: 7,
    margin: 10,
    height: 100,
    position: "relative",
  },
  link: {
    fontSize: 8,
    textTransform : 'none',
    color: "#00BCFF",
    marginTop: 8,
    marginLeft: 8,
    display: "flex",
    alignItems: "center",
    "& p": {
      marginLeft: 9,
      marginBottom: 0,
      marginTop: 0,
    },
  },
  linkImg: {
    margin: 0,
  },
  date: {
    fontSize: 25,
    margin: 0,
  },
  projectedSales: {
    fontSize: 8,
  },
  weekday: {
    fontSize: 26,
  },
  textDivOuter: {
    position: "absolute",
    bottom: 5,
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    height: "70%",
    justifyContent: "center",
    gap: "10px",
    alignItems: "center",
    margin: 0,
    padding: 0,
  },
  textDivInner: {
    display: "flex",
    flexDirection: "column",
  },
  shiftViewIcon:{
    marginLeft :0,
  },
});

const Header = ({ date, projectedSales, weekday, weekSchedule, shiftView }) => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      {shiftView ? (
        <Link className={classes.link} to = '/'>
          <BackIcon className={classes.linkImg} />
          <p>{weekSchedule}</p>
        </Link>
      ) : (
        <Button className = {classes.link}>
          <BackIcon className={classes.linkImg} />
          <p>Schedule {date}</p>
        </Button>
      )}

      <div className={classes.textDivOuter}>
        <div className={classes.textDivInner}>
          <p className={classes.date}>{date}</p>
          <p className={classes.projectedSales}>
            Projected Sales {projectedSales}
          </p>
        </div>

        <p className={classes.weekday}>{weekday}</p>
      </div>
    </div>
  );
};

export default Header;
