import React from "react";
import { GiMedicines as Meds } from "react-icons/gi";

function ProductCard({ product_name }) {
  return (
    <div style={{ display: "inline-block" }}>
      <div className="card row-span-3 shadow-lg compact bg-base-100 px-3 py-1 w-80 m-0">
        <figure>
          <Meds size={22} />
        </figure>
        <div className="flex-row items-center space-x-4 card-body">
          <div>
            <h2 className="card-title">{product_name}</h2>
          </div>
        </div>
        <button className="btn btn-block">Add to cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
