import moment from "moment";

const scheduledReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_SCHEDULED":
      const { theDate, user, dayId } = action.payLoad;
      console.log("New log: ", user.firstName);
      return [
        ...state,
        {
          user,
          startTime: moment(theDate).set("hour", 8),
          endTime: moment(theDate).set("hour", 16),
          userId: user.id,
          dayId,
        },
      ];
    case "UPDATE_SCHEDULED":
      return action.payLoad;
    default:
      return state;
  }
};

export default scheduledReducer;
