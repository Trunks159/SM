const allUsersReducer = (state = null, action) => {
    switch (action.type) {
      case "UPDATE_ALL_USERS":
        return action.payLoad;
      default:
        return state;
    }
  };
  
  export default allUsersReducer;
  