import scheduledReducer from "./scheduled";
import allUsersReducer from "./allUsers";
import notScheduledReducer from "./notScheduled";
import timeslotsReducer from "./timeslots";
import { combineReducers } from "redux";
import containerWidthReducer from "./containerWidth";

const allReducers = combineReducers({
  scheduled: scheduledReducer,
  allUsers: allUsersReducer,
  notScheduled: notScheduledReducer,
  timeslots: timeslotsReducer,
  containerWidth: containerWidthReducer,
});

export default allReducers;
