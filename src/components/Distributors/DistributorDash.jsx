import React, { useEffect, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { connect } from "react-redux";
import {
  getAllRetailers,
  getSaleBetweenDates,
  getSaleByRetailer,
  getTotalSale,
} from "../../redux/actions/saleAction";
import Select from "react-select";
import { StaticMap } from "react-map-gl";
import DeckGL, { HexagonLayer } from "deck.gl";

function DistributorDash({
  getSaleBetweenDates,
  getSaleByRetailer,
  totalSale,
  getTotalSale,
  getAllRetailers,
  retailers,
}) {
  useEffect(() => {
    getTotalSale();
    getAllRetailers();
  }, []);

  const { height, width, ref } = useResizeDetector();

  const [retailer, setRetailer] = useState("");

  const handleChange = (e) => {
    setRetailer(e.retailer_id);
  };

  const [tooltip, setTooltip] = useState({
    name: "",
    id: "",
    x: 0,
    y: 0,
  });

  const { name, id, x, y } = tooltip;

  const layer = new HexagonLayer({
    id: "total-sale",
    data: totalSale,
    pickable: true,
    extruded: true,
    radius: 200,
    elevationScale: 4,
    getPosition: (d) => d.location.geometry.coordinates,
    onHover: (info, event) => {
      console.log(info);
      //   console.log(event);
      info.object &&
        setTooltip({
          ...tooltip,
          name: info.object.points[0].source.retailer_name || null,
          id: info.object.points[0].source.retailer_id || null,
          x: info.coordinate[1],
          y: info.coordinate[0],
        });
    },
  });

  const style = {
    width: width,
    height: height,
    position: "relative",
  };

  const INITIAL_VIEW_STATE = {
    longitude: 83.30224514007568,
    latitude: 17.718254346301336,
    zoom: 11,
    maxZoom: 16,
    pitch: 20,
    bearing: 5,
  };

  const renderTooltip = (name, id, x, y) => {
    return (
      <div className="bg-black opacity-50 w-auto inline-block h-auto p-2">
        <div className="text-white text-sm m-1">Name: {name || ""}</div>
        <div className="text-white text-sm m-1">id {id || ""}</div>
        <div className="text-white text-sm m-1">lat {x || ""}</div>
        <div className="text-white text-sm m-1">long {y || ""}</div>
      </div>
    );
  };

  const mapStyle = "mapbox://styles/yashone7/ck7niwrj318o41ip4jttx40km";
  return (
    <div>
      <h1>
        Currently displaying only total sales more functionality coming soon
      </h1>
      <div
        data-theme="dracula"
        className="shadow-md bg-gray-700 bg rounded-sm p-3 w-full vis-card-height flex"
      >
        <div className="w-1/4 pr-2">
          <button className="btn btn-primary">Get total Sale</button>
          <div className="my-3 ">
            <Select
              options={retailers}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.retailer_id}
              placeholder="select a retailer"
              onChange={handleChange}
            />
            <button className="btn btn-primary my-3">
              Get selected retailer sale
            </button>
          </div>
        </div>
        <div className="w-3/4 bg-gray-400 p-0 m-0" ref={ref}>
          <DeckGL
            style={style}
            layers={[layer]}
            initialViewState={INITIAL_VIEW_STATE}
            controller={true}
          >
            <StaticMap
              width={width}
              height={height}
              mapStyle={mapStyle}
              mapboxApiAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
            />
            {renderTooltip(name, id, x, y)}
          </DeckGL>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  totalSale: state.saleReducer.totalSale,
  saleBetweenDates: state.saleReducer.saleBetweenDates,
  saleByRetailer: state.saleReducer.saleByRetailer,
  retailers: state.saleReducer.retailers,
});

export default connect(mapStateToProps, {
  getSaleBetweenDates,
  getSaleByRetailer,
  getTotalSale,
  getAllRetailers,
})(DistributorDash);
