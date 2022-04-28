import axios from "axios";
import {
  FETCH_ALL_PRODUCTS,
  FETCH_ALL_PRODUCTS_ERROR,
  FETCH_PRODUCT_DETAILS_BY_ID,
  FETCH_PRODUCT_DETAILS_BY_ID_ERROR,
  FETCH_PRODUCTS_BY_DISTRIBUTOR_ID,
  FETCH_PRODUCTS_BY_DISTRIBUTOR_ID_ERROR,
  CREATE_PRODUCT,
  CREATE_PRODUCT_ERROR,
} from "./types/actionTypes";
import { apiEndpoint } from "../../utils/apiEndpoint";
import { toast } from "react-toastify";
import { toastOtions } from "../../utils/toastOptions";

export const fetchAllProducts = () => async (dispatch) => {
  try {
    const res = await axios.get(`${apiEndpoint}/api/products`);
    dispatch({ type: FETCH_ALL_PRODUCTS, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: FETCH_ALL_PRODUCTS_ERROR });
  }
};

export const fetchProductDetailsById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${apiEndpoint}/api/products/${id}`);
    dispatch({ type: FETCH_PRODUCT_DETAILS_BY_ID, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: FETCH_PRODUCT_DETAILS_BY_ID_ERROR });
  }
};

export const fetchProductsByDistributorId = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${apiEndpoint}/api/productsByDistributor/${id}`
    );

    // console.log(res.data);
    dispatch({ type: FETCH_PRODUCTS_BY_DISTRIBUTOR_ID, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: FETCH_PRODUCTS_BY_DISTRIBUTOR_ID_ERROR });
  }
};

export const createProduct =
  ({
    product_price,
    distributor_id,
    number_in_stock,
    product_name,
    description,
  }) =>
  async (dispatch) => {
    try {
      const body = JSON.stringify({
        product_price,
        distributor_id,
        number_in_stock,
        product_name,
        description,
      });

      console.log(body);

      const { data } = await axios({
        method: "POST",
        url: `${apiEndpoint}/api/products`,
        data: body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: CREATE_PRODUCT, payload: data });
      toast.success(data.message, toastOtions);
    } catch (err) {
      console.log(err);
      dispatch({ type: CREATE_PRODUCT_ERROR });
    }
  };
