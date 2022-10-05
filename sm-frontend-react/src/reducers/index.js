import scheduledReducer from "./scheduled";
import allUsersReducer from "./allUsers";
import notScheduledReducer from "./notScheduled";
import timeslotsReducer from "./timeslots";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  scheduled: scheduledReducer,
  allUsers: allUsersReducer,
  notScheduled: notScheduledReducer,
  timeslots: timeslotsReducer,
});

export default allReducers;
