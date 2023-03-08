const selectedWeekReducer = (state = { week: [], id: null }, action) => {
  switch (action.type) {
    case "UPDATE_SELECTED_WEEK":
      return action.payLoad;
    default:
      return state;
  }
};

export default selectedWeekReducer;
