import React, { useState } from "react";
import styles from "../styles/login.module.css";
import { Link } from "react-router-dom";

function Registration() {
  return (
    <div className={styles["login-container"]}>
      <div className="card text-center shadow-2xl my-5 w-96 pt-5 pb-5">
        <div className="card-body">
          <h2 className="font-medium leading-tight text-4xl mt-0 mb-2 text-blue-600">
            Who are you?
          </h2>
          <Link to="/distributor-registration">
            <button class="btn btn-outline btn-primary mb-1">
              I'm a distributor
            </button>
          </Link>
          <Link to="/retailer-registration">
            <button class="btn btn-outline btn-secondary">
              I'm a retailer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Registration;
