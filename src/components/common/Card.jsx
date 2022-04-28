import React from "react";
import { FaPlus as Add } from "react-icons/fa";

function Card() {
  return (
    <div className="shadow-lg flex items-center justify-center rounded-md h-32 w-32">
      <Add size={32} cursor="pointer" />
      <p>Create a Product</p>
    </div>
  );
}

export default Card;
