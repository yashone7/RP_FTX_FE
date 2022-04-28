import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "./styles/layout.css";
import "react-toastify/dist/ReactToastify.css";
import "mapbox-gl/dist/mapbox-gl.css";
// import "maplibre-gl/dist/maplibre-gl.css";
// import "bulma/css/bulma.min.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
