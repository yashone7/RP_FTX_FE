import React from "react";

function Navbar() {
  return (
    <div>
      <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content ">
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            {/* hamburger */}
          </button>
        </div>
        <div className="flex-1 px-2 mx-2">
          <span className="text-lg font-bold">With two icons</span>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost"></button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
