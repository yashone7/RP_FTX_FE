import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

const Loader = () => {
  const style = {
    display: "flex",
    width: "100vw",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <div style={style}>
      <div>
        <BeatLoader size={15} loading={true} color="#8742c7" />
      </div>
    </div>
  );
};

export default Loader;
