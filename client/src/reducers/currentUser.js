const currentUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_CURRENT_USER":
      return action.payLoad;
    default:
      return state;
  }
};

export default currentUserReducer;
