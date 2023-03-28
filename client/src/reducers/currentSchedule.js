import moment from "moment";
import dayjs from "dayjs";

//PURE FUNCTIONS------------------------------------------//
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

function areSame(oldTimeRange, newTimeRange) {
  if (newTimeRange.length === oldTimeRange.length) {
    return (
      dayjs(newTimeRange[0]).isSame(oldTimeRange[0]) &&
      dayjs(newTimeRange[1]).isSame(oldTimeRange[1])
    );
  }
  return false;
}

//---------------------------------------------------------------------------------------

const initialState = {
  dayId: null,
  scheduled: [],
  notScheduled: [],
  timerange: [],
  timeslots: [],
  trackLength: 0,
  toWorkBlock: function (
    { start, end, user },
    trackLength = this.trackLength,
    timerange = this.timerange
  ) {
    //converts timeslots to workblocks
    return {
      user,
      startTime: pixToTime(start, trackLength, timerange),
      endTime: pixToTime(end, trackLength, timerange),
    };
  },
  toTimeSlot: function (
    { startTime, endTime, user },
    trackLength = this.trackLength,
    timerange = this.timerange
  ) {
    //converts workblocks to timeslots

    return {
      user,
      start: timeToPix(startTime, trackLength, timerange),
      end: timeToPix(endTime, trackLength, timerange),
    };
  },

  getThirtyMin: function (
    minutes = 30,
    timerange = this.timerange,
    trackLength = this.trackLength
  ) {
    //gets thirty min in pixels
    const [start, end] = timerange.map((t) => moment(t));
    const duration = moment.duration(end.diff(start)).asMinutes();
    const ratio = minutes / duration;
    return ratio * trackLength;
  },
  getTwoHours: function () {
    return this.getThirtyMin(120);
  },
  isReadOnly: function (
    date,
    tommorrow = dayjs().add(1, "days").startOf("day")
  ) {
    return dayjs(date).isBefore(tommorrow);
  },
};

const currentScheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_DAY":
      //this is really closer to initializing the schedule
      return {
        ...initialState,
        dayId: action.payLoad,
      };

    case "NEW_WEEK":
      //this is really closer to initializing the schedule
      return {
        ...initialState,
        dayId: action.payLoad.dayId,
      };
    case "INITIALIZE_SCHEDULE":
      return {
        ...state,
        scheduled: action.payLoad.scheduled,
        notScheduled: action.payLoad.notScheduled,
      };

    case "UPDATE_TIME":
      const withUpdatedTime = (timeslots, { index, timeframe, newValue }) => {
        const newTimeslots = [...timeslots];
        newTimeslots[index][timeframe] = newValue;
        return newTimeslots;
      };

      return {
        ...state,
        timeslots: withUpdatedTime(state.timeslots, action.payLoad),
      };

    case "UPDATE_TIMERANGE":
      //check and see if tracklength is True, if so update timeslots

      if (areSame(state.timerange, action.payLoad)) {
        return state;
      } else {
        return {
          ...state,
          timerange: action.payLoad,
          timeslots: state.trackLength
            ? state.timeslots.length > 0
              ? state.timeslots
                  .map((ts) =>
                    state.toWorkBlock(ts, state.trackLength, state.timerange)
                  )
                  .map((wb) =>
                    state.toTimeSlot(wb, state.trackLength, action.payLoad)
                  )
              : state.scheduled.map((tm) =>
                  state.toTimeSlot(tm, state.trackLength, action.payLoad)
                )
            : state.timeslots,
        };
      }

    case "UPDATE_TRACK_LENGTH":
      //whenever container length changes the timeslot needs to be recreated with the new trackLength

      return {
        ...state,
        trackLength: action.payLoad,
        /*
        A. Only update if timerange is in place
        B. If timeslots exist update them
        C. If not create them
        */
        timeslots: state.timerange
          ? state.timeslots.length > 0
            ? state.timeslots
                .map((ts) => state.toWorkBlock(ts))
                .map((wb) => state.toTimeSlot(wb, action.payLoad))
            : /*state.timeslots.map((slot) => {
                return {
                  ...slot,
                  start: (slot.start / state.trackLength) * action.payLoad,
                  end: (slot.end / state.trackLength) * action.payLoad,
                };
              })*/
              state.scheduled.map((tm) =>
                state.toTimeSlot(tm, state.trackLength, action.payLoad)
              )
          : state.timeslots,
      };

    case "ADD_TO_SCHEDULED":
      //find in not scheduled, push in scheduled
      return (({ userId, date }) => {
        const notScheduled = [...state.notScheduled];
        const user = notScheduled.find(({ id }) => id === userId);
        const workblock = {
          user,
          startTime: dayjs(date).hour(8).format(),
          endTime: dayjs(date).hour(16).format(),
        };
        const index = notScheduled.indexOf(user);
        notScheduled.splice(index, 1);
        const scheduled = [...state.scheduled, workblock];
        return {
          ...state,
          scheduled,
          notScheduled,
          timeslots: [state.toTimeSlot(workblock), ...state.timeslots],
        };
      })(action.payLoad);

    case "REMOVE_FROM_SCHEDULED":
      //Remove workblock from scheduled and timeslots
      //add to notscheduled
      //made error function because of naming conflicts
      return ((userId) => {
        const scheduled = [...state.scheduled];
        const workblock = scheduled.find(({ user }) => user.id === userId);
        const index = scheduled.indexOf(workblock);
        scheduled.splice(index, 1);

        const timeslots = [...state.timeslots];
        const i = timeslots.indexOf(
          timeslots.find((ts) => ts.user.id === workblock.user.id)
        );
        timeslots.splice(i, 1);
        const notScheduled = [...state.notScheduled, workblock.user];

        return { ...state, scheduled, notScheduled, timeslots };
      })(action.payLoad);
    default:
      return state;
  }
};

export default currentScheduleReducer;
