import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  VERIFY_TOKEN,
  VERIFY_TOKEN_ERROR,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAIL,
} from "../actions/types/actionTypes";

const initialState = {
  isAuthenticated: null,
  token: localStorage.getItem("token"),
  isDistributor: null,
  user: null,
  loading: true,
};

/**
 * payload
 * {
 *    "token": "jwt",
 *     "user": {},
 *     "isDistributor": true / false
 * }
 */

export function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        user: payload.user,
        isDistributor: payload.isDistributor,
        loading: false,
      };

    case VERIFY_TOKEN:
      return {
        ...state,
        isAuthenticated: true,
        role: payload.role,
        isDistributor: payload.isDistributor,
        user: payload.user,
      };
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        user: payload.user,
      };

    case VERIFY_TOKEN_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case REGISTRATION_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        isDistributor: null,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}
