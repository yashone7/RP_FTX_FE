import axios from "axios";
import {
  CREATE_ORDER,
  CREATE_ORDER_ERROR,
  FETCH_ORDER,
  FETCH_ORDER_ERROR,
  UPDATE_ORDER_ID,
  UPDATE_ORDER_ID_ERROR,
} from "./types/actionTypes";
import { apiEndpoint } from "../../utils/apiEndpoint";
import { toast } from "react-toastify";

export const createRazorpayOrder =
  ({ amount, retailer_id, distributor_id }) =>
  async (dispatch) => {
    try {
      const body = JSON.stringify({ amount, retailer_id, distributor_id });
      const res = await axios({
        url: `${apiEndpoint}/api/razorpay`,
        method: "POST",
        data: body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: FETCH_ORDER, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: FETCH_ORDER_ERROR });
    }
  };

export const createOrder =
  ({ cart, distributor_id, client_id, order_amount }) =>
  async (dispatch) => {
    try {
      const cart_object = cart.map((e) => {
        return {
          product_quantity: e.quantity,
          product_price: e.product_price,
          product_id: e.product_id,
        };
      });
      console.log("test hello");
      console.log(cart_object);
      const body = JSON.stringify({
        cart_object,
        distributor_id,
        client_id,
        order_amount,
      });

      const res = await axios({
        method: "POST",
        url: `${apiEndpoint}/api/orders`,
        data: body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("order created", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });

      console.log(res.data);

      dispatch({ type: CREATE_ORDER, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: CREATE_ORDER_ERROR });
      toast.error("could not create order", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

export const updateOrderDetails =
  ({ order_id, transaction_id }) =>
  async (dispatch) => {
    try {
      const res = await axios({
        method: "PATCH",
        url: `${apiEndpoint}/api/orders/update?order_id=${order_id}&transaction_id=${transaction_id}`,
      });
      dispatch({ type: UPDATE_ORDER_ID, payload: res.data });
    } catch (err) {
      dispatch({ type: UPDATE_ORDER_ID_ERROR });
    }
  };
