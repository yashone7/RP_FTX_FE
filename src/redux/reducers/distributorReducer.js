import {
  FETCH_ALL_DISTRIBUTORS,
  FETCH_ALL_DISTRIBUTORS_ERROR,
  REGISTER_DISTRIBUTOR,
  REGISTER_DISTRIBUTOR_ERROR,
} from "../actions/types/actionTypes";

const initialState = {
  distributors: [],
  distributor: null,
};

export function distReducer(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case REGISTER_DISTRIBUTOR:
      return {
        ...state,
        distributor: payload,
      };
    case FETCH_ALL_DISTRIBUTORS:
      return {
        ...state,
        distributors: payload,
      };
    case FETCH_ALL_DISTRIBUTORS_ERROR:
      return {
        ...state,
        distributors: [],
      };
    case REGISTER_DISTRIBUTOR_ERROR:
      return {
        ...state,
        distributor: null,
      };
    default:
      return state;
  }
}
