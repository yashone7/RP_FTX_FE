import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import styles from "../../styles/cartItem.module.css";
import { connect, useStore } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, clearCart } from "../../redux/actions/cartAction";
import { createOrder } from "../../redux/actions/razorpayAction";
import { fetchAllDistributors } from "../../redux/actions/distributorAction";

function Cart({
  cart,
  addToCart,
  clearCart,
  createOrder,
  distributors,
  user,
  fetchAllDistributors,
}) {
  const amt = cart.reduce((prev, curr, currIdx, Arr) => {
    return prev + curr.amount;
  }, 0);

  // console.log(user, distributors);
  const [totalAmt, setTotalAmt] = useState(amt);
  //console.log(totalAmt);

  const [cartModule, setCartModule] = useState(cart);

  const handleIncrement = (id) => {
    let newCart = [...cartModule];
    //console.log(id);
    let item = newCart.filter((e) => e.product_id === id);
    item[0].quantity++;
    item[0].amount = item[0].quantity * item[0].product_price;
    const index = newCart.findIndex((e) => e.product_id === id);
    newCart[index] = item[0];
    setCartModule(newCart);
    let amt = newCart.reduce((prev, curr, currIdx, Arr) => {
      return prev + curr.amount;
    }, 0);
    setTotalAmt(amt);
  };

  const handleDecrement = (id) => {
    // console.log(id);
    let newCart = [...cartModule];
    let item = newCart.filter((e) => e.product_id === id);
    item[0].quantity--;
    item[0].amount = item[0].quantity * item[0].product_price;
    const index = newCart.findIndex((e) => e.product_id === id);
    newCart[index] = item[0];
    // console.log(newCart);
    setCartModule(newCart);
    let amt = newCart.reduce((prev, curr, currIdx, Arr) => {
      return prev + curr.amount;
    }, 0);
    setTotalAmt(amt);
  };

  const handleClearProduct = (id) => {
    let newCart = [...cartModule];
    let modifyCart = newCart.filter((e) => e.product_id != id);
    setCartModule(modifyCart);
    let amt = modifyCart.reduce((prev, curr, currIdx, Arr) => {
      return prev + curr.amount;
    }, 0);
    setTotalAmt(amt);
  };

  // import { createRazorpayOrder } from "../../redux/actions/razorpayAction";
  useEffect(() => {
    fetchAllDistributors();
  }, []);
  // function loadRazorpay(src){
  //     return new Promise((resolve)=>{
  //         const script = document.createElement('script');
  //         script.src = src;
  //         script.onload= ()=>{
  //             resolve(true);
  //         }
  //         script.onerror = ()=>{
  //             resolve(false)
  //         }
  //         document.body.appendChild(script);
  //     })
  // }
  // {
  //   apiKey,
  //   amount,
  //   order_id,
  //   retailer_name,
  //   retailer_email,
  //   distributor_name,
  //   createRazorpayOrder
  //   }
  const handlePlaceOrder = () => {
    console.log(cartModule);
    cart = cartModule;
    addToCart(cartModule);

    createOrder({
      cart,
      order_amount: totalAmt,
      distributor_id: distributors[0].distributor_id,
      client_id: user.retailer_id,
    });
  };

  return (
    <div className="flex">
      <div className="w-2/12"></div>
      <div className="w-10/12">
        {cartModule.map((e) => (
          <CartItem
            key={e.product_id}
            product_id={e.product_id}
            product_name={e.product_name}
            product_price={e.product_price}
            quantity={e.quantity}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
            handleClearProduct={handleClearProduct}
          />
        ))}
      </div>
      {/* <div className="w-6/12">
       
       </div> */}
      <div className="w-8/12 mt-5">
        {cartModule.length === 0 ? (
          <div>
            <p className="text-center pb-2 text-xl">
              Your cart is empty, add items to continue.
            </p>
          </div>
        ) : (
          <div>
            <p className="text-center"> Total items: {cartModule.length}</p>
            <p className="text-center text-xl pb-2"> Amount(₹) : {totalAmt}</p>
            <div className={styles["buttonCenter"]}>
              <div>
                <Link
                  to="/retailer/checkout"
                  className="btn btn-wide btn-lg btn-accent justify-self-center"
                  // onClick={displayRazorpay}
                >
                  <button
                    onClick={handlePlaceOrder}
                    className="btn btn-accent btn-md justify-self-center"
                  >
                    Place order
                  </button>
                </Link>
                <div>
                  <button
                    onClick={() => clearCart()}
                    className="btn btn-wide  mt-2"
                  >
                    clear cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <div className="flex flex-wrap w-full">
       
      </div> */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cartReducer.cart,
  distributors: state.distReducer.distributors,
  user: state.authReducer.user,
});

export default connect(mapStateToProps, {
  addToCart,
  clearCart,
  createOrder,
  fetchAllDistributors,
})(Cart);
