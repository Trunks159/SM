import React, { Component } from "react";
import scheduleIcon from "../../assets/images/Schedule Icon Black.svg";
import { Button, capitalize, Paper, withStyles } from "@material-ui/core";

const styles = () => ({
  label: {
    flexDirection: "column",
    color: "black",
    fontSize: 25,
  },
  button: {
    padding: 30,
    display: "flex",
  },
});

class Home extends Component {
  state = {
    schedules : [],
  };

  componentDidMount = ()=>{
    /*This would request for today but not yet */
    fetch(`/get_week_schedules/${9}-${13}-${2021}`)
    .then(response=> response.json())
    .then(schedules =>{
      console.log('The schedules: ', schedules);
      this.setState({schedules : schedules});
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div style = {{background : 'white', height : '100%', width : '100%'}}>
        <p style = {{fontSize : 31}}>To start, select schedule to <b>view</b> or <b>edit</b></p>
        <div style = {{display  :'flex', gap : 10,}}>
        {this.state.schedules.map((schedule)=>(
        <div style = {{display : 'flex', flexDirection : 'column', alignItems : 'center'}}>
            <p style = {{textTransform : 'capitalize',  fontSize : 15}}>{schedule.timeFrame}</p>
            <Paper
            style={{
              width: 145,
              height: 205,
              background: "#DADADA",
              position: "relative",
              borderRadius : '7px',
            }}
          >
            <Paper
              style={{

                width: "70%",
                height: "100%",
                background: "#F0F0F0",
                position: "absolute",
                borderRadius : '7px 0px 0px 7px',
              }}
            ></Paper>

            <Button  style = {{position : 'absolute', width : '100%', height : '100%', }} classes={{ label: classes.label, root: classes.button }}>
              {schedule.schedule[0].month}/{schedule.schedule[0].day}
              <img style={{margin : '10px 0px'}} src={scheduleIcon} />
              {schedule.schedule[6].month}/{schedule.schedule[6].day}
            </Button>
          </Paper>
         
          
        </div>
         ))}
         </div>
        <div></div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
