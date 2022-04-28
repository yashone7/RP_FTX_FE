import React, { useEffect } from "react";
import DistributorCard from "./DistributorCard";
import Select from "react-select";
import { connect } from "react-redux";
import { fetchAllDistributors } from "../../redux/actions/distributorAction";

function RetailerHome({ distributors, fetchAllDistributors }) {
  useEffect(() => {
    fetchAllDistributors();
  }, []);

  console.log(distributors);

  const distributor = distributors[0];

  return (
    <div className="flex">
      <div className="w-9/12 ml-5 pl-5">
        <DistributorCard distributor={distributor} />
      </div>
      <div className="w-2/12 pl-5">
        <div className="flex-1 lg:flex-none pt-5 mt-5">
          <label>Add Distributor</label>
          <Select
            options={distributors}
            className="shadow-md"
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.distributor_id}
            placeholder="Add Distributor"
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  distributors: state.distReducer.distributors,
});

export default connect(mapStateToProps, { fetchAllDistributors })(RetailerHome);
