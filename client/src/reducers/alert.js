const alertReducer = (state = null, action) => {
  switch (action.type) {
    case "UPDATE_ALERT":
      return action.payLoad;
    default:
      return state;
  }
};

export default alertReducer;
