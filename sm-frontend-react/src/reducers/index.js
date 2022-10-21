import scheduledReducer from "./scheduled";
import allUsersReducer from "./allUsers";
import notScheduledReducer from "./notScheduled";
import timeslotsReducer from "./timeslots";
import selectedWeekReducer from "./selectedWeek";
import screenWidthReducer from "./screenWidth";
import currentDayIndexReducer from "./currentDayIndex";
import { combineReducers } from "redux";
import currentUserReducer from "./currentUser";

const allReducers = combineReducers({
  scheduled: scheduledReducer,
  allUsers: allUsersReducer,
  notScheduled: notScheduledReducer,
  timeslots: timeslotsReducer,
  selectedWeek: selectedWeekReducer,
  screenWidth: screenWidthReducer,
  currentDayIndex: currentDayIndexReducer,
  currentUser: currentUserReducer,
});

export default allReducers;
