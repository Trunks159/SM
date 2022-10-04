const containerWidthReducer = (state = 0, action) => {
  switch (action.type) {
    case "UPDATE_CONTAINER_WIDTH":
      return action.payLoad;
    default:
      return state;
  }
};

export default containerWidthReducer;
