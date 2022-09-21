const scheduledReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD":
      state.push(action.payLoad);
      return state;
    default:
      return state;
  }
};

export default scheduledReducer;
