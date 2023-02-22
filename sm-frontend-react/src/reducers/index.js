import allUsersReducer from "./allUsers";
import selectedWeekReducer from "./selectedWeek";
import screenWidthReducer from "./screenWidth";
import { combineReducers } from "redux";
import currentUserReducer from "./currentUser";
import currentScheduleReducer from "./currentSchedule";

const allReducers = combineReducers({
  allUsers: allUsersReducer,
  currentSchedule: currentScheduleReducer,
  selectedWeek: selectedWeekReducer,
  screenWidth: screenWidthReducer,
  currentUser: currentUserReducer,
});

export default allReducers;
