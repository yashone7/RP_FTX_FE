import React from "react";
import { FiHome as Dashboard } from "react-icons/fi";
import { BsBoxSeam as Products, BsBarChartLine as Sales } from "react-icons/bs";
import { NavLink } from "react-router-dom";

function SidebarDist() {
  return (
    <div className="artboard artboard-demo bg-base-200 h-full">
      <ul className="menu p-4 shadow-lg bg-base-100 h-full w-full">
        <li className="menu-title">
          <span>Menu</span>
        </li>
        <li>
          <NavLink to="/distributor/dashboard">
            <div className="flex items-center">
              <Dashboard size={18} cursor="dashboard" />
              <p className="mx-2">Dashboard</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/distributor/products">
            <div className="flex items-center ">
              <Products size={18} cursor="product" />
              <p className="mx-2">Products</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/distributor/sales">
            <div className="flex items-center ">
              <Sales size={18} cursor="sales" />
              <p className="mx-2">Sales</p>
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SidebarDist;
