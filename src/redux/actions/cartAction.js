import { ADD_TO_CART, REMOVE_FROM_CART } from "./types/actionTypes";
import { toast } from "react-toastify";
import { toastOtions } from "../../utils/toastOptions";
// export const addToCart = (product_id) => (dispatch, getState) => {
//   const state = getState();
//   const _cart = state.productReducer.productsByDistributor;
//   const newCart = [..._cart];
//   let item = newCart.filter((e) => e.product_id === product_id);
//   console.log(item);
//   item[0].quantity++;
//   item[0].amount = item[0].quantity * item[0].product_price;
//   const index = newCart.findIndex((e) => e.product_id === product_id);
//   newCart[index] = item[0];
//   console.log(newCart);
//   dispatch({ type: ADD_TO_CART, payload: newCart });
// };

// export const removeFromCart = (product_id) => (dispatch, getState) => {
//   const state = getState();
//   const _cart = state.productReducer.productsByDistributor;
//   const newCart = [..._cart];
//   let item = newCart.filter((e) => e.product_id === product_id);
//   // console.log(item);
//   item[0].quantity--;
//   item[0].amount = item[0].quantity * item[0].product_price;
//   const index = newCart.findIndex((e) => e.product_id === product_id);
//   newCart[index] = item[0];
//   dispatch({ type: REMOVE_FROM_CART, payload: newCart });
// };

export const addToCart = (_cart) => (dispatch) => {
  dispatch({ type: ADD_TO_CART, payload: _cart });
  toast.info("added to cart", toastOtions);
};

export const clearCart = () => (dispatch) => {
  console.log("inside clear cart action");
  dispatch({ type: "CLEAR_CART" });
  toast.info("cleared cart", toastOtions);
};
