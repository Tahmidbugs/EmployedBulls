export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "AUTHENTICATION_START":
      console.log("LOGIN START CALLED");
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("loggedIn", JSON.stringify(action.payload));
      console.log("LOGIN SUCCESS CALLED with data", action.payload);
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGIN_FAILURE":
      console.log("LOGIN FAILURE CALLED");
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("loggedIn");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case "REGISTRATION_SUCCESS":
      console.log("REGISTERED");
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case "REGISTRATION_FAILURE":
      return {
        user: null,
        isFetching: false,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};
