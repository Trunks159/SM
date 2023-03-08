const allUsersReducer = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_ALL_USERS":
      return action.payLoad;
    case "CREATE_USER":
      return [...state, action.payLoad];
    case "DELETE_USER":
      const index = state.indexOf(
        state.find(({ id }) => id === action.payLoad)
      );
      let state_copy = [...state];
      state_copy.splice(index, 1);
      return [...state_copy];
    default:
      return state;
  }
};

export default allUsersReducer;
