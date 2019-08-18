import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import storeReducer from "./storeReducer";
import productReducer from "./productReducer";

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  store: storeReducer,
  product: productReducer
});
