import scheduledReducer from "./scheduled";
import allUsersReducer from "./allUsers";
import notScheduledReducer from "./notScheduled";
import timeslotsReducer from "./timeslots";
import selectedWeekReducer from "./selectedWeek";
import { combineReducers } from "redux";
import currentDayReducer from "./currentDay";

const allReducers = combineReducers({
  scheduled: scheduledReducer,
  allUsers: allUsersReducer,
  notScheduled: notScheduledReducer,
  timeslots: timeslotsReducer,
  selectedWeek : selectedWeekReducer,
  currentDay : currentDayReducer,
});

export default allReducers;
