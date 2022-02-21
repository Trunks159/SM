import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { NavLink } from "react-router-dom";

const styles = () => ({
  activeIcon : {
      filter: 'invert(46%) sepia(61%) saturate(390%) hue-rotate(123deg) brightness(91%) contrast(91%)' ,                    
  },
  regIcon : {
    textDecoration : 'none',
    display : 'flex',
    flexDirection : 'column',
    alignItems : 'center',
    '& p':{
        fontSize : 12,
        color : 'grey',
        margin :3,
    },
     },
});

class IconLink extends Component {

  render() {
    const { classes, img, label } = this.props;
    return (
      <NavLink
        exact to = {'/scheduletron'}
        activeClassName = {classes.activeIcon}
        className = {classes.regIcon}
      >
          <p>{label}</p>
          {img}
      </NavLink>
    );
  }
}

export default withStyles(styles)(IconLink);
