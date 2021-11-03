import React from "react";
import HealthBar from "./HealthBar";
import {
  Button,
  FormHelperText,
  LinearProgress,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({

  mainContainer:{
    display :'flex',
    alignItems:'center',
    padding:0,
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
    textTransform :'none',
  },

  box1: {
    position:'absolute',
    marginLeft :'auto',
    right:-5,
    top:3,
    width:40,
  },
  box2: {
    position:'absolute',
    marginRight :'auto',
    marginLeft :'auto',
    top:35,
    color: "white",
    fontSize: "45px",
    fontWeight:400,
    padding:0,
    marginTop:0,
    marginBottom:0,

  },
  box3: {
    position :'absolute',
    color: "white",
    fontSize: "30px",
    fontWeight:400,
    top:70,
    /*'@media (min-width:400px)':{
        fontSize : '10vw',
    },*/
  },
  box4: {
    position :'absolute',
    bottom :15,
    marginTop :'auto',
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

const DayBtn = ({ day, imgSrc, colorPalette, index, handleClick }) => {
  const { date, variant, weekday, shiftHealth, id } = day;
  const classes = useStyles();
  return (
    <div className = {classes.mainContainer}>
        <p style = {{color : indexColor(variant)}} className = {classes.index}>{index}</p>
      <Button
        className={classes.btn}
        style={{
          backgroundColor: getSpecificStuff(variant, colorPalette).color,
        }}
        onClick = {()=>handleClick(id)}
      >
          <img
            className={classes.box1}
            src={imgSrc + getSpecificStuff(variant, colorPalette).img}
          />
          <p className={classes.box2}>{day.weekday}</p>

          <p className={classes.box3}>{date}</p>
            {shiftHealth ? (
              <HealthBar 
              className  = {classes.box4}
              shiftHealth = {shiftHealth}/>
            ) : null}
      </Button>
    </div>
  );
};

export default DayBtn;
