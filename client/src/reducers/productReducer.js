import {
  GET_PRODUCT_DETAIL,
  ADD_PRODUCT,
  GET_SELLER_PRODUCTS,
  DELETE_PRODUCT,
  ADDTOCART,
  DELETECARTITEM
} from "../actions/types";

const initialState = {
  singleProduct: [],
  addProducts: [],
  sellerProducts: [],
  addToCart: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCT_DETAIL:
      setTimeout(() => {
        state.singleProduct = [];
      }, 2000);
    case ADD_PRODUCT:
      return {
        ...state,
        addProducts: [payload],
        singleProduct: [payload]
      };
    case GET_SELLER_PRODUCTS:
      return {
        ...state,
        sellerProducts: payload
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        sellerProducts: state.sellerProducts.filter(
          product => product.id !== payload
        )
      };
    case ADDTOCART:
      let items;
      if (localStorage.getItem("cartItems") === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem("cartItems"));
      }
      items.push(payload);
      localStorage.setItem("cartItems", JSON.stringify(items));
      return {
        ...state,
        addToCart: [...state.addToCart, payload.product, payload.id]
      };
    case DELETECARTITEM:
      let filterItems = JSON.parse(localStorage.getItem("cartItems"));
      console.log(filterItems);
      filterItems = filterItems.filter(item => item.id !== payload);
      localStorage.setItem("cartItems", JSON.stringify(filterItems));

      return {
        ...state,
        addToCart: state.addToCart.filter(item => item._id !== payload)
      };

    default:
      return state;
  }
}
