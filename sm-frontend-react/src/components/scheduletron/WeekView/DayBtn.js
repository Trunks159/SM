import React from "react";
import {
  Button,
  FormHelperText,
  LinearProgress,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  progressBar: {
    width: "100%",
    height: 10,
    borderRadius: 5,
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#FFFFFF",
    },
    "& .MuiLinearProgress-colorSecondary": {
      backgroundColor: "#FFFFFF",
    },
    "& .MuiLinearProgress-bar": {
      borderRadius: 5,
    },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#5EFF00",
    },
    "& .MuiLinearProgress-barColorSecondary": {
      backgroundColor: "#FFFF00",
    },
  },
  mainContainer:{
    display :'flex',
    alignItems:'center',
    padding:'0',
    margin:0, 
    height:'200px',
 },
  index:{
    fontSize: 114,
    
  },
  btn: {
    height: '100%',
    width: "200px",
    padding: 0,
    position: "relative",
    borderRadius: "10px",
    boxShadow: "5px 5px 16px 5px rgba(0,0,0,0.12)",
  },
  flex: {
    textTransform: "none",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    margin: 0,
    position: "absolute",
  },

  box1: {
    marginLeft: "auto",
    flex: 1,
  },
  box2: {
    color: "white",
    margin: 0,
    flex: 1,
    fontSize: "19px",
  },
  box3: {
    color: "white",
    margin: 0,
    flex: 1,
    fontSize: "63px",
    /*'@media (min-width:400px)':{
        fontSize : '10vw',
    },*/
  },
  box4: {
    flex: 2,
    paddingLeft: "45px",
    paddingRight: "45px",
  },
});

const getSpecificStuff = (variant, colorPalette) => {
  const variantDict = {
    warning: { img: "/Warning Icon.svg", color: colorPalette.red },
    complete: { img: "/Complete Icon.svg", color: colorPalette.primary },
    untouched: { img: "/Untouched Icon.svg", color: colorPalette.grey },
  };
  return variantDict[variant];
};

const indexColor = (variant)=>{
    if(variant === 'complete'){
        return '#328F83'
    }else if(variant === 'warning'){
        return  'rgba(.56, .2, .2,.22)'
    }else if(variant === 'untouched'){
        return 'rgba(.58, .58, .58,.22)'
    }
}

const DayBtn = ({ day, imgSrc, colorPalette, index }) => {
  const { date, variant, weekday, shiftHealth } = day;
  const classes = useStyles();
  return (
    <div className = {classes.mainContainer}>
        <p style = {{color : indexColor(variant)}} className = {classes.index}>{index}</p>
      <Button
        className={classes.btn}
        style={{
          backgroundColor: getSpecificStuff(variant, colorPalette).color,
        }}
      >
        <div className={classes.flex}>
          <img
            className={classes.box1}
            src={imgSrc + getSpecificStuff(variant, colorPalette).img}
          />
          <p className={classes.box2}>{day.weekday}</p>

          <p className={classes.box3}>{date}</p>
          <div className={classes.box4}>
            {shiftHealth ? (
              <LinearProgress
                className={classes.progressBar}
                color={
                  shiftHealth[0] / shiftHealth[1] >= 0.7
                    ? "primary"
                    : "secondary"
                }
                variant="buffer"
                value={(shiftHealth[0] / shiftHealth[1]) * 100}
              />
            ) : null}
          </div>
        </div>
      </Button>
    </div>
  );
};

export default DayBtn;
