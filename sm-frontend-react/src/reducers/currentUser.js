const currentUserReducer = (state = { isAuthenticated: false }, action) => {
  switch (action.type) {
    case "UPDATE_CURRENT_USER":
      return action.payLoad;
    default:
      return state;
  }
};

export default currentUserReducer;
