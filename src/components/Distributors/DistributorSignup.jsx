import React, { useState } from "react";
import styles from "../../styles/registerRetailer.module.css";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerDistributor } from "../../redux/actions/distributorAction";
import { Link } from "react-router-dom";

function DistributorSignup({ registerDistributor }) {
  let [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    name: "",
    phone_number: "",
  });
  const { email, password, name, phone_number, confirm_password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm_password) {
      toast.error("entered passwords don't macth");
    } else {
      registerDistributor({
        email,
        password,
        name,
        phone_number,
        isDistributor: true,
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
                <span className="label-text">Confirm Password</span>
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { registerDistributor })(
  DistributorSignup
);
