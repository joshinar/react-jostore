import axios from "axios";
import {
  GET_STORES,
  GET_SINGLESTORE_PRODUCTS,
  ADD_STORE,
  GET_LOCATION,
  SORTBY
} from "./types";
import { setAlert } from "./alert";

export const getStores = () => async dispatch => {
  const location = {};
  navigator.geolocation.getCurrentPosition(position => {
    location.lat = position.coords.latitude;
    location.long = position.coords.longitude;
  });
  try {
    const res = await axios.get("/stores");
    dispatch({
      type: GET_STORES,
      payload: { data: res.data, location }
    });
  } catch (err) {
    console.log(err);
  }
};

export const singleStoreProducts = store => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${store}`);

    dispatch({
      type: GET_SINGLESTORE_PRODUCTS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const handleSort = sortVal => async dispatch => {
  dispatch({
    type: SORTBY,
    payload: sortVal
  });
};
// Add store

export const addStore = (formData, history) => async dispatch => {
  const config = {
    headers: {
      "content-type": "application/json"
    }
  };
  try {
    const res = await axios.post("/api/new-store", formData, config);
    dispatch({
      type: ADD_STORE,
      payload: res.data
    });
    dispatch(setAlert("Store details added", "success"));
    history.push("/dashboard");
  } catch (err) {
    alert(err.response.statusText);
  }
};

// get location
export const getLocation = (lat, long) => async dispatch => {
  // 30.7333,76.7794

  try {
    console.log("working");
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyCa29g1y1enLHSd4gTREhSEl0XeW7ToObc`
    );
    dispatch({
      type: GET_LOCATION,
      payload: res.data.plus_code.compound_code
    });
  } catch (err) {}
};
