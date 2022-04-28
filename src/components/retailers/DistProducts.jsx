import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartAction";
import ProductItem from "./ProductItem";
import styles from "../../styles/cartItem.module.css";
import { useHistory } from "react-router-dom";

function DistProducts({ productsByDist: products, addToCart }) {
  //   console.log(products);

  const newProducts = products.map((p) => {
    return {
      ...p,
      quantity: 0,
      amount: 0,
    };
  });

  const [cart, setCart] = useState(newProducts);

  const handleIncrement = (id) => {
    // console.log(id);
    let newCart = [...cart];
    let item = newCart.filter((e) => e.product_id === id);
    item[0].quantity++;
    item[0].amount = item[0].quantity * item[0].product_price;
    const index = newCart.findIndex((e) => e.product_id === id);
    newCart[index] = item[0];
    // console.log(newCart);
    setCart(newCart);
  };

  const handleDecrement = (id) => {
    // console.log(id);
    let newCart = [...cart];
    let item = newCart.filter((e) => e.product_id === id);
    item[0].quantity--;
    item[0].amount = item[0].quantity * item[0].product_price;
    const index = newCart.findIndex((e) => e.product_id === id);
    newCart[index] = item[0];
    // console.log(newCart);
    setCart(newCart);
  };
  let history = useHistory();
  const handleAddItems = () => {
    const _cart = cart.filter((e) => e.amount > 0);
    addToCart(_cart);
    history.replace("/retailer/cart");
  };

  return (
    <div>
      <h1 className="text-center text-4xl">Products</h1>

      <div className="">
        <div className="flex">
          {cart.map((p) => {
            return (
              <ProductItem
                key={p.product_id}
                product_id={p.product_id}
                product_name={p.product_name}
                product_price={p.product_price}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
                quantity={p.quantity}
              />
            );
          })}
        </div>
      </div>
      <div className={styles["buttonCenter"]}>
        <button onClick={handleAddItems} className="btn btn-accent mt-2 mb-3">
          Add items to cart
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  productsByDist: state.productReducer.productsByDistributor,
});

export default connect(mapStateToProps, { addToCart })(DistProducts);
