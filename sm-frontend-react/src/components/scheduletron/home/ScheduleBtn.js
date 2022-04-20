import React, { Component } from 'react';
import {Paper, Button} from '@material-ui/core'
import scheduleIcon from "../../../assets/images/Schedule Icon Black.svg";
import { withStyles } from '@material-ui/styles';

const styles = () => ({
    label: {
      flexDirection: "column",
      fontSize: 25,
    },
    button: {
      padding: 30,
      display: "flex",
    },
  });

class ScheduleBtn extends Component {
    state = {  } 
    render() { 
        const {handleSelect, staffing, week, id, classes} = this.props;
        return (
            <Paper
                  style={{
                    width: 145,
                    height: 205,
                    background: "#DADADA",
                    position: "relative",
                    borderRadius: "7px",
                  }}
                >
                  <div
                    style={{
                      width: `${(staffing.actual / staffing.projected) * 100}%`,
                      height: "100%",
                      background: "#F0F0F0",
                      position: "absolute",
                      borderRadius: "7px 0px 0px 7px",
                    }}
                  ></div>

                  <Button
                    onClick={() => handleSelect({ week: week, id: id })}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                    }}
                    classes={{ label: classes.label, root: classes.button }}
                  >
                    {week[0].month}/{week[0].day}
                    <img style={{ margin: "10px 0px" }} src={scheduleIcon} />
                    {week[6].month}/{week[6].day}
                    <p
                      style={{ fontSize: 9, textTransform: "none", margin: 0 }}
                    >
                      {Math.round((staffing.actual / staffing.projected) * 100)}
                      % Complete
                    </p>
                  </Button>
                </Paper>
        );
    }
}
 
export default withStyles(styles)(ScheduleBtn);