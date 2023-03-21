const alertReducer = (
  state = { content: null, severity: null, title: null },
  action
) => {
  switch (action.type) {
    case "UPDATE_ALERT":
      return action.payLoad;
    default:
      return state;
  }
};

export default alertReducer;
