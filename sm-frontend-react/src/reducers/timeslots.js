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

const timeslotsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TIMESLOT":
      let {startTime , endTime, containerWidth, availableTimes, user, dayId} = action.payLoad;
      //convert the times to pixels and add to array

      return [...state,{
        startTime : timeToPix(startTime, containerWidth, availableTimes),
        endTime : timeToPix(endTime, containerWidth, availableTimes),
        user : user,
        userId : user.id,
        dayId : dayId,
      } ];
    default:
      return state;
  }
};

export default timeslotsReducer;
