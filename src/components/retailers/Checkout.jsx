import React, { useEffect } from "react";
import styles from "../../styles/cartItem.module.css";
import { connect } from "react-redux";
import {
  createRazorpayOrder,
  updateOrderDetails,
} from "../../redux/actions/razorpayAction";
import { clearCart } from "../../redux/actions/cartAction";
import { toast } from "react-toastify";
import { fetchAllDistributors } from "../../redux/actions/distributorAction";

function loadRazorpay(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function Checkout({
  apiKey,
  amount,
  order_id,
  retailer_name,
  retailer_email,
  distributor_name,
  createRazorpayOrder,
  updateOrderDetails,
  cart,
  clearCart,
  retailer_id,
  retailer_phone,
  order_details,
  fetchAllDistributors,
  distributors,
}) {
  //change these

  const totalAmt = cart.reduce((prev, curr, currIdx, Arr) => {
    return prev + curr.amount;
  }, 0);

  const distributor_id = distributors[0].distributor_id;

  console.log(distributor_id);

  // make this dynamic
  const reqObject = {
    amount: totalAmt * 100,
    distributor_id: distributor_id,
    retailer_id: retailer_id,
  };

  useEffect(() => {
    fetchAllDistributors();
  }, []);

  useEffect(() => {
    createRazorpayOrder(reqObject);
  }, []);

  // console.log(order_id);

  console.log(order_details);

  async function displayRazorpay() {
    const res = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay Failed to load");
      return;
    }
    let options = {
      key: apiKey,
      amount: amount,
      currency: "INR",
      name: distributor_name,
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order_id,
      handler: function (response) {
        console.log(response);
        updateOrderDetails({
          order_id: order_details.order.order_id,
          transaction_id: response.razorpay_order_id,
        });
        toast.success("Payment success", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setTimeout(() => {
          clearCart();
        }, 400);
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: retailer_name,
        email: retailer_email,
        contact: retailer_phone,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    let paymentObject = new Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
      toast.error("payment failed!", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    });
  }

  if (cart.length < 1) {
    return (
      <div>
        <p>Sorry No products in the cart</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center text-4xl pt-4">Order Summary</h1>
      <div className="flex justify-center pt-4 mt-5 bordered drop-shadow-md">
        <div className="overflow-x-auto">
          <table className="table w-full drop-shadow-md border-solid">
            <thead>
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Quantity</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {cart &&
                cart.map((e, index) => {
                  return (
                    <tr key={e.product_id} className="hover">
                      <th>{index + 1}</th>
                      <td>{e.product_name}</td>
                      <td>{e.product_price}</td>
                      <td>{e.quantity}</td>
                      <td>{e.amount}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="grid justify-items-end">
            <h2 className="pr-4 text-md">Total amount in rupees: {totalAmt}</h2>
          </div>
        </div>
      </div>
      <div className={styles["buttonCenter"]}>
        <button
          disabled={cart.length < 1}
          className="btn btn-wide btn-md justify-self-center"
          onClick={displayRazorpay}
        >
          Pay
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  apiKey: state.razorpayReducer.apiKey,
  amount: state.razorpayReducer.amount,
  order_id: state.razorpayReducer.order_id,
  retailer_name: state.razorpayReducer.retailer_name,
  retailer_email: state.razorpayReducer.retailer_email,
  retailer_phone: state.razorpayReducer.retailer_phone,
  distributor_name: state.razorpayReducer.distributor_name,
  cart: state.cartReducer.cart,
  retailer_id: state.authReducer.user.retailer_id,
  order_details: state.razorpayReducer.order_details,
  distributors: state.distReducer.distributors,
});

export default connect(mapStateToProps, {
  createRazorpayOrder,
  updateOrderDetails,
  clearCart,
  fetchAllDistributors,
})(Checkout);
