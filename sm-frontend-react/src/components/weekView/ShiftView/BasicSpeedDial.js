import React, {Component} from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { ReactComponent as AddWorkersIcon } from "../../../assets/images/Add Workers Icon.svg";
import { ReactComponent as SubmitIcon } from "../../../assets/images/Submit Icon.svg";
import { ReactComponent as ShiftStatsIcon2 } from "../../../assets/images/Shift Stats Icon Alt 2.svg";
import { ReactComponent as ActionsOpenIcon } from "../../../assets/images/Actions Open Icon.svg";
import { ReactComponent as ActionsIcon } from "../../../assets/images/Actions Icon.svg";
import { withStyles } from "@material-ui/core";


const styles = ()=> ({
  box:{
    position :'relative',
    height : 200,
    width  :300,
  },
  speedDial : {
    margin : 40,

  }
});


class BasicSpeedDial extends Component {

  state = {
    open : false,
  };

  handleHover =()=>{
    this.setState({open :true});
  }

  handleLeave =()=>{
    this.setState({open :false});
  }

  render() {
    const actions = [
      { name: "add", icon: <AddWorkersIcon /> },
      { name: "submit", icon: <SubmitIcon /> },
      { name: "submit", icon: <ShiftStatsIcon2 /> },
    ];
    const {classes} = this.props;
    return (
      <Box className = {classes.box}>
        <SpeedDial
        open = {this.state.open}
        onMouseEnter = {this.handleHover}
        onMouseLeave = {this.handleLeave}
        className = {classes.speedDial}
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={
          <SpeedDialIcon
            icon={<ActionsIcon />}
            openIcon={<ActionsOpenIcon sx={{ background: "red" }} />}
          />
        }
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
      </Box>
    );
  }
}

export default withStyles(styles)(BasicSpeedDial);
