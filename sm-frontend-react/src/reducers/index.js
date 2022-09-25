import scheduledReducer from "./scheduled";
import allUsersReducer from "./allUsers";
import notScheduledReducer from './notScheduled';
import { combineReducers } from "redux";

const allReducers = combineReducers({ scheduled: scheduledReducer, allUsers : allUsersReducer , notScheduled : notScheduledReducer});

export default allReducers;
