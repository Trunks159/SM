const screenWidthReducer = (state = 0, action) => {
  switch (action.type) {
    case "UPDATE_SCREEN_WIDTH":
      return action.payLoad;
    default:
      return state;
  }
};

export default screenWidthReducer;
