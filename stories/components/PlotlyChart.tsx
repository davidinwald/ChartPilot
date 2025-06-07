import React from "react";
import Plot from "react-plotly.js";

interface PlotlyChartProps {
  data: any[];
  layout: any;
  width?: number;
  height?: number;
}

export const PlotlyChart: React.FC<PlotlyChartProps> = ({
  data,
  layout,
  width = 400,
  height = 300,
}) => {
  return (
    <Plot
      data={data}
      layout={{
        ...layout,
        width,
        height,
        margin: { t: 50, r: 50, b: 50, l: 50 },
      }}
      config={{ responsive: true }}
    />
  );
};
