import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  VERIFY_TOKEN,
  VERIFY_TOKEN_ERROR,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAIL,
} from "./types/actionTypes";
import axios from "axios";
import { apiEndpoint } from "../../utils/apiEndpoint";
import { toast } from "react-toastify";
import { toastOtions } from "../../utils/toastOptions";

export const login =
  ({ email, password, type }) =>
  async (dispatch) => {
    try {
      const body = JSON.stringify({ email, password, type });
      const res = await axios({
        url: `${apiEndpoint}/api/auth`,
        method: "POST",
        data: body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      toast.success("welcome", toastOtions);
    } catch (err) {
      console.log(err);
      dispatch({ type: LOGIN_FAIL });
      toast.error("login failed", toastOtions);
    }
  };

export const verifyToken = (token) => async (dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${apiEndpoint}/api/auth/verify?token=${token}`,
    });

    console.log(res.data);
    dispatch({ type: VERIFY_TOKEN, payload: res.data.payload });
  } catch (err) {
    dispatch({ type: VERIFY_TOKEN_ERROR });
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const loadUser =
  ({ type, token }) =>
  async (dispatch) => {
    try {
      const res = await axios.get(
        `${apiEndpoint}/api/auth?type=${type}&token=${token}`
      );
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

export const register =
  ({ name, email, password, phone_number, pincode, address, location }) =>
  async (dispatch) => {
    try {
      location = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [125.6, 10.1],
        },
        properties: {
          name: "Dinagat Islands",
        },
      };
      const body = JSON.stringify({
        name,
        email,
        password,
        phone_number,
        address,
        location,
        pincode,
      });
      console.log(body);
      const res = await axios({
        url: `${apiEndpoint}/api/retailers`,
        method: "POST",
        data: body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: REGISTRATION_SUCCESS, payload: res.data });
      toast.success("Login To Continue", toastOtions);
    } catch (err) {
      console.log(err);
      dispatch({ type: REGISTRATION_FAIL });
      toast.error("Registrarion failed", toastOtions);
    }
  };
