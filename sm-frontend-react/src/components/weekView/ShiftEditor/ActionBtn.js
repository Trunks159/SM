import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  btn: {
    textTransform: "none",
    margin: 0,
    padding: 0,
    "&:hover": {
      filter: "brightness(120%)",
    },
  },
  label: { margin: 0, color: "white", fontSize: 8 },
  imgBackground: {
    width: 48,
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    margin: 5,
  },
});

const ActionBtn = ({ iconPath, label, color, imgStyle }) => {
  const classes = useStyles();
  return (
    <div className= {classes.main}>
      <Button className={classes.btn}>
        <div className={classes.imgBackground} style={{ background: color }}>
          <img style={imgStyle || null} src={iconPath} />
        </div>
      </Button>
      <p className={classes.label}>{label}</p>
    </div>
  );
};

export default ActionBtn;
