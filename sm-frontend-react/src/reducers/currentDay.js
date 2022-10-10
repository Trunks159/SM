const currentDayReducer = (state = null, action) => {
    switch (action.type) {
      case "UPDATE_CURRENT_DAY":
        return action.payLoad;
      default:
        return state;
    }
  };
  
  export default currentDayReducer;
  