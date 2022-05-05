import React, { Component } from "react";
import scheduleIconWhite from "../../../assets/images/Schedule Icon White.svg";
import openIconInactive from "../../../assets/images/Open Icon Not Active.svg";
import addIcon from "../../../assets/images/Regular Add Icon.svg";
import { Link, withRouter } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, TextField, withStyles } from "@material-ui/core";
import ScheduleBtn from "./ScheduleBtn";

const styles = () => ({
  header: {
    justifySelf: "center",
    fontSize: 17,
    "@media (min-width: 600px)": {
      justifySelf: "start",
    },
    "@media (min-width: 860px)": {
      fontSize: 27,
    },
  },
  schedules: {
    display: "flex",
    flexDirection: "column",
    background: "white",
    justifySelf: "center",
    alignItems: "center",
    borderRadius: 7,
    "@media (min-width: 600px)": {
      flexDirection: "row",
      flexWrap: "wrap",
      margin: 10,
      justifyContent: "space-evenly",
    },
    '@media (min-width : 860px)':{
      gridColumnStart : 1,
      gridColumnEnd : 3,
      alignSelf : 'start',
      justifySelf : 'start',
    }
  },
  schedule: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  main: {
    background: "#F0F0F0",
    display: "grid",
    gridTemplateRows: "min-content 1fr",
    alignItems: "center",
    flexGrow: 1,
    "@media (min-width : 860px)": {
      gridTemplateRows: "min-content 200px",
      gridTemplateColumns: "max-content 1fr",
    },
  },
  actions: {
    display: "flex",
    gridColumnStart : 2,
    gridColumnEnd : 3
  },
  search : {
    justifySelf : 'end'
  },

});

class Home extends Component {
  state = {
    isDesktop: false,
  };

  componentDidMount = () => {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updatePredicate);
  };

  updatePredicate = () => {
    this.setState({ isDesktop: window.innerWidth > 860 });
  };

  render() {
    const { classes, handleSelect, match, selected, schedules, marginLeft } =
      this.props;
    return (
      <div className={classes.main} style={{ marginLeft: marginLeft }}>
        <p className={classes.header}>
          To start, select schedule to <b>view</b> or <b>edit</b>
        </p>
        {this.state.isDesktop && (
          <div className= {classes.search}>
            <p>Looking for a schedule in particular?</p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Enter Date"
                value={"02/22/1998"}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            {/*
            <Button
              style={{
                background: "#DDDDDD",
                color: "white",
                borderRadius: "7px",
              }}
              classes={{ label: classes.label, root: classes.button }}
            >
              ?
              <img alt="" style={{ width: 72 }} src={scheduleIconWhite} />?
            </Button>*/}
          </div>
        )}
        <div className={classes.schedules}>
          <div className={classes.list}>
          {schedules.map(({ week, timeFrame, staffing, id }) => {
            const startDate = `${week[0].month}/${week[0].day}`;
            const endDate = `${week[6].month}/${week[6].day}`;
            const completion = Math.round(
              (staffing.actual / staffing.projected) * 100
            );
            return (
              <div key={id} className={classes.schedule}>
                <p
                  style={{
                    textTransform: "capitalize",
                    fontSize: 15,
                    margin: 0,
                  }}
                >
                  {timeFrame}
                </p>
                <ScheduleBtn
                  week={week}
                  startDate={startDate}
                  endDate={endDate}
                  completion={completion}
                  id={id}
                  handleSelect={handleSelect}
                />
              </div>
            );
          })}
          </div>
          
            {this.state.isDesktop && (
            <div className={classes.actions}>
              <Button
                style={{
                  marginLeft: "auto",
                  textTransform: "none",
                  color: "white",
                  background: "#606060",
                  padding: "10px 20px",
                }}
                startIcon={<img alt="" style={{ width: 20 }} src={addIcon} />}
              >
                Add A Schedule
              </Button>
              <Link
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: selected ? "#1897E6" : "#CBCBCB",
                  pointerEvents: selected ? "auto" : "none",
                }}
                to={selected ? `${match.path}/${selected.id}` : "/"}
              >
                <img
                  alt=""
                  style={{
                    filter: selected
                      ? "invert(48%) sepia(80%) saturate(1387%) hue-rotate(174deg) brightness(92%) contrast(94%)"
                      : "none",
                  }}
                  src={openIconInactive}
                />
                Open{" "}
                {selected
                  ? `${selected.week[0].month}/${selected.week[0].day} - ${selected.week[6].month}/${selected.week[6].day}`
                  : null}
              </Link>
            </div>
          )}
        </div>
      
        {/*
        <div style={{}}>
          


          <div style={{ display: "flex", padding: 25, gap: 15 }}>
            <Button
              style={{
                marginLeft: "auto",
                textTransform: "none",
                color: "white",
                background: "#606060",
                padding: "10px 20px",
              }}
              startIcon={<img alt="" style={{ width: 20 }} src={addIcon} />}
            >
              Add A Schedule
            </Button>
            <Link
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: selected ? "#1897E6" : "#CBCBCB",
                pointerEvents: selected ? "auto" : "none",
              }}
              to={selected ? `${match.path}/${selected.id}` : "/"}
            >
              <img
                alt=""
                style={{
                  filter: selected
                    ? "invert(48%) sepia(80%) saturate(1387%) hue-rotate(174deg) brightness(92%) contrast(94%)"
                    : "none",
                }}
                src={openIconInactive}
              />
              Open{" "}
              {selected
                ? `${selected.week[0].month}/${selected.week[0].day} - ${selected.week[6].month}/${selected.week[6].day}`
                : null}
            </Link>
          </div>
        </div>

        <div>
          <p>Looking for a schedule in particular?</p>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Enter Date"
              value={"02/22/1998"}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button
            style={{
              background: "#DDDDDD",
              color: "white",
              borderRadius: "7px",
            }}
            classes={{ label: classes.label, root: classes.button }}
          >
            ?
            <img alt="" style={{ width: 72 }} src={scheduleIconWhite} />?
          </Button>
        </div>
          */}
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(Home));
