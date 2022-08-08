const timeToPixels = (hrs, width, timerange) =>
  floatToPerc(hrs, timerange) * width;

/*Converts time in hours format to 
  a percentage */
const floatToPerc = (time, timerange) =>
  (time - timerange[0]) / (timerange[1] - timerange[0]);

/*Converts a percentage to a number of hours */
const percToFloat = (perc, timerange) =>
  perc * (timerange[1] - timerange[0]) + timerange[0];

/*Converts a value which is just a number between 0 and 100 to a number of hours */
const valueToFloat = (value, timerange = [7, 24]) => {
  return percToFloat(value / 100, timerange);
};

//Converts string time 00:00 to hours float
function timeToFloat(time) {
  const d = new Date("January 1, 1980 " + time + ":00");
  return d.getHours() + d.getMinutes() / 60;
}

function arrayOfDates(start = 6, end = 23) {
  /*Returns Array of Dates ranging from 6:00AM to 11:30PM */
  let t = new Date();
  t.setHours(0, 0, 0, 0);
  t.setHours(start);
  let x = [];
  while (t.getHours() <= end) {
    x.push(new Date(t));
    t.setMinutes(t.getMinutes() + 30);
  }
  return x;
}

function valueToDt(value) {
  /*Takes value (number between 0 and 100) and converts it to a
    Date object */
  const hours = (value / 100) * 16.5 + 7;
  const min = 60 * (hours - Math.floor(hours));
  return new Date(1970, 1, 1, hours, min, 0, 0);
}

function dtToValue(dt) {
  return ((dt.getHours() + dt.getMinutes() / 60 - 7) / 16.5) * 100;
}

function timesToValues(times) {
  /*Convert "07:00-15:00" to an array of 2 values 
    This is also the first time ive ever used recursion...
  */

  return times
    ? times.split("-").map((t) => timeToValue(t))
    : timesToValues("08:00-15:30");
}

function timeToValue(time) {
  /*Takes time in xx:xx format and retrns a value between 0 - 100*/
  return dtToValue(new Date("January 1, 1980 " + time + ":00"));
}

function miliToReg(time) {
  /*Takes military time and spits out AM PM Times */
  const t = new Date("January 1, 1980 " + time + ":00");

  const h = t.getHours();
  const m = t.getMinutes();
  const convertMin = (min) =>
    min >= 10 ? min.toString() : "0" + min.toString();
  if (h > 12) {
    return (h - 12).toString() + ":" + convertMin(m) + "PM";
  } else if (h === 12) {
    return h.toString() + ":" + convertMin(m) + "PM";
  }
  console.log("Time: ", time);
  return h.toString() + ":" + convertMin(m) + "AM";
}

function getMarks() {
  return arrayOfDates().map((time, i, arr) => {
    if (i === 0) {
      return {
        value: dtToValue(time),
        label: "7:00AM",
      };
    } else if (i === arr.length - 1) {
      return {
        value: dtToValue(time),
        label: "11:30PM",
      };
    } else if (time.getHours() + time.getMinutes() === 45) {
      return {
        value: dtToValue(time),
        label: miliToReg(time.toTimeString().slice(0, 5)),
      };
    }
    return { value: dtToValue(time) };
  });
}

export {
  arrayOfDates,
  valueToDt,
  dtToValue,
  timesToValues,
  timeToValue,
  miliToReg,
  getMarks,
  timeToFloat,
  valueToFloat,
  floatToPerc,
  timeToPixels,
  percToFloat,
};
