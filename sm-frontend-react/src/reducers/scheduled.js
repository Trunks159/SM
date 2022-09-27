import moment from "moment";

const scheduledReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_SCHEDULED":
      const { day, user } = action.payLoad;
      return [
        ...state,
        {
          user: user,
          startTime: moment(day.date).set("hour", 8),
          endTime: moment(day.date).set("hour", 16),
          userId: user.id,
          dayId: day.id,
        },
      ];
    case "ADD_SCHEDULED":
      return [...state, action.newScheduled];
    default:
      return state;
  }
};

export default scheduledReducer;
