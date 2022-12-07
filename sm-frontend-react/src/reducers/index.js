import scheduledReducer from "./scheduled";
import allUsersReducer from "./allUsers";
import notScheduledReducer from "./notScheduled";
import selectedWeekReducer from "./selectedWeek";
import screenWidthReducer from "./screenWidth";
import { combineReducers } from "redux";
import currentUserReducer from "./currentUser";
import currentScheduleReducer from "./currentSchedule";

const allReducers = combineReducers({
  scheduled: scheduledReducer,
  allUsers: allUsersReducer,
  notScheduled: notScheduledReducer,
  currentSchedule: currentScheduleReducer,
  selectedWeek: selectedWeekReducer,
  screenWidth: screenWidthReducer,
  currentUser: currentUserReducer,
});

export default allReducers;
