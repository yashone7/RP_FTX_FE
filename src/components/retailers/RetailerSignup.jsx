import React, { useState } from "react";
import styles from "../../styles/login.module.css";
import { connect } from "react-redux";
import { register } from "../../redux/actions/authAction";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function RetailerSignup({ user, register }) {
  let [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    name: "",
    phone_number: "",
    address: "",
    location: null,
    pincode: "",
  });
  let history = useHistory();
  const {
    email,
    password,
    name,
    phone_number,
    address,
    location,
    pincode,
    confirm_password,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  function getLocation() {
    let geo_location = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [],
      },
    };
    navigator.geolocation.getCurrentPosition((position) => {
      geo_location.geometry.coordinates[0] = position.coords.longitude;
      geo_location.geometry.coordinates[1] = position.coords.latitude;
      console.log(geo_location);
      setFormData({ ...formData, location: geo_location });
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm_password) {
      toast.error("entered passwords don't macth");
    } else {
      register({
        email,
        password,
        name,
        phone_number,
        address,
        location,
        pincode,
      });
      history.replace("/login");
    }
  };

  return (
    <div className={styles["login-container"]}>
      <div className="card text-center shadow-2xl my-5 w-96">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <h2 className="card-title">Registration Page</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="input input-bordered"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                className="input input-bordered"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="phone"
                placeholder="9876543210"
                className="input input-bordered"
                name="phone_number"
                value={phone_number}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Choose Password</span>
              </label>
              <input
                type="password"
                placeholder="Choose your password"
                className="input input-bordered"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Choose Password</span>
              </label>
              <input
                type="password"
                placeholder="confirm your password"
                className="input input-bordered"
                name="confirm_password"
                value={confirm_password}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                type="text"
                placeholder="For Delivery Purpose"
                className="input input-bordered"
                name="address"
                value={address}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Pincode</span>
              </label>
              <input
                type="text"
                placeholder="500000"
                className="input input-bordered"
                name="pincode"
                value={pincode}
                onChange={handleChange}
              />
            </div>
            <button
              onClick={getLocation}
              type="button"
              className="btn mt-4 btn-sm btn-block"
            >
              Capture Geo Location
            </button>
            <div className="form-control mt-3">
              <div className="justify-center card-actions">
                <button type="submit" className="btn btn-outline btn-accent">
                  <Link to="/login">Register</Link>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
});

export default connect(mapStateToProps, { register })(RetailerSignup);
