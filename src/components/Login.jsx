import React, { useState } from "react";
import styles from "../styles/login.module.css";
import { connect } from "react-redux";
import { login } from "../redux/actions/authAction";
import { Redirect } from "react-router";

function Login({ isAuthenticated, user, login }) {
  let [formData, setFormData] = useState({
    email: "",
    password: "",
    type: "",
  });

  const { email, type, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  if (isAuthenticated) {
    if (user) {
      if (user.role === "distributor") {
        return <Redirect to="/distributor" />;
      } else return <Redirect to="/retailer" />;
    }
  }

  return (
    <div className={styles["login-container"]}>
      <div className="card text-center shadow-2xl w-96">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <h2 className="card-title">Login</h2>
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
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="form-control mt-3">
              <label className="cursor-pointer label">
                <span className="label-text">Distributor</span>
                <input
                  type="radio"
                  name="type"
                  value="distributor"
                  checked={type === "distributor"}
                  className="radio"
                  onChange={handleChange}
                />
                <span className="label-text">Retailer</span>
                <input
                  type="radio"
                  name="type"
                  value="retailer"
                  checked={type === "retailer"}
                  className="radio"
                  onChange={handleChange}
                />
              </label>
              <div className="justify-center card-actions">
                <button type="submit" className="btn btn-outline btn-accent">
                  Login
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
  isAuthenticated: state.authReducer.isAuthenticated,
  user: state.authReducer.user,
});

export default connect(mapStateToProps, { login })(Login);
