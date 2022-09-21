import scheduledReducer from "./scheduled";
import { combineReducers } from "redux";

const allReducers = combineReducers({ scheduled: scheduledReducer });

export default allReducers;
