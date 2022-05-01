import React, { Component } from 'react';
import {Paper, Button} from '@material-ui/core'
import scheduleIcon from "../../../assets/images/Schedule Icon Black.svg";
import { withStyles } from '@material-ui/styles';

const styles = () => ({

    paper:{
      width : 117,
      height :165,
      background : 'red'
    },
    root : {
      justifyItems : 'flex-start'
    }
    
  });

class ScheduleBtn extends Component {
    state = {  } 
    render() { 
        const {handleSelect, staffing, week, id, classes} = this.props;
        return (

        <button
      style={{
        height: 165,
        width: 117,
        background: "#738D9B",
        border : 'none',
        borderRadius: 7,
        textAlign: "center",
        boxShadow: "2px 10px 22px -6px rgba(0,0,0,0.37)",
        position: "relative",
      }}
    >
      <div
        style={{
          width: `${50}%`,
          height: "100%",
          background: "#33789E",
          position: "absolute",
          top : 0,
          borderRadius: "7px 0px 0px 7px",
        }}
      ></div>
      <div style={{ width: "100%", height: "100%", position: "absolute", top : 0 }}>
        <p
          style={{ fontSize: 16, margin: 0, marginTop: "18%", fontWeight: 700 }}
        >
          9/13
        </p>
        <img src = {scheduleIcon}/>
        <p style={{ fontSize: 8, marginTop: 5, marginBottom: 0 }}>
          9/17
        </p>
      </div>
          {/*
                  <div
                    style={{
                      width: `${(staffing.actual / staffing.projected) * 100}%`,
                      height: "100%",
                      background: "#F0F0F0",
                      position: "absolute",
                      borderRadius: "7px 0px 0px 7px",
                    }}
                  ></div>
                  
                  
                    {week[0].month}/{week[0].day}
                    <img alt = '' style={{ margin: "10px 0px" }} src={scheduleIcon} />
                    {week[6].month}/{week[6].day}
                    <p
                      style={{ fontSize: 9, textTransform: "none", margin: 0 }}
                    >
                      {Math.round((staffing.actual / staffing.projected) * 100)}
                      % Complete
                    </p>
                  */}
                  </button>
        );
    }
}
 
export default withStyles(styles)(ScheduleBtn);