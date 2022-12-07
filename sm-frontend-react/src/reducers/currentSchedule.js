import moment from "moment";

const timeToPix = (time, length, availableTimes) => {
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
    return perc * length;
  }
};

const pixToTime = (pix, length, timerange) => {
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

const currentScheduleReducer = (
  state = {
    timeslots: [],
    timerange: [],
    trackLength: 0,
    dayId: null,
    scheduled: [],
    notScheduled: [],
  },
  action
) => {
  let { timeslots, trackLength, timerange } = state;
  switch (action.type) {
    case "INITIALIZE_SCHEDULE":
      const { scheduled, newLength, newTimeRange, newDayId } = payLoad;
      const newSlots = scheduled.map(({ user, startTime, endTime }) => ({
        start: timeToPix(startTime, newLength, timerange),
        end: timeToPix(endTime, newLength, timerange),
        user,
        getStartTime: function (
          trackLength = trackLength,
          timerange = timerange
        ) {
          return pixToTime(this.start, trackLength, timerange);
        },
        getEndTime: function (
          trackLength = trackLength,
          timerange = timerange
        ) {
          return pixToTime(this.end, trackLength, timerange);
        },
      }));
      return {
        dayId: newDayId,
        timerange: newTimeRange,
        trackLength: newLength,
        timeslots: newSlots,
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
          state.timeslots || convertTimeslots(timeslots, newLength, timerange),
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

    case "UPDATE_SCHEDULED":
      return {
        ...state,
        scheduled: action.payLoad,
      };

    default:
      return state;
  }
};

export default currentScheduleReducer;
