import axios from "axios";
import { apiEndpoint } from "../../utils/apiEndpoint";
import {
  GET_ALL_RETAILERS,
  GET_SALE_BETWEEN_DATES,
  GET_SALE_BETWEEN_DATES_ERROR,
  GET_SALE_BY_RETAILER,
  GET_SALE_BY_RETAILER_ERROR,
  GET_TOTAL_SALE,
  GET_TOTAL_SALE_ERROR,
} from "./types/actionTypes";

export const getTotalSale = () => async (dispatch) => {
  try {
    const res = await axios.get(`${apiEndpoint}/api/sale`);
    dispatch({ type: GET_TOTAL_SALE, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: GET_TOTAL_SALE_ERROR });
  }
};

export const getSaleByRetailer = (retailer_id) => async (dispatch) => {
  try {
    const res = await axios.get(`${apiEndpoint}/api/sale/${retailer_id}`);
    dispatch({ type: GET_SALE_BY_RETAILER, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: GET_SALE_BY_RETAILER_ERROR });
  }
};

export const getSaleBetweenDates =
  ({ start_date, end_date }) =>
  async (dispatch) => {
    try {
      const res = await axios.get(
        `${apiEndpoint}/api/sale/${start_date}/${end_date}`
      );

      dispatch({ type: GET_SALE_BETWEEN_DATES, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: GET_SALE_BETWEEN_DATES_ERROR });
    }
  };

export const getAllRetailers = () => async (dispatch) => {
  try {
    const res = await axios.get(`${apiEndpoint}/api/retailers`);
    dispatch({ type: GET_ALL_RETAILERS, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: GET_SALE_BETWEEN_DATES_ERROR });
  }
};
