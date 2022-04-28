import React, { useEffect } from "react";
import styles from "../../styles/product.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProductTable from "./ProductTable";
import { fetchAllProducts } from "../../redux/actions/productAction";

export const Products = ({
  isAuthenticated,
  isDistributor,
  fetchAllProducts,
  products,
}) => {
  useEffect(() => {
    fetchAllProducts();
  }, []);

  console.log(products);

  return (
    <div>
      <div className="container">
        <Link className="btn btn-primary" to="/distributor/product-form">
          Create a Product
        </Link>
      </div>
      <ProductTable products={products} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  isDistributor: state.authReducer.user.isDistributor,
  products: state.productReducer.products,
});

const mapDispatchToProps = {
  fetchAllProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
