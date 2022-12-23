import moment from "moment";

//PURE FUNCTIONS------------------------------------------//
const timeToPix = (time, length, availableTimes) => {
  console.log("Timetopix: ", time, availableTimes);
  const timerange = availableTimes.map((t) => moment(t));
  //Get from moment to a percentage, then multiply that by the lentgh
  time = moment(time);
  const overflowLeft = time.diff(timerange[0], "hours", true) < 0;
  const overflowRight = time.diff(timerange[1], "hours", true) > 0;

  if (overflowLeft) {
    return 0;
  } else if (overflowRight) {
    return length;
  } else {
    const perc =
      time.diff(timerange[0], "hours", true) /
      timerange[1].diff(timerange[0], "hours", true);
    console.log("overflow: ", perc * length);
    return perc * length;
  }
};

const pixToTime = (pix, length, timerange) => {
  console.log("APPLES: ", pix, length, timerange);
  timerange = timerange.map((t) => moment(t));
  return timerange[0]
    .add(
      (pix / length) * timerange[1].diff(timerange[0], "hours", true),
      "hours"
    )
    .format();
};

const convertTimeslots = (timeslots, oldLength, newLength, timerange) => {
  return timeslots.map((ts) => {
    const start = pixToTime(ts.start, oldLength, timerange);
    const end = pixToTime(ts.end, oldLength, timerange);
    return {
      ...ts,
      start: timeToPix(start, newLength, timerange),
      end: timeToPix(end, newLength, timerange),
    };
  });
};

function convertTimeslot(id, timeslots, trackLength, timerange) {
  const timeslot = timeslots.find((ts) => ts.id === id);
  return (
    timeslot && {
      startTime: pixToTime(timeslot.start, trackLength, timerange),
      endTime: pixToTime(timeslot.end, trackLength, timerange),
    }
  );
}
//---------------------------------------------------------------------------------------

const currentScheduleReducer = (
  state = {
    dayId: null,
    scheduled: [],
    notScheduled: [],
    timerange: [],
    timeslots: [],
    trackLength: 0,
    convertTimeslot: function (
      id,
      timeslots = this.timeslots,
      trackLength = this.trackLength,
      timerange = this.timerange
    ) {
      //get timeslot with time in datetime units
      return convertTimeslot(id, timeslots, trackLength, timerange);
    },
  },
  action
) => {
  let { timeslots, trackLength, timerange } = state;
  switch (action.type) {
    case "INITIALIZE_SCHEDULE":
      return {
        ...state,
        scheduled: action.payLoad.scheduled,
        notScheduled: action.payLoad.notScheduled,
        timerange: action.payLoad.timerange,
      };
    case "INITIALIZE_TIMESLOTS":
      return {
        ...state,
        trackLength: action.payLoad.trackLength,
        timeslots: action.payLoad.scheduled.map(
          ({ startTime, endTime, user }) => ({
            start: timeToPix(
              startTime,
              action.payLoad.trackLength,
              state.timerange
            ),
            end: timeToPix(
              endTime,
              action.payLoad.trackLength,
              state.timerange
            ),
            user,
            //these 2 need testing, they prob dont work yet
          })
        ),
      };

    case "ADD_TIMESLOT":
      const { startTime, endTime, user } = action.payLoad;
      return {
        ...state,
        timeslots: [
          ...state.timeslots,
          //convert the times to pixels and add to array
          {
            start: timeToPix(startTime, trackLength, timerange),
            end: timeToPix(endTime, trackLength, timerange),
            user: user,
            getStartTime: function () {
              return pixToTime(this.start, trackLength, timerange);
            },
            getEndTime: function () {
              return pixToTime(this.end, trackLength, timerange);
            },
          },
        ],
      };

    case "UPDATE_TIME":
      const { index, newVal, timeframe } = action.payLoad;
      timeslots[index][timeframe] = newVal;
      return { ...state, timeslots };

    case "UPDATE_TIMERANGE":
      return {
        ...state,
        timerange: action.payLoad,
      };
    case "DUMP_TIMESLOTS":
      return {
        ...state,
        timeslots: [],
      };
    case "UPDATE_TRACK_LENGTH":
      //whenever container length changes the timeslot needs to be recreated with the new trackLength in mind
      return {
        ...state,
        trackLength: action.payLoad.newLength,
        //if there are already timeslots, replace with updated timeslots
        timeslots:
          state.timeslots ||
          convertTimeslots(timeslots, action.payLoad.newLength, timerange),
      };
    case "UPDATE_DAY_ID":
      return {
        ...state,
        dayId: action.payLoad,
      };
    case "ADD_TO_SCHEDULED":
      const x = ({ theDate, dayId, user }, state) => {
        return {
          ...state,
          user,
          startTime: moment(theDate).set("hour", 8),
          endTime: moment(theDate).set("hour", 16),
          userId: user.id,
          dayId,
        };
      };
      return x(action.payLoad, state);

    default:
      return state;
  }
};

export default currentScheduleReducer;
