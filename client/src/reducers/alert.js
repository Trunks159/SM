const alertReducer = (
  state = { content: null, severity: null, title: null },
  action
) => {
  switch (action.type) {
    case "UPDATE_ALERT":
      return action.payLoad;
    case "NEW_USER":
      return {
        content: `${action.payLoad.firstName} ${action.payLoad.lastName} has been successfully added!`,
        title: "Addition Successful",
        severity: "success",
      };
    case "USER_REGISTERED":
      return {
        content: `You successfully registered ${action.payLoad.firstName}! Try logging in.`,
        title: "Wonderful!",
        severity: "success",
      };

    case "USER_LOGGED_IN":
      return {
        content: `You successfully logged in ${action.payLoad.username}!`,
        title: "Login Successful!",
        severity: "success",
      };

    default:
      return state;
  }
};

export default alertReducer;
