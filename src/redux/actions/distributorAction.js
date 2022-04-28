import axios from "axios";
import {
  FETCH_ALL_DISTRIBUTORS,
  FETCH_ALL_DISTRIBUTORS_ERROR,
  REGISTER_DISTRIBUTOR,
  REGISTER_DISTRIBUTOR_ERROR,
} from "./types/actionTypes";
import { apiEndpoint } from "../../utils/apiEndpoint";
import { toast } from "react-toastify";
import { toastOtions } from "../../utils/toastOptions";

export const fetchAllDistributors = () => async (dispatch) => {
  try {
    const res = await axios.get(`${apiEndpoint}/api/distributors`);
    dispatch({ type: FETCH_ALL_DISTRIBUTORS, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: FETCH_ALL_DISTRIBUTORS_ERROR });
  }
};

export const registerDistributor =
  ({ name, phone_number, email, password, isDistributor }) =>
  async (dispatch) => {
    try {
      const body = JSON.stringify({
        name,
        phone_number,
        email,
        password,
        isDistributor,
      });
      const { data } = await axios({
        method: "POST",
        data: body,
        headers: {
          "Content-Type": "application/json",
        },
        url: `${apiEndpoint}/api/distributors`,
      });
      dispatch({ type: REGISTER_DISTRIBUTOR, payload: data });
      toast.success(data.message, toastOtions);
    } catch (err) {
      console.log(err);
      dispatch({ type: REGISTER_DISTRIBUTOR_ERROR });
      console.log(err.response.data);
      toast.error("registration failed", toastOtions);
    }
  };
