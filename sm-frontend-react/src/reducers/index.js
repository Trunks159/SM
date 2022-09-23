import scheduledReducer from "./scheduled";
import allUsersReducer from "./allUsers";
import { combineReducers } from "redux";

const allReducers = combineReducers({ scheduled: scheduledReducer, allUsers : allUsersReducer });

export default allReducers;
