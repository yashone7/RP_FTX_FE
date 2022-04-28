import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTotalSale } from "../../redux/actions/saleAction";
import LineGraph from "../common/LineGraph";

function Sales({ getTotalSale, totalSale }) {
  useEffect(() => {
    getTotalSale();
  }, []);

  console.log(totalSale);

  return (
    <div>
      <div className="flex">
        <div className="card shadow-xl lg:card-side bg-accent text-primary-content mx-2 w-1/3">
          <div className="card-body">
            <p>Today's Earning: </p>
            <p>Rs. 5000</p>
          </div>
        </div>
        <div className="card shadow-xl lg:card-side bg-info text-primary-content mx-2 w-1/3">
          <div className="card-body">
            <p>This week's Earning: </p>
            <p>Rs. 5000</p>
          </div>
        </div>
        <div className="card shadow-xl lg:card-side bg-neutral text-primary-content mx-2 w-1/3">
          <div className="card-body">
            <p>This month's Earning: </p>
            <p>Rs. 5000</p>
          </div>
        </div>
      </div>
      <div className="shadow-md rounded-md px-3 my-3">
        <LineGraph
          data={totalSale}
          labelX="order_id"
          entity="order_amount"
          unit="rupees"
        />
      </div>
      <div className="flex justify-center pt-4 mt-5 bordered drop-shadow-md">
        <div className="overflow-x-auto">
          <table className="table w-full drop-shadow-md border-solid">
            <thead>
              <tr>
                <th></th>
                <th>Retailer Name</th>
                <th>Retailer Id</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {totalSale.map((e, index) => {
                return (
                  <tr key={e.order_id} className="hover">
                    <th>{index + 1}</th>
                    <td>{e.retailer_name}</td>
                    <td>{e.retailer_id}</td>
                    <td>{e.order_amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  totalSale: state.saleReducer.totalSale,
});

export default connect(mapStateToProps, { getTotalSale })(Sales);
