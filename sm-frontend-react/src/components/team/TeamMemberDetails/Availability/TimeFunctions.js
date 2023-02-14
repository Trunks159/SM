import moment from "moment";

const BASE_DATE = "1970-01-01 00:00";

function timeToSliderValue(time) {
  //makes moment from basedate and sets hr and min to that time
  //calc diff from 12AM, makes that a perctage
  return (timeToMoment(time).diff(moment(BASE_DATE), "hours", true) / 24) * 100;
}

function roundToNearestThirty(time) {
  const momentTime = timeToMoment(time);

  const start = momentTime.clone().minutes(0).second(0).millisecond(0);
  const timesToRoundTo = [
    start.clone(),
    start.clone().add(30, "minutes"),
    start.clone().add(1, "hours"),
  ];

  const differences = timesToRoundTo.map((item) =>
    Math.abs(item.diff(momentTime, "minutes", true))
  );

  const index = differences.indexOf(Math.min(...differences));
  return timesToRoundTo[index].format();
}

function timeToMoment(time) {
  //time in HH:mm format to a Moment object
  const splittedTime = time.split(":");
  return moment(BASE_DATE).hours(splittedTime[0]).minute(splittedTime[1]);
}

function sliderValueToTime(sliderValue) {
  return moment(BASE_DATE)
    .add((sliderValue / 100) * 24, "hours")
    .format("HH:mm");
}

function valueLabelFormat(value) {
  //slider to valuetime
  return moment(roundToNearestThirty(sliderValueToTime(value))).format(
    "h:mm a"
  );
}

export {
  timeToSliderValue,
  roundToNearestThirty,
  timeToMoment,
  sliderValueToTime,
  valueLabelFormat,
};
