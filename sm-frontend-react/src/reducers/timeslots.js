import moment from "moment";

const timeToPix = (time, width, availableTimes) => {
  const timerange = availableTimes.map((t) => moment(t));
  //Get from moment to a percentage, then multiply that by the width
  time = moment(time);
  const overflowLeft = time.diff(timerange[0], "hours", true) < 0;
  const overflowRight = time.diff(timerange[1], "hours", true) > 0;
  if (overflowLeft) {
    return 0;
  } else if (overflowRight) {
    return width;
  } else {
    const perc =
      time.diff(timerange[0], "hours", true) /
      timerange[1].diff(timerange[0], "hours", true);
    return perc * width;
  }
};

const pixToTime = (pix, width, timerange) => {
  timerange = timerange.map((t) => moment(t));
  return timerange[0]
    .add(
      (pix / width) * timerange[1].diff(timerange[0], "hours", true),
      "hours"
    )
    .format();
};

const convertTimeslots = (timeslots, oldWidth, newWidth, timerange) => {
  return timeslots.map((ts) => {
    const start = pixToTime(ts.start, oldWidth, timerange);
    const end = pixToTime(ts.end, oldWidth, timerange);
    return {
      ...ts,
      start: timeToPix(start, newWidth, timerange),
      end: timeToPix(end, newWidth, timerange),
    };
  });
};

const timeslotsReducer = (
  state = {
    slots: [],
    timerange: [],
    trackWidth: 0,
    dayId: null,
  },
  action
) => {
  let { slots, trackWidth, timerange } = state;
  switch (action.type) {
    case "ADD_TIMESLOT":
      const { startTime, endTime, user } = action.payLoad;
      return {
        ...state,
        slots: [
          ...state.slots,
          //convert the times to pixels and add to array
          {
            start: timeToPix(startTime, trackWidth, timerange),
            end: timeToPix(endTime, trackWidth, timerange),
            user: user,
            getStartTime: function () {
              return pixToTime(this.start, trackWidth, timerange);
            },
            getEndTime: function () {
              return pixToTime(this.end, trackWidth, timerange);
            },
          },
        ],
      };

    case "UPDATE_TIME":
      const { index, newVal, timeframe } = action.payLoad;
      slots[index][timeframe] = newVal;
      return { ...state, slots };

    case "UPDATE_TIMERANGE":
      return {
        ...state,
        timerange: action.payLoad,
      };
    case "DUMP_TIMESLOTS":
      return {
        ...state,
        slots: [],
      };
    case "UPDATE_TRACK_WIDTH":
      //whenever container width changes the timeslot changes
      const newWidth = action.payLoad;
      return {
        ...state,
        trackWidth: newWidth,
        //if there are already timeslots, replace with updated timeslots
        slots: state.slots || convertTimeslots(slots, newWidth, timerange),
      };

    default:
      return state;
  }
};

export default timeslotsReducer;
