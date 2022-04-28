import React, { useEffect } from "react";
import styles from "../../styles/retailerHome.module.css";
import { Link } from "react-router-dom";
import { fetchProductsByDistributorId } from "../../redux/actions/productAction";
import { connect } from "react-redux";

function DistributorCard({ distributor, fetchProductsByDistributorId }) {
  useEffect(() => {
    if (!distributor) {
      return;
    }
    distributor && fetchProductsByDistributorId(distributor.distributor_id);
  }, [distributor]);

  return (
    <div style={{ display: "inline-block" }}>
      <div className="card text-center shadow-md mx-3 my-2 w-80">
        <figure className="px-2 pt-2">
          <div className={styles["closeButton"]}>
            <button className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current text-error"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <img
            src="https://picsum.photos/id/1005/400/250"
            className="mask mask-squircle"
          />
        </figure>

        <div className="card-body pt-2">
          <h2 className="card-title">{distributor && distributor.name}</h2>
          <div className="justify-center card-actions">
            <Link
              to={`/retailer/products?distributor=${
                distributor && distributor.distributor_id
              }`}
              className="btn btn-outline btn-accent"
            >
              View Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { fetchProductsByDistributorId })(DistributorCard);
