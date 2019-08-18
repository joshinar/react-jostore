import {
  GET_STORES,
  GET_SINGLESTORE_PRODUCTS,
  ADD_STORE,
  GET_LOCATION,
  SORTBY
} from "../actions/types";

const initialState = {
  allStores: [],
  singleStoreProducts: [],
  geolocation: [],
  sortedProducts: [],
  sort: ""
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_STORES:
      return {
        ...state,
        allStores: payload.data,
        geolocation: payload.location,
        singleStoreProducts: []
      };

    case GET_SINGLESTORE_PRODUCTS:
      return {
        ...state,
        singleStoreProducts: payload,
        allStores: [],
        singleProduct: []
      };
    case ADD_STORE:
      return {
        ...state,
        allStores: [...state.allStores, payload]
      };
    case GET_LOCATION:
      const store = state.allStores.filter(
        store => payload.toUpperCase().indexOf(store.city.toUpperCase()) !== -1
      );
      return {
        ...state,
        allStores: store
      };
    case SORTBY:
      state.singleStoreProducts.sort((a, b) =>
        state.sort === "lowest"
          ? a.price < b.price
            ? 1
            : -1
          : a.price > b.price
          ? 1
          : -1
      );

      return {
        ...state,
        sort: payload
      };

    default:
      return state;
  }
}
