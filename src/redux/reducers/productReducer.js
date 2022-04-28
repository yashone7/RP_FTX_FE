import {
  CREATE_PRODUCT,
  CREATE_PRODUCT_ERROR,
  FETCH_PRODUCTS_BY_DISTRIBUTOR_ID,
  FETCH_PRODUCTS_BY_DISTRIBUTOR_ID_ERROR,
  FETCH_ALL_PRODUCTS,
  FETCH_ALL_PRODUCTS_ERROR,
} from "../actions/types/actionTypes";

const initalState = {
  product: null,
  products: [],
  productById: null,
  productsByDistributor: [],
};

export function productReducer(state = initalState, action) {
  const { payload, type } = action;

  switch (type) {
    case CREATE_PRODUCT:
      return {
        ...state,
        product: payload,
      };
    case FETCH_PRODUCTS_BY_DISTRIBUTOR_ID:
      const _products = payload.map((e) => {
        return {
          ...e,
          amount: 0,
          quantity: 0,
        };
      });
      return {
        ...state,
        productsByDistributor: _products,
      };
    case FETCH_ALL_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    case CREATE_PRODUCT_ERROR:
      return {
        ...state,
        product: null,
      };
    case FETCH_ALL_PRODUCTS_ERROR:
      return {
        ...state,
        products: [],
      };
    case FETCH_PRODUCTS_BY_DISTRIBUTOR_ID_ERROR:
      return {
        ...state,
        productsByDistributor: [],
      };
    default:
      return state;
  }
}
