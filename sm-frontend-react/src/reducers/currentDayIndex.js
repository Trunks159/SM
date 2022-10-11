const currentDayIndexReducer = (state = null, action) => {
  switch (action.type) {
    case "UPDATE_CURRENT_DAY_INDEX":
      return action.payLoad;
    default:
      return state;
  }
};

export default currentDayIndexReducer;
