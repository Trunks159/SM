import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { mergeClasses } from "@material-ui/styles";
import IconBtn from "./IconBtn";

const styles = () => ({
  nav: {
    textDecoration: "none",
    textTransform: null,
    display: "flex",
    flexDirection: "column",
    width: "110px",
    alignItems: "center",
    gap:'20px',
    paddingTop:'10px',
    height:'100%',
    
  },
  p :{
    fontSize : '12px',
    margin : '1px',

  },
  btnDiv:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
  },
  
});

class Nav extends Component {
  state = {
    btns: [
      {
        id: "weekView",
        reg: {
          img: this.props.imgSrc + "/Week View Icon.svg",
          color: this.props.colorPalette.grey,
        },
        active: {
          img: this.props.imgSrc + "/Week View Icon Active.svg",
          color: this.props.colorPalette.primary,
        },
      },
      {
        id: "shiftView",
        reg: {
          img: this.props.imgSrc + "/Shift View Icon.svg",
          color: this.props.colorPalette.grey,
        },
        active: {
          img: this.props.imgSrc + "/Shift View Icon Active.svg",
          color: this.props.colorPalette.primary,
        },
      },
      {
        id: "shiftStats",
        reg: {
          img: this.props.imgSrc + "/Shift Stats Icon.svg",
          color: this.props.colorPalette.grey,
        },
        active: {
          img: this.props.imgSrc + "/Shift Stats Icon Active.svg",
          color: this.props.colorPalette.primary,
        },
      },
    ],
  };

  searchBtn = (id) => this.state.btns.find((btn) => btn.id === id);



  render() {
    const { colorPalette, classes, activePage, changeActivePage } = this.props;
    const weekView = this.searchBtn("weekView");
    const shiftView = this.searchBtn("shiftView");
    const shiftStats = this.searchBtn("shiftStats");
    return (
      <nav className={classes.nav}>
        <Button>
          <img src={this.props.imgSrc + '/ScheduleTron Icon.svg'} alt="ScheduleTron" />
        </Button>
        <IconBtn
          baseObj={weekView}
          label="Week View"
          changeActivePage={changeActivePage}
          activePage={activePage}
          classes={classes}
        />
        <IconBtn
          baseObj={shiftView}
          label="Shift View"
          changeActivePage={changeActivePage}
          activePage={activePage}
          classes={classes}
        />
        <IconBtn
          baseObj={shiftStats}
          label="Shift Stats"
          changeActivePage={changeActivePage}
          activePage={activePage}
          classes={classes}
        />
        <Divider style = {{width : '80%'}}/>
        <div className = {classes.btnDiv}>
          <p style={{ color: colorPalette.blue }} className={classes.p}>
            Add
          </p>
          <Button>
            <img src={this.props.imgSrc + "/SCTR Add Icon.svg"} />
          </Button>
        </div>
        <div className = {classes.btnDiv}>
          <p className={classes.p} style={{ color: colorPalette.orange }}>
            Submit
          </p>
          <Button>
            <img src={this.props.imgSrc + "/SCTR Submit Icon.svg"} />
          </Button>
        </div>
      </nav>
    );
  }
}

export default withStyles(styles)(Nav);
