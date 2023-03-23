const selectedWeekReducer = (state = null, action) => {
  switch (action.type) {
    case "NEW_WEEK":
      return action.payLoad.week;
    default:
      return state;
  }
};

export default selectedWeekReducer;
