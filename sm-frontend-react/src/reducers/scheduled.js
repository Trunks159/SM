import moment from "moment";

const scheduledReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_SCHEDULED":
      const { date, user } = action.payLoad;
      return [
        ...state,
        {
          user: user,
          startTime: moment(date).set("hour", 8),
          endTime: moment(date).set("hour", 16),
          userId: user.id,
          date: date,
        },
      ];
    case "UPDATE_SCHEDULED":
      return action.payLoad;
    default:
      return state;
  }
};

export default scheduledReducer;
