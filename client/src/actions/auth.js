import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

// Load user

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/login");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Seller registration
export const register = ({
  name,
  email,
  password,
  phone
}) => async dispatch => {
  const config = {
    headers: {
      "Content-type": "Application/json"
    }
  };
  const body = JSON.stringify({ name, email, password, phone });
  try {
    const res = await axios.post("/api/register", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.error;
    if (errors) {
      dispatch(setAlert(errors, "danger"));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Seller login

export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-type": "Application/json"
    }
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/login", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.error;
    if (errors) {
      dispatch(setAlert(errors, "danger"));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Seller logout
export const logout = history => async dispatch => {
  dispatch({
    type: LOGOUT
  });
  dispatch(setAlert("Logged out", "success"));
};
