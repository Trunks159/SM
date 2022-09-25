const scheduledReducer = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_SCHEDULED":
      console.log("Redux: ", action.newScheduled);
      return action.payLoad;
    case "ADD_SCHEDULED":
      return [...state, action.newScheduled];
    default:
      return state;
  }
};

export default scheduledReducer;
