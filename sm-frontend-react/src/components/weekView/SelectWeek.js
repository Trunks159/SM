import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { ReactComponent as SearchIcon } from "../../assets/images/Search Icon.svg";
import MobileDatePicker from '@mui/lab/MobileDatePicker';

const styles = () => ({
  main: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    background: "#F0F0F0",
    border: "3px solid #D8F4EE",
    borderRadius: 7,
    height: 207,
    minWidth: 10,
    maxWidth: 600,
    width: "90%",
    marginTop: 17,
  },
  header: {
    fontSize : 16,
  },
  searchBtn: {
    position: "absolute",
    top: 0,
    right: -8,
  },
  btnList: {
    display: "flex",
    overflowX: "auto",
    gap: "28px",
    minWidth: 10,
    width: "90%",
    marginLeft: "auto",
    justifyContent: "center",
    position: "absolute",
    marginTop: 48,
    paddingBottom :15,
  },
  scheduleBtn: {
    display: "inline-block",
    color: "white",
    textTransform: "none",
    overflowX: "auto",
    minWidth: 118,
    minHeight: 118,
    "& p": {
      margin: 0,
      padding: 0,
      fontSize: 47,
      fontWeight: 400,
    },
    borderRadius:7,
  },
  selectedWeekHeader:{
    display :'flex',
    alignItems :'center',
    alignSelf :'flex-start',
    marginLeft : '5%',
    marginTop :10,
    gap :'10px',
    '& p':{
      margin :0,
      padding:0,
    }
  }
});

class SelectWeek extends Component {
  state = {
    search: false,
    openScheduleId: 2,
  };
  handleSearch() {
    this.setState({ search: !this.state.search });
  }

  openScheduleIndex = (scheduleSet) => {
    let index = 0;
    for (
      index = 0;
      scheduleSet[index].id !== this.state.openScheduleId;
      index++
    ) {}
    return index;
  };

  componentDidMount() {
    const el = document.getElementById("btnlist");
    const el2 = document.getElementById("test2");
    const elleft = el.offsetLeft;
    const el2left = el2.offsetLeft;
    el.scrollLeft = el2left - elleft - el.offsetLeft / 2;
  }

  returnedSched = (scheduleSet) => {
    const s = scheduleSet.find(({ id }) => id === this.state.openScheduleId);
    console.log("S: ", s.month + "/" + s.day);
    return (
      <p style={{ color: '#328F83', fontSize: 20, fontWeight :400 }}>{s.month + "/" + s.day}</p>
    );
  };

  render() {
    const { classes } = this.props;
    const scheduleSet = [
      { month: 9, day: 6, id: 1 },
      { month: 9, day: 20, id: 3 },
      { month: 9, day: 6, id: 1 },
      { month: 9, day: 13, id: 2 },
      { month: 9, day: 6, id: 1 },
      { month: 9, day: 6, id: 1 },
    ];
    const index = this.openScheduleIndex(scheduleSet);
    return (
      this.state.search ? (<div></div>):
      (<div className={classes.main}>
        <div className = {classes.selectedWeekHeader}>
          <p className={classes.header}>Selected Week -</p>
          {this.returnedSched(scheduleSet)}
        </div>

        <Button className={classes.searchBtn} onClick={this.handleSearchBtn}>
          <SearchIcon />
        </Button>


        <div className={classes.btnList} id="btnlist">
          {scheduleSet.map((schedule, i) => {
            let color =
              i < index ? "#979797" : i === index ? "#328F83" : "#D8F4EE";
            return (
              <Button
                className={classes.scheduleBtn}
                key={schedule.day}
                style={{ background: color }}
                id={i === index ? "test2" : "bob"}
              >
                <p>{schedule.month + "/" + schedule.day}</p>
              </Button>
            );
          })}
        </div>
        
      </div>)

      
    );
  }
}

export default withStyles(styles)(SelectWeek);
