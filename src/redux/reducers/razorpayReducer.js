import {
  CREATE_ORDER_ERROR,
  CREATE_ORDER,
  FETCH_ORDER,
  FETCH_ORDER_ERROR,
  UPDATE_ORDER_ID,
  UPDATE_ORDER_ID_ERROR,
} from "../actions/types/actionTypes";

const initialState = {
  apiKey: null,
  amount: null,
  order_id: null,
  retailer_name: null,
  retailer_email: null,
  distributor_name: null,
  retailer_phone: null,
  order_details: null,
  updated_order_details: null,
};

export function razorpayReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ORDER:
      return {
        ...state,
        apiKey: payload.apiKey,
        amount: payload.amount,
        order_id: payload.order_id,
        retailer_name: payload.retailer_name,
        retailer_email: payload.retailer_email,
        distributor_name: payload.distributor_name,
        retailer_phone: payload.retailer_phone,
      };

    case CREATE_ORDER:
      return {
        ...state,
        order_details: payload,
      };

    case CREATE_ORDER_ERROR:
      return {
        ...state,
        order_details: null,
      };

    case UPDATE_ORDER_ID:
      return {
        ...state,
        updated_order_details: payload,
      };

    case UPDATE_ORDER_ID_ERROR:
      return {
        ...state,
        updated_order_details: null,
      };

    case FETCH_ORDER_ERROR:
      return {
        ...state,
        apiKey: null,
        amount: null,
        order_id: null,
        retailer_name: null,
        retailer_email: null,
        distributor_name: null,
        retailer_phone: null,
      };
    default:
      return state;
  }
}
