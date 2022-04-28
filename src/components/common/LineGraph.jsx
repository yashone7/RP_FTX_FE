import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Brush,
  Legend,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import isEmpty from "lodash/isEmpty";

const LineGraph = ({ data, labelX, entity, unit, strokeColor }) => {
  // console.log(data);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3"
          vertical={false}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        />
        <XAxis dataKey={labelX} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Brush dataKey={labelX} height={30} stroke="#8884d8" />
        <Line
          type="monotone"
          dataKey={entity}
          stroke={!isEmpty(strokeColor) ? strokeColor : "#82ca9d"}
          strokeWidth={2}
          unit={unit}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
