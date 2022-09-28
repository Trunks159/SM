const timeslotsReducer = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_TIMESLOT":
      const u = state.find(({ userId }) => userId === action.payLoad.userId);
      return [...state];
    default:
      return state;
  }
};

export default timeslotsReducer;
