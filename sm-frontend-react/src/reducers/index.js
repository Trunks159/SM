import scheduledReducer from "./scheduled";
import allUsersReducer from "./allUsers";
import notScheduledReducer from "./notScheduled";
import timeslotsReducer from "./timeslots";
import selectedWeekReducer from "./selectedWeek";
import { combineReducers } from "redux";
import currentDayIndexReducer from "./currentDayIndex";

const allReducers = combineReducers({
  scheduled: scheduledReducer,
  allUsers: allUsersReducer,
  notScheduled: notScheduledReducer,
  timeslots: timeslotsReducer,
  selectedWeek: selectedWeekReducer,
  currentDayIndex: currentDayIndexReducer,
});

export default allReducers;
