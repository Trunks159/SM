import React from "react";
import HealthBar from "./HealthBar";
import {
  makeStyles,
} from "@material-ui/core";
import { ReactComponent as WarningIcon } from "../../assets/images/Warning Icon.svg";
import { ReactComponent as CompleteIcon } from "../../assets/images/Complete Icon.svg";
import { ReactComponent as UntouchedIcon } from "../../assets/images/Untouched Icon.svg";
import { Link } from "react-router-dom";

const useStyles = makeStyles({

  mainContainer:{
    display :'flex',
    alignItems:'center',
    padding:0,
    margin:0, 
 },
  index:{
    fontSize: 114,
    padding: 0,
    margin :0,
  },
  link: {
    minHeight: 153,
    minWidth: 166,
    height : 153,
    width : 166,
    padding: 0,
    position: "relative",
    borderRadius: "10px",
    boxShadow: "5px 5px 16px 5px rgba(0,0,0,0.12)",
    textTransform :'none',
  },

  box1: {
    position:'absolute',
    right : 2,
    top : 2,
    padding : 0,
  },
  box2: {
    position:'absolute',
    marginRight :'auto',
    marginLeft :'auto',
    top:'15%',
    color: "white",
    fontSize: "19px",
    fontWeight:400,
    padding:0,
    marginTop:0,
    marginBottom:0,
    left : 47,

  },
  box3: {
    position :'absolute',
    color: "rgba(255,255,255,1)",
    fontSize: 63,
    fontWeight:400,
    bottom : -33,
    left : 22,
    /*'@media (min-width:400px)':{
        fontSize : '10vw',
    },*/
  },
  box4: {
    position :'absolute',
    marginLeft : 'auto',
    marginRight : 'auto',
    left : 0,
    right :0,
    width :81,
    bottom : 14,
  },
});

const getSpecificStuff = (variant, colorPalette, classes) => {
  const variantDict = {
    warning: { img: <WarningIcon className = {classes.box1}/>, color: colorPalette.red },
    complete: { img: <CompleteIcon className = {classes.box1}/>, color: colorPalette.primary },
    untouched: { img: <UntouchedIcon className = {classes.box1}/>, color: colorPalette.grey },
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

const DayBtn = ({ health, date, name, colorPalette, index, url}) => {
  const {day, month, year} = date;
  const variant = health  ? (health[0]/health[1] >= .7 ? 'complete' : 'warning' ):'untouched';
  const classes = useStyles();
  const {img, color} = getSpecificStuff(variant, colorPalette, classes );
  return (
    <div className = {classes.mainContainer}>
        <p style = {{color : indexColor(variant)}} className = {classes.index}>{index}</p>
      <Link
        className={classes.link}
        style={{
          backgroundColor: color,
        }}
        to = {`${url}/day/${month}-${day}-${year}`}
      >
          {img}
          <p className={classes.box2}>{name}</p>

          <p className={classes.box3}>{`${month}/${day}`}</p>
            {health ? (
              <HealthBar 
              className  = {classes.box4}
              shiftHealth = {health}/>
            ) : null}
      </Link>
    </div>
  );
};

export default DayBtn;
