import axios from "axios";
import uuid from "uuid";
import {
  GET_PRODUCT_DETAIL,
  ADD_PRODUCT,
  GET_SELLER_PRODUCTS,
  DELETE_PRODUCT,
  ADDTOCART,
  DELETECARTITEM
} from "./types";
import { setAlert } from "./alert";

export const getProductDetail = id => async dispatch => {
  try {
    const res = await axios.get(`/api/product/${id}`);
    dispatch({
      type: GET_PRODUCT_DETAIL,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const addProduct = (formData, history) => async dispatch => {
  const config = {
    headers: {
      "content-type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/add-product", formData, config);
    dispatch({
      type: ADD_PRODUCT,
      payload: res.data
    });
    dispatch(setAlert("Product added", "success"));
    history.push("/dashboard");
  } catch (err) {
    alert(err.response.statusText);
  }
};

export const getSellerProducts = () => async dispatch => {
  try {
    const res = await axios.get("/api/all-products/me");
    dispatch({
      type: GET_SELLER_PRODUCTS,
      payload: res.data
    });
  } catch (err) {
    alert(err.response.statusText);
  }
};

// Add to cart

export const addToCart = product => dispatch => {
  const id = uuid();
  dispatch({
    type: ADDTOCART,
    payload: {product,id}
  });
};

// delete item from cart
export const deleteCartItem = id => dispatch => {
  dispatch({
    type: DELETECARTITEM,
    payload: id
  });
};

// delete product
export const deleteProduct = id => async dispatch => {
  try {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`/api/product/${id}`);
      dispatch({
        type: DELETE_PRODUCT,
        payload: id
      });
    }
    window.location.reload();
  } catch (err) {
    alert(err.response.statusText);
  }
};
