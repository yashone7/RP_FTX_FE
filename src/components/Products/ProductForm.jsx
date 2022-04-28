import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { createProduct } from "../../redux/actions/productAction";

export const ProductForm = ({ distributor_id, createProduct }) => {
  const history = useHistory();
  const params = useParams();

  console.log(params);

  const { state } = history.location;

  // console.log(state);

  const [formData, setFormData] = useState({
    product_name: (state && state.product_name) || "",
    product_price: (state && state.product_price) || "",
    number_in_stock: (state && state.number_in_stock) || "",
    description: (state && state.description) || "",
    distributor_id: distributor_id,
  });

  const { product_name, product_price, number_in_stock, description } =
    formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (!state.edit) {
      createProduct(formData);
    } else {
      // edit
    }
    setTimeout(() => handleReset(), 400);
  };

  const handleReset = () => {
    setFormData({
      ...formData,
      product_name: "",
      product_price: "",
      number_in_stock: "",
      description: "",
    });
  };

  return (
    <div className="w-1/3">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div className="form-control" htmlFor="product_name">
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>
          <input
            type="text"
            placeholder="product name"
            className="input input-bordered"
            id="product_name"
            value={product_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="product_price">
            <span className="label-text">Product Price</span>
          </label>
          <input
            type="number"
            placeholder="product price"
            min={0}
            className="input input-bordered"
            id="product_price"
            value={product_price}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="number_in_stock">
            <span className="label-text">Number in stock</span>
          </label>
          <input
            type="number"
            placeholder="number in stock"
            className="input input-bordered"
            id="number_in_stock"
            value={number_in_stock}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="description">
            <span className="label-text">Description</span>
          </label>
          <textarea
            type="number"
            placeholder="product description"
            className="textarea textarea-bordered"
            id="description"
            value={description}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-secondary mt-3">
          create
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  distributor_id: state.authReducer.user.distributor_id,
});

const mapDispatchToProps = { createProduct };

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
