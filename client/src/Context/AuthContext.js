import { createContext, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";
const loggedInUser = JSON.parse(localStorage.getItem("loggedIn"));
console.log("hehe:", loggedInUser);

const INITIAL_STATE = {
  isAuthenticated: false,
  isFetching: false,
  error: null,
  user: loggedInUser,
  isrecruiter: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        isrecruiter: state.isrecruiter,
        dispatch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
