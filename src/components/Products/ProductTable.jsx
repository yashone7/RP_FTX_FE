import React from "react";
import isEmpty from "lodash/isEmpty";
import { MdEdit as Edit, MdDelete as Delete } from "react-icons/md";
import { Link } from "react-router-dom";

function ProductTable({ products }) {
  const handleEdit = (e, id) => {
    // edit product action
  };

  const handleDelete = (e, id) => {
    // delete product action
  };

  return (
    <div className="overflow-x-auto my-5">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Number in stock</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!isEmpty(products)
            ? products.map((product) => {
                return (
                  <tr key={product.product_id}>
                    <td>{product.product_name}</td>
                    <td>{product.description}</td>
                    <td>{product.number_in_stock}</td>
                    <td>{product.product_price}</td>
                    <td>
                      {/*  */}
                      <div className="flex">
                        <Link
                          to={{
                            pathname: `/distributor/product-form/${product.product_id}`,
                            state: { product, edit: true },
                          }}
                        >
                          <Edit
                            size={24}
                            onClick={(e) => handleEdit(e, product.product_id)}
                            cursor="pointer"
                            className="mx-2"
                            title="edit"
                          />
                        </Link>
                        <Delete
                          size={24}
                          onClick={(e) => handleDelete(e, product.product_id)}
                          cursor="pointer"
                          className="mx-2"
                          title="delete"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
