import {
  GET_SALE_BETWEEN_DATES,
  GET_SALE_BETWEEN_DATES_ERROR,
  GET_SALE_BY_RETAILER,
  GET_SALE_BY_RETAILER_ERROR,
  GET_TOTAL_SALE,
  GET_TOTAL_SALE_ERROR,
  GET_ALL_RETAILERS,
  GET_ALL_RETAILER_ERROR,
} from "../actions/types/actionTypes";

const initalState = {
  totalSale: [],
  saleByRetailer: [],
  saleBetweenDates: [],
  retailers: [],
};

export function saleReducer(state = initalState, action) {
  const { payload, type } = action;

  switch (type) {
    case GET_SALE_BETWEEN_DATES:
      return {
        ...state,
        saleBetweenDates: payload,
      };
    case GET_SALE_BETWEEN_DATES_ERROR:
      return {
        ...state,
        saleBetweenDates: [],
      };
    case GET_SALE_BY_RETAILER:
      return {
        ...state,
        saleByRetailer: payload,
      };
    case GET_SALE_BY_RETAILER_ERROR:
      return {
        ...state,
        saleByRetailer: [],
      };
    case GET_TOTAL_SALE:
      return {
        ...state,
        totalSale: payload,
      };
    case GET_ALL_RETAILERS:
      return {
        ...state,
        retailers: payload,
      };
    case GET_ALL_RETAILER_ERROR:
      return {
        ...state,
        retailers: [],
      };
    case GET_TOTAL_SALE_ERROR:
      return {
        ...state,
        totalSale: [],
      };
    default:
      return state;
  }
}
