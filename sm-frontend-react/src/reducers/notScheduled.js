const notScheduledReducer = (state = [], action) => {
    switch (action.type) {
      case "UPDATE_NOT_SCHEDULED":
         return action.payLoad;
      default:
        return state;
    }
  };
  
  export default notScheduledReducer;
  