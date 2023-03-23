import dayjs from "dayjs";

const BASE_DATE = "1970-01-01T00:00:00";

function timeToSlider(time) {
  return (dayjs(time).diff(dayjs(BASE_DATE), "hours", true) / 24) * 1000;
}
function sliderToTime(sliderInt) {
  return dayjs(BASE_DATE)
    .add((sliderInt / 100) * 24, "hours")
    .format();
}
function roundToNearestThirty(time) {
  time = dayjs(time);
  const start = time.startOf("hour");
  const timesToRoundTo = [
    start,
    start.add(30, "minutes"),
    start.add(1, "hours"),
  ];
  const differences = timesToRoundTo.map((item) =>
    Math.abs(item.diff(time, "minutes", true))
  );
  const index = differences.indexOf(Math.min(...differences));
  return timesToRoundTo[index].format();
}

function valueLabelFormat(value) {
  return dayjs(roundToNearestThirty(sliderToTime(value))).format("h:mm a");
}
export { timeToSlider, sliderToTime, roundToNearestThirty, valueLabelFormat };
