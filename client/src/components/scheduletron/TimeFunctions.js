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
  return timerange[0].add(
    (pix / width) * timerange[1].diff(timerange[0], "hours", true),
    "hours"
  );
};
//take pix and spit out a moment, the inverse of the above method

const convertDates = (dates, width, timerange) =>
  //Takes the date objects in an array and converts them
  //to an array of pixel values
  dates.map((item) =>
    timeToPix(item.getHours() + item.getMinutes() / 60, width, timerange)
  );

const roundIt = (newValue, dates) => {
  let difference = Math.abs(newValue - dates[0]);
  let found = null;
  for (let i = 1; i < dates.length; i++) {
    if (difference > Math.abs(newValue - dates[i])) {
      difference = Math.abs(newValue - dates[i]);
      found = i;
    }
  }
  return dates[found];
};

const pixToString = (pix, width, timerange) =>
  //pix to moment, then moment to string\
  pixToTime(pix, width, timerange).format("h:mm a");

const thirtyMin = (pix, width, timerange) => {
  //convert pix to time, add 30 min then convert back to pix
  //doesnt work well when u do this the easier way
  const time = pixToTime(pix, width, timerange);
  const pix2 = timeToPix(time.add(30, "minutes"), width, timerange);
  return pix2 - pix;
};

export { timeToPix, pixToTime, convertDates, roundIt, pixToString, thirtyMin };
