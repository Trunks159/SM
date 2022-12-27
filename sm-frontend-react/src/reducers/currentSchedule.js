import moment from "moment";

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
    console.log("overflow: ", perc * length);
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

const createTimeslots = (workblocks, trackLength, timerange) => (
  workblocks.map((wb)=>({
    user : wb.user,
    start : timeToPix(wb.startTime, trackLength, timerange),
    end : timeToPix(wb.endTime, trackLength, timerange),
  }))
);



function areSame(oldTimeRange, newTimeRange) {
  if (newTimeRange.length === oldTimeRange.length) {
    return (
      moment(newTimeRange[0]).isSame(oldTimeRange[0]) &&
      moment(newTimeRange[1]).isSame(oldTimeRange[1])
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
    {start, end, user},
    trackLength = this.trackLength,
    timerange = this.timerange
  ) {
    //converts timeslots to workblocks
    return  {
      user,
      startTime: pixToTime(start, trackLength, timerange),
      endTime: pixToTime(end, trackLength, timerange),
    }
  },
  toTimeSlot: function({startTime, endTime, user},
    trackLength = this.trackLength,
    timerange = this.timerange){
    //converts workblocks to timeslots
    return({
      user,
      start : timeToPix(startTime, trackLength, timerange),
      end : timeToPix(endTime, trackLength, timerange),
    })
  }
};

const currentScheduleReducer = (state = initialState, action) => {
  let { timeslots, trackLength, timerange } = state;
  switch (action.type) {
    case "UPDATE_DAY_ID":
      //this is really closer to initializing the schedule
      return {
        ...initialState,
        dayId: action.payLoad,
      };
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
      return {
        ...state,
        timeslots: [
          state.toTimeSlot(action.payLoad),
          ...state.timeslots,
        ],
      };

    case "UPDATE_TIME":
      const { index, newVal, timeframe } = action.payLoad;
      timeslots[index][timeframe] = newVal;
      return { ...state, timeslots };

    case "UPDATE_TIMERANGE":
      //check and see if tracklength is True, if so update timeslots
      if (areSame(state.timerange, action.payLoad)) {
        return state;
      } else {
        return {
          ...state,
          timerange: action.payLoad,
          timeslots: state.trackLength
          ? timeslots
          //fix this for timerange
            ? timeslots.map((ts)=>state.toWorkBlock(ts, state.trackLength, state.timerange )).map((wb)=>state.toTimeSlot(wb, state.trackLength, action.payLoad)):
           state.scheduled.map((tm)=> toTimeSlot(tm))
          : state.timeslots
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
          ? timeslots
            ? state.timeslots.map((slot)=>({
              ...slot, 
              start : slot.start/state.trackLength * action.payLoad,
              end : slot.end/state.trackLength * action.payLoad,
            }))
            : createTimeslots(workblocks, trackLength, timerange)

          : state.timeslots,
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
