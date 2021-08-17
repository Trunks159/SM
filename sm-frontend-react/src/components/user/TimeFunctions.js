function arrayOfDates() {
  /*Returns Array of Dates ranging from 7:00AM to 11:30PM */
  let t = new Date();
  t.setHours(0, 0, 0, 0);
  t.setHours(7);
  let x = [];
  while (t.getHours() <= 22) {
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
    ? times
        .split("-")
        .map((t) => dtToValue(new Date("January 1, 1980 " + t + ":00")))
    : timesToValues("08:00-15:30");
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
    return h.toString() + ":" + convertMin(m) + "N";
  }
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
  miliToReg,
  getMarks,
};