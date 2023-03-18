import axios from "axios";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "AUTHENTICATION_START" });
  try {
    const res = await axios.post(
      "http://localhost:8800/api/auth/login",
      userCredentials
    );
    console.log("logged in data, ", res);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    alert(err.response.data.message);
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const registerCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      "http://localhost:8800/api/auth/register",
      userCredentials
    );
    console.log("registered data, ", res.data);
    dispatch({ type: "REGISTRATION_SUCCESS", payload: res.data });
  } catch (err) {
    alert(err.response.data.message);
    dispatch({ type: "REGISTRATION_FAILURE", payload: err });
  }
};

export const logoutCall = async (dispatch) => {
  dispatch({ type: "LOGOUT" });
};
